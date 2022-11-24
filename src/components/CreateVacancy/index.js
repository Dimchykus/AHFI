import React, { useEffect, useState } from "react";
import "./style.scss";
import Api, { baseURL } from "../../api";

const CreateVacancy = () => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState(1);
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState(0);
  const [salary, setSalary] = useState(0);
  const [company, setCompany] = useState(1);

  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Api.get("companies").then((res) => {
      setCompanies(res.data._embedded.companies);
    });
    Api.get("categories").then((res) => {
      console.log(res);
      setCategories(res.data);
    });
  }, []);

  const onSubmit = async (e) => {
    Api.post("vacancies", {
      title,
      city,
      categoryID: `${baseURL}category/${category}`,
      companyID: `${baseURL}companies/${company}`,
      description,
      experience,
      salary,
      createdAt: new Date(),
    });

    e.preventDefault();
  };

  return (
    <div class="create_v">
      <form
        action={`${baseURL}vacancies`}
        method="POST"
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div class="create_v_inputBlock">
          <p class="create_v_inputTitle">Назва</p>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            type="text"
            id="title"
            class="create_v_input"
          />
        </div>

        <div class="create_v_inputBlock">
          <p class="create_v_inputTitle">Категорія</p>
          <select
            id="category"
            class="create_v_input"
            onChange={(e) => {
              console.log(e);
              setCategory(e.target.value);
            }}
          >
            {categories.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        <div class="create_v_inputBlock">
          <p class="create_v_inputTitle">Компанія</p>
          <select
            id="company"
            class="create_v_input"
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          >
            {companies.map((item) => (
              <option value={item._links.self.href}>{item.name}</option>
            ))}
          </select>
        </div>

        <div class="create_v_inputBlock">
          <p class="create_v_inputTitle">Місто</p>
          <input
            type="text"
            value={city}
            id="city"
            class="create_v_input"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </div>

        <div class="create_v_inputBlock">
          <p class="create_v_inputTitle">Опис</p>
          <input
            type="text"
            value={description}
            id="description"
            class="create_v_input"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <div class="create_v_inputBlock">
          <p class="create_v_inputTitle">Досвід</p>
          <input
            type="number"
            value={experience}
            id="experience"
            class="create_v_input"
            onChange={(e) => {
              setExperience(e.target.value);
            }}
          />
        </div>

        <div class="create_v_inputBlock">
          <p class="create_v_inputTitle">Зарплата</p>
          <input
            type="number"
            id="salary"
            value={salary}
            class="create_v_input"
            onChange={(e) => {
              setSalary(e.target.value);
            }}
          />
        </div>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreateVacancy;
