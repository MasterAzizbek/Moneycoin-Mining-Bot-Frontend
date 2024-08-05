import React from "react";
import { Link } from "react-router-dom";

function Nevbar() {
  return (
    <div className="Nevbar">
      <Link>
        <li className="navbar_li active">
          <i class="bx bx-home-alt"></i>
          Home
        </li>
      </Link>
      <Link>
        <li className="navbar_li">
          <i class="bx bx-task"></i>
          Tasks
        </li>
      </Link>
      <Link>
        <li className="navbar_li">
          <i class="bx bx-group"></i>
          Frens
        </li>
      </Link>
      <Link>
        <li className="navbar_li">
          <i class="bx bx-wallet-alt"></i>
          Wallet
        </li>
      </Link>
    </div>
  );
}

export default Nevbar;
