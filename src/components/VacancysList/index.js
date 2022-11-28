import React, { useState, useEffect } from "react";
import Vacancy from "./vacancy";
import Sort from "../Sort/index";
import "./style.scss";
import api, { toast } from "../../api";

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
    const searchParams = new URLSearchParams();

    searchParams.append("sort", 5);
    if (user && !user.isAdmin) searchParams.append("userId", user.id);

    const url = `vacancy/filter?${searchParams.toString()}`;

    api
      .get(url)
      .then((res) => {
        const list = res.data;
        if (user && user.isAdmin) {
          setVacancies(list);
        } else {
          setVacancies(list.filter((item) => item.status));
        }
      })
      .catch(() => {
        toast("Невдалось завантажити вакансії");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="filters-container">
        <Sort setData={setVacancies} user={user} />
      </div>
      <div className="all-vacancies">
        {vacancies.length === 0 && <img src="empty.png" alt="собачка втікла" />}
        {vacancies.map((obj, index) => (
          <Vacancy {...obj} key={obj.name} user={user} update={getData} />
        ))}
      </div>
    </div>
  );
};

export default VacancyList;
