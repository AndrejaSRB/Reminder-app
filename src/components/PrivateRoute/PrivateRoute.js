import React from "react";
import { Route } from "react-router-dom";
import LogIn from "../Authentication/Login/Login";

function PrivateRoute({ component: Component, ...rest }) {
    const isAuth = localStorage.getItem("id");
    return (
      <Route
        {...rest}
        render={props =>
          isAuth ? (
            <Component {...props} />
          ) : (
            <LogIn/>
          )
        }
      />
    );
  }


export default PrivateRoute;
