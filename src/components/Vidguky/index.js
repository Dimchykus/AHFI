import React, { useEffect, useState } from "react";
import Api from "../../api";

const Vidgyku = ({ user }) => {
  const [responses, setResponses] = useState([]);

  const handle = () => {
    Api.get(`Responses/user/${user.id}`).then((res) => {
      console.log(res);
      setResponses(res.data);
    });
  };

  useEffect(() => {
    handle();
  }, []);

  return (
    <div>
      {responses.map((res) => (
        <>
          <div>{res.id}</div>
          <div
            onClick={() => {
              const filename = res.headers
                .get("Content-Disposition")
                .split("filename=")[1];
              res.blob().then((blob) => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement("a");
                a.href = url;
                a.download = filename;
                a.click();
              });
            }}
          >
            Завантажити
          </div>
        </>
      ))}
    </div>
  );
};

export default Vidgyku;
