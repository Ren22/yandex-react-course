import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

export const ProfileOrders = () => {
  const list = [
    { id: 1, name: "name1" },
    { id: 2, name: "name2" },
  ];
  const { url } = useRouteMatch();

  return (
    <ul>
      {list.map(({ name, id }) => (
        <li key={id}>
          <Link to={{ pathname: `${url}/${id}` }}>{name}</Link>
        </li>
      ))}
    </ul>
  );
};
