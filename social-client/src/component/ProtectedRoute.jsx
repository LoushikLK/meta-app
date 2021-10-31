import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const userDetail = useSelector((state) => state.userDetail);

  //   console.log(userDetail.isLogin);

  return (
    <Switch>
      <Route
        {...restOfProps}
        render={(props) =>
          userDetail.isLogin ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </Switch>
  );
};

export default ProtectedRoute;
