import React from "react";
import { BrowserRouter, Route, Routes, Navigate,useLocation } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import PasswordUpdate from "./components/PasswordUpdate";

// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
// function PrivateRoute({ isAuthenticated, children, ...rest }) {
//   return (
//     <Routes>
//       <Route
//         {...rest}
//         element={
//           isAuthenticated ? (
//             children
//           ) : (
//             <Navigate to="/login/" replace state={{ from: rest.location }} />
//           )
//         }
//       />
//     </Routes> 
//   );
// }

function PrivateRoute({ isAuthenticated, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after logging in, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login/" replace state={{ from: location }} />;
  }

  return children;
}


function Urls(props) {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login/" element={<Login {...props} />} />
          <Route path="/update_password" element={
            <PrivateRoute isAuthenticated={props.isAuthenticated}>
              <PasswordUpdate {...props} />
            </PrivateRoute>
          } />
          <Route path="/" element={
            <PrivateRoute isAuthenticated={props.isAuthenticated}>
              <Home {...props} />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Urls;