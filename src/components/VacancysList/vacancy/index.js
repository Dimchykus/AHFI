import React from 'react';
import './styles.scss';

const vacancy = ({ id, name, description, salary }) => {
  return (
    <div className='each-vacancy'>
      <p className='each-vacancy__name'>{name}</p>
      <div className='description-block'>
        <p className='description-block__description'>Опис: {description}</p>
        <p className='description-block__salary'>Зарплата: {salary}</p>
      </div>
      <button className='each-vacancy__participate'>Відгукнутися</button>
    </div>
  );
};

export default vacancy;
