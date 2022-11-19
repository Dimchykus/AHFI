import React, { useEffect, useState } from "react";
import Vacancy from "./vacancy";
import "./style.scss";
import Api from "../../api";

// const vacancies = [
//   { id: 0, name: "Прибиральник", salary: 8000, description: "Треба прибирати" },
//   { id: 1, name: "Ойтішник", salary: 12000, description: "Треба кодити" },
//   {
//     id: 2,
//     name: "Бухгалтер",
//     salary: 18000,
//     description: "Треба рахувати гроші",
//   },
// ];

const VacancyList = () => {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    Api.get("vacancies").then((res) => {
      setVacancies(res.data._embedded.vacancies);
    });
  }, []);

  return (
    <div className="container">
      <div className="all-vacancies">
        {vacancies.map((obj, index) => (
          <Vacancy {...obj} key={obj.name} />
        ))}
      </div>
    </div>
  );
};

export default VacancyList;
