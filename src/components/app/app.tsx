import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegistraionPage,
  ForgotPasswordPage,
  ProfilePage,
} from "../../pages";
import { ProfileOrder } from "../../pages/profile-order/profile-order";
import { PROFILE_TABS } from "../../pages/profile/profile";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";

export interface TotalSum {
  value: number;
}

export enum ROUTES {
  MAIN = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  FORGOTPWRD = "/forgot-password",
  RESETPWRD = "/reset-password",
  PROFILE = "/profile",
  ORDERS = "/orders",
}

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={`${ROUTES.MAIN}`} exact={true}>
          <HomePage />
        </Route>
        <Route path={`${ROUTES.LOGIN}`} exact={true}>
          <LoginPage />
        </Route>
        <Route path={`${ROUTES.REGISTER}`} exact={true}>
          <RegistraionPage />
        </Route>
        <Route path={`${ROUTES.FORGOTPWRD}`} exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path={`${ROUTES.RESETPWRD}`} exact={true}>
          <ResetPasswordPage />
        </Route>
        <Route path={`${ROUTES.PROFILE}`} exact={true}>
          <ProfilePage activeTab={`${PROFILE_TABS.PROFILE}`} />
        </Route>
        <Route path={`${ROUTES.PROFILE}${ROUTES.ORDERS}`} exact={true}>
          <ProfilePage activeTab={`${PROFILE_TABS.ORDERS}`} />
        </Route>
        <Route path={`${ROUTES.PROFILE}${ROUTES.ORDERS}/:id`} exact={true}>
          <ProfileOrder />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
