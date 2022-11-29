import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api, { toast } from '../../api';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import { Response } from '../Vidguky';
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
  const [responses, setResponses] = useState([]);
  const [file, setFile] = useState('');

  const { id } = useParams();

  const getVidguks = () => {
    Api.get(`Responses/vacancy/${id}`).then((res) => {
      setResponses(res.data);
    });
  };

  useEffect(() => {
    Api.get(`vacancies/${id}`).then((res) => {
      setVacancy(res.data);

      console.log(res.data);
    });
    getVidguks();
  }, []);

  if (!id) return null;

  if (!vacancy) return null;

  return (
    <div className='vacancy'>
      <h2 className='vacancy__name'>{vacancy.title}</h2>
      <h3>Зарплата: {vacancy.salary}</h3>
      <h3>Місто: {vacancy.city}</h3>
      <h3>Дата створення: {vacancy.createdAt}</h3>
      <div className='description'>
        <h2 className='description__header'>Опис вакансії</h2>
        <p className='description__info'>{vacancy.description}</p>
      </div>
      {!user.isAdmin && (
        <div className='applying'>
          <input
            type='file'
            className='applying__upload'
            title='Виберіть файл'
            accept='application/pdf'
            onChange={(e) => {
              const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
              if (fileSize > 5) {
                alert('Максимальний розмір 5мб.');
                // $(file).val(''); //for clearing with Jquery
                e.target.value = '';
                return;
              } else {
                setFile(e.target.files[0]);
                console.log(e.target.files[0]);
              }
            }}
          />
          <button
            className='applying__finish'
            onClick={() => {
              let formData = new FormData();
              formData.append('file', file);

              Api.post(
                `Responses?userId=${user.id}&VacancyId=${parseInt(id, 10)}`,
                formData
              )
                .then((res) => {
                  toast('Відгук успішно відправлений', 'success');
                  navigate('/');
                })
                .catch(() => {
                  toast('Помилка відправлення');
                });
            }}
          >
            Відгукнутись
          </button>
        </div>
      )}
      {user.isAdmin && (
        <div className='vidhyk__List padding0'>
          {responses.map((res) => (
            <Response res={res} handle={() => getVidguks()} user={res.userID} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Vacancy;
