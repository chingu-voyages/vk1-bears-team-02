import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Main from "./Components/Main/Main";
import { Login } from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
      <Route
        {...rest}
        component={(props) =>
          authenticated ? <Redirect to="/private" /> : <Component {...props} />
        }
      />
    );
  };
  const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
      <Route
        {...rest}
        component={(props) =>
          authenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  };

  return (
    <Router>
      <Switch>
        <PublicRoute
          exact
          path="/"
          component={Main}
          authenticated={authenticated}
        ></PublicRoute>
        <PublicRoute
          exact
          path="/Login"
          component={Login}
          authenticated={authenticated}
        ></PublicRoute>
        <PublicRoute
          exact
          path="/Register"
          component={Register}
          authenticated={authenticated}
        ></PublicRoute>
      </Switch>
    </Router>
  );
};

export default App;
