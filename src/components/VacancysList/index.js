import React, { useState, useEffect } from "react";
import Vacancy from "./vacancy";
import Sort from "../Sort/index";
import "./style.scss";
import api from "../../api";

// const vacancies = [
//   {
//     id: 0,
//     name: "Прибиральник",
//     salary: 8000,
//     description: "Треба прибирати",
//     status: true,
//   },
//   {
//     id: 1,
//     name: "Ойтішник",
//     salary: 12000,
//     description: "Треба кодити",
//     status: null,
//   },
//   {
//     id: 2,
//     name: "Бухгалтер",
//     salary: 18000,
//     description: "Треба рахувати гроші",
//     status: null,
//   },
// ];

const VacancyList = ({ user }) => {
  const [vacancies, setVacancies] = useState([]);

  const getData = () => {
    api.get("vacancies").then((res) => {
      setVacancies(res.data._embedded.vacancies);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <Sort
        // setData={setVacancies}
        setData={() => {}}
        user={user}
      />
      <div className="all-vacancies">
        {vacancies.map((obj, index) => (
          <Vacancy
            {...obj}
            key={obj.name}
            user={user}
            // update={getData}
            update={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default VacancyList;
