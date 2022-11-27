import React, { useEffect, useState } from 'react';
import Api from '../../api';
import './styles.scss';

export const Response = ({ res, handle, user }) => {
  const { vacancyID: vacancy } = res;
  function saveByteArray(reportName, byte) {
    var file = new Blob([byte], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

  return (
    <div className='vidhyk__'>
      <h4 className='title'>{vacancy.title}</h4>
      <h5 className='city'>{vacancy.city}</h5>
      <h5 className='salary'>{vacancy.salary}</h5>
      <div className='buttons-cont'>
        <button
          className='load'
          onClick={() => {
            Api.get(`Responses/${res.id}`, {
              responseType: 'arraybuffer',
            }).then((res) => {
              saveByteArray('file', res.data);
            });
          }}
        >
          Завантажити
        </button>
        <button
          className='delete'
          onClick={() => {
            Api.get(`Responses/delete/${res.id}`).then((res) => {
              handle();
            });
          }}
        >
          Відхилити
        </button>
      </div>
    </div>
  );
};

const Vidgyku = ({ user }) => {
  const [responses, setResponses] = useState([]);

  const handle = () => {
    console.log(user);
    if (!user.isAdmin) {
      Api.get(`Responses/user/${user.id}`).then((res) => {
        console.log(res);
        setResponses(res.data);
      });
    } else {
      Api.get(`Responses`).then((res) => {
        console.log(res);
        setResponses(res.data);
      });
    }
  };

  useEffect(() => {
    handle();
  }, []);

  return (
    <div className='vidhyk__List'>
      {responses.map((res) => (
        <Response res={res} handle={() => handle()} user={res.userID} />
      ))}
    </div>
  );
};

export default Vidgyku;
