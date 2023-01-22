import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { SyntheticEvent, useEffect, useState } from "react";
import resetPasswordStyle from "./reset-password.module.css";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../components/app/app";
import {
  resetPasswordReducer,
  selectIsForgotPswrdEmailSent,
  selectIsResetPasswordReqSent,
  setIsResetPasswordReqSentToDefault,
} from "../../redux/slices/auth";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getUserDataReducer, selectUser } from "../../redux/slices/user";

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const dispatch = useAppDispatch();
  const isResetPasswordReqSent = useAppSelector(selectIsResetPasswordReqSent);
  const isForgotPswrdEmailSent = useAppSelector(selectIsForgotPswrdEmailSent);
  const history = useHistory();

  const handleSumbit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await dispatch(resetPasswordReducer({ password, token }));
  };
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(setIsResetPasswordReqSentToDefault());
    dispatch(getUserDataReducer());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      history.push({ pathname: `${ROUTES.MAIN}` });
    }
  }, [history, user]);

  useEffect(() => {
    if (isResetPasswordReqSent) {
      history.push({ pathname: `${ROUTES.LOGIN}` });
    }
  }, [history, isResetPasswordReqSent]);

  useEffect(() => {
    if (
      !isForgotPswrdEmailSent &&
      (history.location.state as { from: string })?.from !==
        `${ROUTES.FORGOTPWRD}`
    ) {
      history.push({ pathname: `${ROUTES.FORGOTPWRD}` });
    }
  }, [history, isForgotPswrdEmailSent, user]);

  return (
    <>
      <form className={resetPasswordStyle.main} onSubmit={handleSumbit}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input
          type={isPasswordShown ? "text" : "password"}
          placeholder={"Введите новый пароль"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"password"}
          error={false}
          icon={isPasswordShown ? "HideIcon" : "ShowIcon"}
          onIconClick={() => setIsPasswordShown(!isPasswordShown)}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1 mt-6"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) => setToken(e.target.value)}
          value={token}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1 mt-6"
        />
        <Button
          extraClass={"mt-6 mb-20"}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Сохранить
        </Button>
        <p className="mt-4 text text_type_main-small">
          <span className={resetPasswordStyle.text_grayed}>
            Вспомнили пароль?{" "}
          </span>
          <Link
            className={resetPasswordStyle.text_blued}
            to={`${ROUTES.LOGIN}`}
          >
            Войти
          </Link>
        </p>
      </form>
    </>
  );
};
