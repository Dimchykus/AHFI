import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../api';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const vacancies = [
  {
    id: 0,
    name: 'Прибиральник',
    salary: 8000,
    description:
      'Dialog Semiconductor/Renesas is a global semiconductor company providing hardware and software solutions for a range of cutting-edge technologies including self-driving cars, robots, automated factory equipment, and smart home applications. We are a key supplier to the world’s leading manufacturers of the electronics you rely on every day; you may not see our products, but they are all around you.Renesas employs roughly 21,000 people in more than 30 countries worldwide. As a global team, our employees actively embody the Renesas Culture, our guiding principles based on five key elements: Transparent, Agile, Global, Innovative, and Entrepreneurial. At Renesas, we want to build a sustainable future where technology helps make our lives easier. Join us and build your future by being part of what’s next in electronics and the world.The role. To support the global HR Systems team with different activities, including managing the HR Systems inbox, testing system improvements, providing reports to the business and supporting other system activities and HR projects.',
  },
  { id: 1, name: 'Ойтішник', salary: 12000, description: 'Треба кодити' },
  {
    id: 2,
    name: 'Бухгалтер',
    salary: 18000,
    description: 'Треба рахувати гроші',
  },
];

const Vacancy = ({ user }) => {
  let navigate = useNavigate();

  const [vacancy, setVacancy] = useState(vacancies[0]);
  const [file, setFile] = useState('');

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
    <div className='vacancy'>
      <h2 className='vacancy__name'>{vacancy.name}</h2>
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
