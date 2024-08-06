import React, { useState } from "react";
import { Link } from "react-router-dom";
import DataContext from "../context/context";
import { useContext } from "react";

function Nevbar() {
  const { user } = useContext(DataContext);
  const [active, setActive] = useState(0);

  const activer = (id) => {
    setActive(id);
  };
  return (
    <div className="Nevbar">
      <Link
        to={
          `/` +
          `?telegram_id=${encodeURIComponent(user.telegram_id)}` +
          `&username=${encodeURIComponent(user.username)}` +
          `&first_name=${encodeURIComponent(user.first_name)}` +
          `&avatar=${encodeURIComponent(user.avatar)}`
        }
        onClick={() => activer(0)}
      >
        <li className={active == 0 ? "navbar_li active" : "navbar_li"}>
          <i className="bx bx-home-alt"></i>
          Home
        </li>
      </Link>
      <Link
        to={
          `/tasks` +
          `?telegram_id=${encodeURIComponent(user.telegram_id)}` +
          `&username=${encodeURIComponent(user.username)}` +
          `&first_name=${encodeURIComponent(user.first_name)}` +
          `&avatar=${encodeURIComponent(user.avatar)}`
        }
        onClick={() => activer(1)}
      >
        <li className={active == 1 ? "navbar_li active" : "navbar_li"}>
          <i class="bx bx-task"></i>
          Tasks
        </li>
      </Link>
      <Link
        to={
          `/invite` +
          `?telegram_id=${encodeURIComponent(user.telegram_id)}` +
          `&username=${encodeURIComponent(user.username)}` +
          `&first_name=${encodeURIComponent(user.first_name)}` +
          `&avatar=${encodeURIComponent(user.avatar)}`
        }
        onClick={() => activer(2)}
      >
        <li className={active == 2 ? "navbar_li active" : "navbar_li"}>
          <i class="bx bx-group"></i>
          Frens
        </li>
      </Link>
      <Link
        to={
          `/wallet` +
          `?telegram_id=${encodeURIComponent(user.telegram_id)}` +
          `&username=${encodeURIComponent(user.username)}` +
          `&first_name=${encodeURIComponent(user.first_name)}` +
          `&avatar=${encodeURIComponent(user.avatar)}`
        }
        onClick={() => activer(3)}
      >
        <li className={active == 3 ? "navbar_li active" : "navbar_li"}>
          <i class="bx bx-wallet-alt"></i>
          Wallet
        </li>
      </Link>
    </div>
  );
}

export default Nevbar;
