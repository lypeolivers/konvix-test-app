import React, { ReactNode } from "react";

import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const token = localStorage.getItem("token");
  let isLoggedIn = false;
  if (token != "" && token) isLoggedIn = true;
  return (
    <Route
      {...rest}
      element={(props: any) => {
        return isLoggedIn ? (
          <Component path={props.path} component={props.component} />
        ) : (
          <Navigate to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
