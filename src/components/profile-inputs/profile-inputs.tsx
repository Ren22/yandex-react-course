import React, { useCallback, useEffect, useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/slices/user";

interface Props {
  login: string;
  setLogin: (s: string) => void;
  password: string;
  setPassword: (s: string) => void;
  name: string;
  setName: (s: string) => void;
}

export const ProfileInputs = ({
  name,
  setName,
  login,
  setLogin,
  password,
  setPassword,
}: Props) => {
  const [isNameInputActive, setIsNameInputActive] = useState(false);
  const [isLoginInputActive, setIsLoginInputActive] = useState(false);
  const [isPasswordInputActive, setIsPasswordInputActive] = useState(false);

  const user = useSelector(selectUserData);

  const setAllInputsInactive = useCallback(() => {
    setIsNameInputActive(false);
    setIsLoginInputActive(false);
    setIsPasswordInputActive(false);
  }, []);

  useEffect(() => {
    setAllInputsInactive();
  }, [setAllInputsInactive, user]);

  return (
    <>
      <Input
        disabled={isNameInputActive ? false : true}
        type={"text"}
        placeholder={"Name"}
        onChange={(e) => setName(e.target.value)}
        value={name}
        icon={"EditIcon"}
        onIconClick={() => setIsNameInputActive(!isNameInputActive)}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
      />
      <Input
        disabled={isLoginInputActive ? false : true}
        type={"text"}
        placeholder={"Login"}
        onChange={(e) => setLogin(e.target.value)}
        value={login}
        icon={"EditIcon"}
        onIconClick={() => setIsLoginInputActive(!isLoginInputActive)}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1 mt-6"
      />
      <Input
        disabled={isPasswordInputActive ? false : true}
        type={"password"}
        placeholder={"Password"}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        icon={"EditIcon"}
        onIconClick={() => setIsPasswordInputActive(!isPasswordInputActive)}
        error={false}
        name={"password"}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1 mt-6"
      />
    </>
  );
};
