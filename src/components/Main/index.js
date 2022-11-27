import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

const Main = ({ user }) => {
  return (
    <div className="container">
      <h1>AHFI</h1>
      {user.isAdmin && (
        <NavLink className="create-vac" to="/create-vacancy">
          Створити вакансію
        </NavLink>
      )}
      <NavLink className="create-vac" to="/in-progress">
        Пропозиції житла
      </NavLink>
      <NavLink className="create-vac" to="/in-progress">
        Медичні та освітні заклади
      </NavLink>
      <NavLink className="create-vac" to="/in-progress">
        Розподілення фін. допомоги організацій
      </NavLink>
      <NavLink className="create-vac" to="/in-progress">
        Перепрофілювання та працевлаштування
      </NavLink>
      <NavLink className="create-vac" to="/in-progress">
        Надання психологічних послуг
      </NavLink>
      <NavLink className="create-vac" to="/in-progress">
        Державні виплати
      </NavLink>
      <NavLink className="create-vac" to="/in-progress">
        Формування речової допомоги
      </NavLink>
    </div>
  );
};

export default Main;
