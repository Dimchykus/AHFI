import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../api';
import { useNavigate } from 'react-router-dom';
import './style.scss';

// const vacancies = [
//   {
//     id: 0,
//     name: "Прибиральник",
//     salary: 8000,
//     description: "Треба прибирати",
//   },
//   { id: 1, name: "Ойтішник", salary: 12000, description: "Треба кодити" },
//   {
//     id: 2,
//     name: "Бухгалтер",
//     salary: 18000,
//     description: "Треба рахувати гроші",
//   },
// ];

const Vacancy = ({ user }) => {
  let navigate = useNavigate();

  const [vacancy, setVacancy] = useState(null);
  const [file, setFile] = useState("");

  const { id } = useParams();

  useEffect(() => {
    Api.get(`vacancies/${id}`).then((res) => {
      setVacancy(res.data);
      console.log(res);
    });
  }, []);

  if (!vacancy) return null;

  console.log(vacancy);

  return (
    <div className='vacancy'>
      <h2 className='vacancy__name'>{vacancy.title}</h2>
      <h3>Зарплата: {vacancy.salary}</h3>
      <div className='description'>
        <h2 className='description__header'>Опис вакансії</h2>
        <p className='description__info'>{vacancy.description}</p>
      </div>
      <div className='applying'>
        <input
          type='file'
          className='applying__upload'
          onChange={(e) => {
            setFile(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
        <button
          className='applying__finish'
          onClick={() => {
            Api.post('Responses', {
              userID: user.id,
              vacancyID: vacancy.id,
              file,
            }).then((res) => {
              navigate('/');
            });
          }}
        >
          Відгукнутись
        </button>
      </div>
    </div>
  );
};

export default Vacancy;
