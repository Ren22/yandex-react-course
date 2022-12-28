import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import registrationPageStyle from "./registration.module.css";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/header/header";
import { registerUser } from "../../api/auth";
import { ROUTES } from "../../components/app/app";

export const RegistraionPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const history = useHistory();

  const handleClick = async () => {
    try {
      const state = await registerUser(email, password, name);
      if (state.success) {
        history.push({ pathname: "/" });
      }
    } catch (e: any) {
      alert(e.message);
    }
  };
  return (
    <>
      <Header />
      <main className={registrationPageStyle.main}>
        <p className="text text_type_main-medium">Регистрация</p>
        <Input
          type={"text"}
          placeholder={"Name"}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1 mt-6"
        />
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
        <div className={"mt-6 mb-20"}>
          <Button
            onClick={handleClick}
            htmlType="button"
            type="primary"
            size="medium"
          >
            Зарегистрироваться
          </Button>
        </div>
        <p className="text text_type_main-small">
          <span className={registrationPageStyle.text_grayed}>
            Уже зарегистрорваны?{" "}
          </span>
          <Link
            className={registrationPageStyle.text_blued}
            to={`${ROUTES.LOGIN}`}
          >
            Войти
          </Link>
        </p>
      </main>
    </>
  );
};