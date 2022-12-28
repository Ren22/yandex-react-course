import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import loginPageStyle from "./login.module.css";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/header/header";
import { loginUser } from "../../api/auth";
import { ROUTES } from "../../components/app/app";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const history = useHistory();

  const handleClick = async () => {
    try {
      const state = await loginUser(email, password);
      if (state.success) {
        history.push({ pathname: `${ROUTES.MAIN}` });
      }
    } catch (e: any) {
      alert(e.message);
    }
  };
  return (
    <>
      <Header />
      <main className={loginPageStyle.main}>
        <p className="text text_type_main-medium">Вход</p>
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
        <Input
          type={isPasswordShown ? "text" : "password"}
          placeholder={"Password"}
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
        <Button
          extraClass={"mt-6 mb-20"}
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleClick}
        >
          Войти
        </Button>
        <p className="text text_type_main-small">
          <span className={loginPageStyle.text_grayed}>
            Вы - новый пользователь?{" "}
          </span>
          <Link className={loginPageStyle.text_blued} to={`${ROUTES.REGISTER}`}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="mt-4 text text_type_main-small">
          <span className={loginPageStyle.text_grayed}>Забыли пароль? </span>
          <Link
            className={loginPageStyle.text_blued}
            to={`${ROUTES.FORGOTPWRD}`}
          >
            Восстановть пароль
          </Link>
        </p>
      </main>
    </>
  );
};