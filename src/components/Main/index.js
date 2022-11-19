import React from "react";
import { NavLink } from "react-router-dom";

const Main = () => {
  return (
    <div>
      Main
      <NavLink to="/create-vacancy">Створити вакансію</NavLink>
    </div>
  );
};

export default Main;
