import React from 'react';
import { useParams } from 'react-router-dom';

const vacancies = [
  {
    id: 0,
    name: 'Прибиральник',
    salary: 8000,
    description: 'Треба прибирати',
  },
  { id: 1, name: 'Ойтішник', salary: 12000, description: 'Треба кодити' },
  {
    id: 2,
    name: 'Бухгалтер',
    salary: 18000,
    description: 'Треба рахувати гроші',
  },
];

const Vacancy = () => {
  const { id } = useParams();
  const vacancy = vacancies.find((obj) => obj.id === Number(id));

  return <div>{vacancy.name}</div>;
};

export default Vacancy;
