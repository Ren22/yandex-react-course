import React from "react";
import headerItem from "./header-item.module.css";

type Props = {
  text?: string;
  children?: React.ReactNode;
  src: string;
  active?: boolean;
};

const HeaderItem: React.FC<Props> = ({ children, text, src, active }) => {
  return (
    <a
      href={src}
      className={`${headerItem.item} ${
        active ? headerItem.item_active : ""
      } pr-5`}
    >
      {children}
      <span className="text text_type_main-default p-2">{text}</span>
    </a>
  );
};

export default HeaderItem;
