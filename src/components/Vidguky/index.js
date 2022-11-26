import React, { useEffect, useState } from "react";
import Api from "../../api";

export const Response = ({ res, handle, user }) => {
  function saveByteArray(reportName, byte) {
    var file = new Blob([byte], { type: "application/pdf" });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

  return (
    <div>
      <h4>{user.name}</h4>
      <h5>{user.email}</h5>
      <button
        onClick={() => {
          Api.get(`Responses/${res.id}`, {
            responseType: "arraybuffer",
          }).then((res) => {
            saveByteArray("file", res.data);
          });
        }}
      >
        Завантажити
      </button>
      <button
        onClick={() => {
          Api.get(`Responses/delete/${res.id}`).then((res) => {
            handle();
          });
        }}
      >
        Відхилити
      </button>
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
    <div>
      {responses.map((res) => (
        <Response res={res} handle={() => handle()} user={res.userID} />
      ))}
    </div>
  );
};

export default Vidgyku;
