import React, { useEffect, useState } from "react";
import Api from "../../api";

const Vidgyku = ({ user }) => {
  const [responses, setResponses] = useState([]);

  const handle = () => {
    Api.get(`Responses/user/${user.id}`).then(
      (res) => {
        console.log(res);
        setResponses(res.data);
      }
    );
  };

  useEffect(() => {
    handle();
  }, []);

  function saveByteArray(reportName, byte) {
    var file = new Blob([byte], { type: "application/pdf" });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

  return (
    <div>
      {responses.map((res) => (
        <>
          <div>{res.id}</div>
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
        </>
      ))}
    </div>
  );
};

export default Vidgyku;
