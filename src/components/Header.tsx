import React, { useState } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { LuClipboardList } from "react-icons/lu";
import { PiListChecksFill } from "react-icons/pi";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const showHideMenuItem = () => setShowMenu((current) => !current);
  return (
    <div className="header-root">
      <div className="logo">
        <img src={logo} alt="LOGO" />
      </div>
      <div className="menu">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>
      </div>
      <div onClick={showHideMenuItem} className="user-info">
        <div className="avatar">U</div>
        <div className="user-name">User Name</div>
      </div>
      <div className={`profile-box ${showMenu ? "show" : "hidden"}`}>
        <NavLink onClick={showHideMenuItem} to={"/profile"}>
          <div className="menu-item">
            <CgProfile size={20} />
            <div className="title">Profile</div>
          </div>
        </NavLink>
        <NavLink onClick={showHideMenuItem} to={"/order-list"}>
          <div className="menu-item">
            <LuClipboardList size={20} />
            <div className="title">Order list</div>
          </div>
        </NavLink>
        <div className="menu-item">
          <PiListChecksFill size={20} />
          <div className="title">Order history list</div>
        </div>
        <div className="logout">
          <button>LOGOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
