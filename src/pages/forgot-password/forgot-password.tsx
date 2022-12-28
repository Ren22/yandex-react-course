import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import Header from "../../components/header/header";
import forgotPasswordStyle from "./forgot-password.module.css";
import { Link, useHistory } from "react-router-dom";
import { forgotPassword } from "../../api/auth";
import { ROUTES } from "../../components/app/app";

export const ForgotPasswordPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const history = useHistory();

  const handleClick = async () => {
    try {
      const state = await forgotPassword(emailValue);
      if (state.success) {
        history.push({ pathname: "/reset-password" });
      }
    } catch (e: any) {
      alert(e.message);
    }
  };
  return (
    <>
      <Header />
      <main className={forgotPasswordStyle.main}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input
          type={"email"}
          placeholder={"Email"}
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
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
