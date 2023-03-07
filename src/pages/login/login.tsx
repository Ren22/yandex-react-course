import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { SyntheticEvent, useEffect, useState } from "react";
import loginPageStyle from "./login.module.css";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../components/app/app";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  loginUserReducer,
  selectIsUserLoggedIn,
} from "../../redux/slices/auth";
import { getUserDataReducer, selectUser } from "../../redux/slices/user";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const userIsLoggedIn = useAppSelector(selectIsUserLoggedIn);

  useEffect(() => {
    dispatch(getUserDataReducer());
  }, [dispatch]);

  useEffect(() => {
    if (user || userIsLoggedIn) {
      const nextPath = history.location.state
        ? (history.location.state as { from: { pathname: string } }).from
            .pathname
        : `${ROUTES.MAIN}`;
      history.push({
        pathname: nextPath,
      });
    }
  }, [history, user, userIsLoggedIn]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserReducer({ email, password }));
  };

  return (
    <>
      <form className={loginPageStyle.main} onSubmit={handleSubmit}>
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
          extraClass={"mt-6 mb-20 loginButton"}
          htmlType="submit"
          type="primary"
          size="medium"
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
            Восстановить пароль
          </Link>
        </p>
      </form>
    </>
  );
};
