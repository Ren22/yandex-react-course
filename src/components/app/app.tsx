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
import Header from "../header/header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ProtectedRoute } from "../protected-route/protected-route";

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
  INGREDIENTS = "/ingredients",
}

const App = () => {
  return (
    <>
      <Router>
        <Header />
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
          <ProtectedRoute path={`${ROUTES.PROFILE}`} exact={true}>
            <ProfilePage activeTab={`${PROFILE_TABS.PROFILE}`} />
          </ProtectedRoute>
          <ProtectedRoute
            path={`${ROUTES.PROFILE}${ROUTES.ORDERS}`}
            exact={true}
          >
            <ProfilePage activeTab={`${PROFILE_TABS.ORDERS}`} />
          </ProtectedRoute>
          <ProtectedRoute
            path={`${ROUTES.PROFILE}${ROUTES.ORDERS}/:id`}
            exact={true}
          >
            <ProfileOrder />
          </ProtectedRoute>
          <Route path={`${ROUTES.INGREDIENTS}/:id`}>
            <IngredientDetails />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
