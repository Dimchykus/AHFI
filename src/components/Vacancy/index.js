import React from "react";
import { useParams } from "react-router-dom";

const Vacancy = () => {
  let { id } = useParams();
  return <div>Vacancy {id}</div>;
};

export default Vacancy;
