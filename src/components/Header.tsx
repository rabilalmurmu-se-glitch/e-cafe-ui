import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useUserStore } from "../store/useUserStore";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { user, clearUser } = useUserStore();

  const showHideMenuItem = () => setShowMenu((current) => !current);
  const handleLoginLogout = (action: "login" | "logout") => {
    showHideMenuItem();
    if (action === "login") return navigate("/login");
    clearUser();
    navigate("/");
  };
  
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".user-info") && !target.closest(".profile-box")) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <div className="header-root">
      <div className="logo">
        <img src={logo} alt="LOGO" />
      </div>
      <div className="menu">
        <NavLink to={"/"}>Cafe</NavLink>
        <NavLink to={"/order-list"}>List</NavLink>
        <NavLink to={"/order-history"}>Orders</NavLink>
      </div>
      <div onClick={showHideMenuItem} className="user-info">
        {!user ? (
          <>
            <div className="avatar">G</div>
            <div className="user-name">Guest User</div>
          </>
        ) : (
          <>
            <div className="avatar">{user?.name[0]?.toUpperCase()}</div>
            <div className="user-name">{user?.name}</div>
          </>
        )}
      </div>
      <div className={`profile-box ${showMenu ? "show" : "hidden"}`}>
        <NavLink onClick={showHideMenuItem} to={"/profile"}>
          <div className="menu-item">
            <CgProfile size={20} />
            <div className="title">Profile</div>
          </div>
        </NavLink>
        <div className="logout">
          {!user ? (
            <button onClick={() => handleLoginLogout("login")}>LOGIN</button>
          ) : (
            <button onClick={() => handleLoginLogout("logout")}>LOGOUT</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
