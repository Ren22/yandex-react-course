import React, { useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

export const ProfileInputs = () => {
  const [name, setName] = useState("");
  const [isNameInputActive, setIsNameInputActive] = useState(false);
  const [login, setLogin] = useState("");
  const [isLoginInputActive, setIsLoginInputActive] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordInputActive, setIsPasswordInputActive] = useState(false);

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
