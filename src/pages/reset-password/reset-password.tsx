import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Header from "../../components/header/header";
import resetPasswordStyle from "./reset-password.module.css";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../components/app/app";
import {
  resetPasswordReducer,
  selectIsForgotPswrdEmailSent,
  selectIsResetPasswordReqSent,
  setIsResetPasswordReqSentToDefault,
} from "../../redux/slices/auth";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { getUserDataReducer, selectUser } from "../../redux/slices/user";

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const dispatch = useAppDispatch();
  const isResetPasswordReqSent = useSelector(selectIsResetPasswordReqSent);
  const isForgotPswrdEmailSent = useSelector(selectIsForgotPswrdEmailSent);
  const history = useHistory();

  const handleSumbit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await dispatch(resetPasswordReducer({ password, token }));
  };
  const user = useSelector(selectUser);

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
      <Header />
      <form className={resetPasswordStyle.main} onSubmit={handleSumbit}>
        <p className="text text_type_main-medium">???????????????????????????? ????????????</p>
        <Input
          type={isPasswordShown ? "text" : "password"}
          placeholder={"?????????????? ?????????? ????????????"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"password"}
          error={false}
          icon={isPasswordShown ? "HideIcon" : "ShowIcon"}
          onIconClick={() => setIsPasswordShown(!isPasswordShown)}
          errorText={"????????????"}
          size={"default"}
          extraClass="ml-1 mt-6"
        />
        <Input
          type={"text"}
          placeholder={"?????????????? ?????? ???? ????????????"}
          onChange={(e) => setToken(e.target.value)}
          value={token}
          name={"password"}
          error={false}
          errorText={"????????????"}
          size={"default"}
          extraClass="ml-1 mt-6"
        />
        <Button
          extraClass={"mt-6 mb-20"}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          ??????????????????
        </Button>
        <p className="mt-4 text text_type_main-small">
          <span className={resetPasswordStyle.text_grayed}>
            ?????????????????? ?????????????{" "}
          </span>
          <Link
            className={resetPasswordStyle.text_blued}
            to={`${ROUTES.LOGIN}`}
          >
            ??????????
          </Link>
        </p>
      </form>
    </>
  );
};
