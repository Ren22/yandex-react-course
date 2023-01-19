import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getUserDataReducer, selectUser } from "../../redux/slices/user";
import { useAppDispatch } from "../../redux/store";
import { ROUTES } from "../app/app";
import ProtectedRouteStyle from "./protected-route.module.css";

export const ProtectedRoute = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
  [rest: string]: any;
}) => {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const [userIsLoaded, setUserIsLoaded] = useState(false);

  useEffect(() => {
    async function getUser() {
      debugger;
      await dispatch(getUserDataReducer());
      setUserIsLoaded(true);
    }
    getUser();
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !userIsLoaded ? (
          <>
            <p className={`${ProtectedRouteStyle.loadingMsg}`}>Loading...</p>
          </>
        ) : user ? (
          children
        ) : (
          <Redirect
            to={{ pathname: `${ROUTES.LOGIN}`, state: { from: location } }}
          />
        )
      }
    />
  );
};
