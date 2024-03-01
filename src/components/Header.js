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
    <div className="flex justify-between shadow-md mb-2">
      <div className="logo-container">
        <img className="w-56" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">Online status: {onlineStatus ? "🟢" : "🔴"}</li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4">Cart</li>
          <button className="login" onClick={handleBtnClick}>
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Header;
