import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const vacancy = ({ id, name, description, salary }) => {
  return (
    <NavLink className='each-vacancy__full' to={`/vacancies/${id}`}>
      <div className='each-vacancy'>
        <p className='each-vacancy__name'>{name}</p>
        <div className='description-block'>
          <p className='description-block__description'>Опис: {description}</p>
          <p className='description-block__salary'>Зарплата: {salary}</p>
        </div>

        <button className='each-vacancy__participate'>Відгукнутися</button>
      </div>
    </NavLink>
  );
};

export default vacancy;
