import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../api";
import { useNavigate } from "react-router-dom";

const vacancies = [
  {
    id: 0,
    name: "Прибиральник",
    salary: 8000,
    description: "Треба прибирати",
  },
  { id: 1, name: "Ойтішник", salary: 12000, description: "Треба кодити" },
  {
    id: 2,
    name: "Бухгалтер",
    salary: 18000,
    description: "Треба рахувати гроші",
  },
];

const Vacancy = ({ user }) => {
  let navigate = useNavigate();

  const [vacancy, setVacancy] = useState(vacancies[0]);
  const [file, setFile] = useState("");

  // const { id } = useParams();

  // useEffect(() => {
  //   Api.get("vacancies").then((res) => {
  //     const data = res.data._embedded.vacancies.find(
  //       (obj) => obj.id === Number(id)
  //     );
  //     setVacancy(data);
  //   });
  // }, []);

  if (!vacancy) return null;

  return (
    <div>
      <h2>{vacancy.name}</h2>
      <p>{vacancy.description}</p>
      <p>{vacancy.salary}</p>

      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
          console.log(e.target.files[0]);
        }}
      />
      <button
        onClick={() => {
          Api.post("Responses", {
            userID: user.id,
            vacancyID: vacancy.id,
            file,
          }).then((res) => {
            navigate("/");
          });
        }}
      >
        Відгукнутись
      </button>
    </div>
  );
};

export default Vacancy;
