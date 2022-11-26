import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

const Main = ({ user }) => {
  return (
    <div className="container">
      {user.isAdmin && (
        <NavLink className="create-vac" to="/create-vacancy">
          Створити вакансію
        </NavLink>
      )}
    </div>
  );
};

export default Main;
