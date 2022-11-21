import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import Api, { baseURL } from "../../../api";

const Vacancy = ({ id, name, description, salary, user, status, update }) => {
  return (
    <div className="each-vacancy__full">
      <div className="each-vacancy">
        <NavLink to={`/vacancies/${id}`}>
          <p className="each-vacancy__name">{name}</p>
        </NavLink>
        <div className="description-block">
          <p className="description-block__description">Опис: {description}</p>
          <p className="description-block__salary">Зарплата: {salary}</p>
        </div>

        {user.isAdmin && (
          <>
            {!status && (
              <button
                className="each-vacancy__participate"
                onClick={(e) => {
                  Api.put(`vacancy/approve/${id}`).then(() => {
                    update();
                  });
                  e.stopPropagation();
                }}
              >
                Підвердити
              </button>
            )}
            {status && (
              <button
                className="each-vacancy__participate"
                onClick={(e) => {
                  Api.put(`vacancy/decline/${id}`).then(() => {
                    update();
                  });
                  e.stopPropagation();
                }}
              >
                Сховати
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Vacancy;
