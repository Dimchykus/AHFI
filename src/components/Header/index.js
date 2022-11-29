import React from "react";
import { NavLink } from "react-router-dom";
import { sessionSet } from "../../api";
import "./styles.scss";

const Header = ({ user, resetUser }) => {
  return (
    <div className="header">
      <NavLink to="/">
        <img src="/logo.png" alt="ahfi" />
      </NavLink>

      <NavLink to="/vacancies">Вакансії</NavLink>

      <NavLink to="/vidguky">
        {user && user.isAdmin ? "Всі відгуки" : "Мої відгуки"}
      </NavLink>

      <div className="header-right">
        <div className="header-name">{user?.name ?? ""}</div>
        {user && (
          <NavLink
            to="/login"
            onClick={() => {
              resetUser();
              sessionSet("user", null);
            }}
            className="header-exit"
          >
            Вийти
          </NavLink>
        )}
        {!user && (
          <div>
            {" "}
            <NavLink to="/login" className="header-exit">
              Увійти
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
