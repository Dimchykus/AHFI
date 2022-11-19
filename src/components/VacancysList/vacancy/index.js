import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import Api, { baseURL } from "../../../api";
const vacancy = ({ id, name, description, salary, user, status, update }) => {
  return (
    <NavLink className="each-vacancy__full" to={`/vacancies/${id}`}>
      <div className="each-vacancy">
        <p className="each-vacancy__name">{name}</p>
        <div className="description-block">
          <p className="description-block__description">Опис: {description}</p>
          <p className="description-block__salary">Зарплата: {salary}</p>
        </div>

        {user.isAdmin && (
          <>
            {!status && (
              <button
                className="each-vacancy__participate"
                onClick={() => {
                  Api.put(`vacancy/approve/${id}`).then(() => {
                    update();
                  });
                }}
              >
                Підвердити
              </button>
            )}
            {status && (
              <button
                className="each-vacancy__participate"
                onClick={() => {
                  Api.put(`vacancy/decline/${id}`).then(() => {
                    update();
                  });
                }}
              >
                Сховати
              </button>
            )}
          </>
        )}

        <button className="each-vacancy__participate">Відгукнутися</button>
      </div>
    </NavLink>
  );
};

export default vacancy;
