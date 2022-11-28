import React from "react";
import headerItem from "./header-item.module.css";

type Props = {
  text?: string;
  children?: React.ReactNode;
};

const HeaderItem: React.FC<Props> = ({ children, text }) => {
  return (
    <div className={`${headerItem.item} pr-5`}>
      {children}
      <span className="text text_type_main-default p-2">{text}</span>
    </div>
  );
};

export default HeaderItem;
