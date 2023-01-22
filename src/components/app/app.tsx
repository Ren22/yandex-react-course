import React from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegistraionPage,
  ForgotPasswordPage,
  ProfilePage,
} from "../../pages";
import * as H from "history";
import { ProfileOrder } from "../../pages/profile-order/profile-order";
import { PROFILE_TABS } from "../../pages/profile/profile";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { closeIngredientDetails } from "../../redux/slices/ingredients";
import { useAppDispatch } from "../../redux/store";
import Header from "../header/header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
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
  const location = useLocation();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(closeIngredientDetails());
    history.goBack();
  };

  const background =
    (location.state as object) &&
    (location.state as { background?: H.Location })?.background;
  return (
    <>
      <Header />
      <Switch location={background || location}>
        <Route path={`${ROUTES.MAIN}`} exact>
          <HomePage />
        </Route>
        <ProtectedRoute onlyUnAuth path={`${ROUTES.LOGIN}`} exact>
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute onlyUnAuth path={`${ROUTES.REGISTER}`} exact>
          <RegistraionPage />
        </ProtectedRoute>
        <ProtectedRoute onlyUnAuth path={`${ROUTES.FORGOTPWRD}`} exact>
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute onlyUnAuth path={`${ROUTES.RESETPWRD}`} exact>
          <ResetPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute path={`${ROUTES.PROFILE}`} exact>
          <ProfilePage activeTab={`${PROFILE_TABS.PROFILE}`} />
        </ProtectedRoute>
        <ProtectedRoute path={`${ROUTES.PROFILE}${ROUTES.ORDERS}`} exact>
          <ProfilePage activeTab={`${PROFILE_TABS.ORDERS}`} />
        </ProtectedRoute>
        <ProtectedRoute path={`${ROUTES.PROFILE}${ROUTES.ORDERS}/:id`} exact>
          <ProfileOrder />
        </ProtectedRoute>
        <Route path={`${ROUTES.INGREDIENTS}/:id`}>
          <>
            <IngredientDetails />
          </>
        </Route>
      </Switch>
      {background && (
        <>
          <Route path={`${ROUTES.INGREDIENTS}/:id`}>
            <Modal header="Детали ингредиента" closeModal={handleCloseModal}>
              <IngredientDetails />
            </Modal>
          </Route>
        </>
      )}
    </>
  );
};

export default App;
