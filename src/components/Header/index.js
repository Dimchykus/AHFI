import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";

const Header = ({ user, resetUser }) => {
  return (
    <div className="header">
      <NavLink to="/">Головна</NavLink>

      <NavLink to="/vacancies">Вакансії</NavLink>

      <NavLink to="/vidguky">Мої відгуки</NavLink>

      {user?.name ?? ""}
      {user && (
        <NavLink to="/login" onClick={() => resetUser()}>
          Вийти
        </NavLink>
      )}
    </div>
  );
};

export default Header;
