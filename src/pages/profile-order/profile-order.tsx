import React from "react";
import { useHistory } from "react-router-dom";

export const ProfileOrder = () => {
  const history = useHistory();

  const getToPreviousPage = () => {
    history.goBack();
  };
  return <p onClick={getToPreviousPage}>Return back</p>;
};
