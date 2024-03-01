import React, { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnLogin, setBtnLogin] = useState(true);
  const onlineStatus = useOnlineStatus();

  let btnName = "Login";
  if (btnLogin) {
    btnName = "Logout";
  }

  const handleBtnClick = () => {
    setBtnLogin((prev) => !prev);
  };
  return (
    <div className="header">
      <div className="logo-container">
        <img src={LOGO_URL} />
      </div>
      <div className="nav-items">
        <ul>
          <li>Online status: {onlineStatus ? "🟢" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/grocery">Grocery</Link>
          </li>
          <li>Cart</li>
          <button className="login" onClick={handleBtnClick}>
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Header;
