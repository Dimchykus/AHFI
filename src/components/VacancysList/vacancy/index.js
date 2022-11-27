import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import Api, { baseURL } from "../../../api";

const Vacancy = ({
  id,
  title,
  description,
  salary,
  user,
  status,
  update,
  _links,
}) => {
  return (
    <div className="each-vacancy__full">
      <div className="each-vacancy">
        <div className="description-block">
          <NavLink
            className="info__link"
            to={`/vacancies/${
              _links
                ? _links.self.href.split("/")[
                    _links.self.href.split("/").length - 1
                  ]
                : id
                ? id
                : 0
            }`}
          >
            <p className="each-vacancy__name">{title}</p>
          </NavLink>
          <p className="description-block__description">
            Опис: {description.split(" ").slice(0, 10).join(" ")}...
          </p>
          <p className="description-block__salary">Зарплата: {salary}</p>
        </div>

        <div className="each-vacancy__buttons">
          {user && user.isAdmin && (
            <>
              {!status && (
                <button
                  className="each-vacancy__participate"
                  onClick={(e) => {
                    Api.post(
                      `vacancy/approve/${
                        _links
                          ? _links.self.href.split("/")[
                              _links.self.href.split("/").length - 1
                            ]
                          : id
                          ? id
                          : 0
                      }`
                    ).then(() => {
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
                    Api.post(
                      `vacancy/decline/${
                        _links
                          ? _links.self.href.split("/")[
                              _links.self.href.split("/").length - 1
                            ]
                          : id
                          ? id
                          : 0
                      }`
                    ).then(() => {
                      update();
                    });
                    e.stopPropagation();
                  }}
                >
                  Сховати
                </button>
              )}
              <button
                className="each-vacancy__participate delete"
                onClick={(e) => {
                  Api.post(
                    `vacancy/delete/${
                      _links
                        ? _links.self.href.split("/")[
                            _links.self.href.split("/").length - 1
                          ]
                        : id
                        ? id
                        : 0
                    }`
                  ).then(() => {
                    update();
                  });
                  e.stopPropagation();
                }}
              >
                Видалити
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vacancy;
