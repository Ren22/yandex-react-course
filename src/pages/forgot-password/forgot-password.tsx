import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { SyntheticEvent, useEffect, useState } from "react";
import forgotPasswordStyle from "./forgot-password.module.css";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../components/app/app";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  forgotPasswordReducer,
  selectIsForgotPswrdEmailSent,
  setIsEmailSentToDefault,
} from "../../redux/slices/auth";
import { getUserDataReducer, selectUser } from "../../redux/slices/user";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isForgotPswrdEmailSent = useAppSelector(selectIsForgotPswrdEmailSent);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(setIsEmailSentToDefault());
    dispatch(getUserDataReducer());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      history.push({ pathname: `${ROUTES.MAIN}` });
    }
  }, [history, user]);

  useEffect(() => {
    if (isForgotPswrdEmailSent) {
      history.push(`${ROUTES.RESETPWRD}`, { from: `${ROUTES.FORGOTPWRD}` });
    }
  }, [history, isForgotPswrdEmailSent]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email) {
      // todo validate email with regex
      alert("Please enter your email!");
      return;
    }
    dispatch(forgotPasswordReducer(email));
  };

  return (
    <>
      <form className={forgotPasswordStyle.main} onSubmit={handleSubmit}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input
          type={"email"}
          placeholder={"Email"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
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
          Восстановить
        </Button>
        <p className="mt-4 text text_type_main-small">
          <span className={forgotPasswordStyle.text_grayed}>
            Вспомнили пароль?{" "}
          </span>
          <Link
            className={forgotPasswordStyle.text_blued}
            to={`${ROUTES.LOGIN}`}
          >
            Войти
          </Link>
        </p>
      </form>
    </>
  );
};
