import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

const Main = () => {
  return (
    <div className='container'>
      <button className='create-vac'>
        <NavLink className='create-vac__link' to='/create-vacancy'>
          Створити вакансію
        </NavLink>
      </button>
    </div>
  );
};

export default Main;
