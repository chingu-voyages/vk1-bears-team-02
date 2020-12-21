import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthenticationContext } from "../context/AuthenticationContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useContext(AuthenticationContext);
  var auth = localStorage.getItem('auth')
  return (
    <Route
      {...rest}
      component={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
