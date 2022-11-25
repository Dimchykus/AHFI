import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";

const Header = ({ user }) => {
  return (
    <div className="header">
      <NavLink to="/">Головна</NavLink>

      <NavLink to="/vacancies">Вакансії</NavLink>

      <NavLink to="/vidguky">Мої відгуки</NavLink>
      {user?.name ?? ""}
    </div>
  );
};

export default Header;
