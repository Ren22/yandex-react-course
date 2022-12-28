import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import Header from "../../components/header/header";
import resetPasswordStyle from "./reset-password.module.css";
import { Link } from "react-router-dom";
import { resetPassword } from "../../api/auth";
import { ROUTES } from "../../components/app/app";

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleClick = async () => {
    try {
      const state = await resetPassword(password, token);
      if (state.success) {
        alert(state.message);
      }
    } catch (e: any) {
      alert(e.message);
    }
  };
  return (
    <>
      <Header />
      <main className={resetPasswordStyle.main}>
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
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleClick}
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
      </main>
    </>
  );
};
