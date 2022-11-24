import React, { useState } from "react";
import Api from "../../api";

const Vidgyku = ({user}) => {
  const [responses, setResponses] = useState([]);
  Api.get(`Responses/user/${user.id}`).then((res) => {
    setResponses(res.data._embedded.responses);
  });
  return (
    <div>
      {responses.map((res) => (
        <div>{res.id}</div>
      ))} 
    </div>
  );
};

export default Vidgyku;
