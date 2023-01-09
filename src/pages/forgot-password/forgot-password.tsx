import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import forgotPasswordStyle from "./forgot-password.module.css";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../components/app/app";
import { useAppDispatch } from "../../redux/store";
import {
  forgotPasswordReducer,
  selectIsForgotPswrdEmailSent,
} from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import { getUserDataReducer, selectUser } from "../../redux/slices/user";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isForgotPswrdEmailSent = useSelector(selectIsForgotPswrdEmailSent);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getUserDataReducer());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      history.push({ pathname: `${ROUTES.MAIN}` });
    }
  }, [history, user]);

  useEffect(() => {
    if (isForgotPswrdEmailSent) {
      history.push({ pathname: `${ROUTES.RESETPWRD}` });
    }
  }, [history, isForgotPswrdEmailSent]);

  const handleClick = () => {
    dispatch(forgotPasswordReducer(email));
  };

  return (
    <>
      <Header />
      <main className={forgotPasswordStyle.main}>
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
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleClick}
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
      </main>
    </>
  );
};
