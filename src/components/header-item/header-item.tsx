import React from "react";
import headerItem from "./header-item.module.css";

type Props = {
  text?: string;
  children?: React.ReactNode;
};

const HeaderItem: React.FC<Props> = ({ children, text }) => {
  return (
    <div className={headerItem.item}>
      {children}
      <span className="p-2">{text}</span>
    </div>
  );
};

export default HeaderItem;
