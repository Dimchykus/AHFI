import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";

const Header = () => {
  return (
    <div className="header">
      <NavLink to="/">Головна</NavLink>

      <NavLink to="/vacancies">Вакансії</NavLink>

      <NavLink to="/vidguky">Мої відгуки</NavLink>
    </div>
  );
};

export default Header;
