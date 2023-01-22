import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { getUserDataReducer, selectUser } from "../../redux/slices/user";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ROUTES } from "../app/app";
import ProtectedRouteStyle from "./protected-route.module.css";
import * as H from "history";

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children,
  ...rest
}: {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
} & RouteProps) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [userIsLoaded, setUserIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function getUser() {
      await dispatch(getUserDataReducer());
      setUserIsLoaded(true);
    }
    getUser();
  }, [dispatch]);

  if (!userIsLoaded) {
    return (
      <>
        <p className={`${ProtectedRouteStyle.loadingMsg}`}>Loading...</p>
      </>
    );
  }

  if (onlyUnAuth && user) {
    const { from } = (location.state as { from: H.Location }) || {
      from: { pathname: "/" },
    };

    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (!onlyUnAuth && !user) {
    return (
      <Route {...rest}>
        <Redirect
          to={{ pathname: `${ROUTES.LOGIN}`, state: { from: location } }}
        />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};
