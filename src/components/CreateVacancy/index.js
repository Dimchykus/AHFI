import React, { useEffect, useState } from "react";
import "./style.scss";
import Api, { baseURL, toast, sessionGet, sessionSet } from "../../api";
import { useNavigate } from "react-router-dom";

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

  const [editObj, setObj] = useState(null);

  useEffect(() => {
    Api.get("company").then((res) => {
      setCompanies(res.data);
    });
    Api.get("categories").then((res) => {
      console.log(res);
      setCategories(res.data);
    });

    const obj = sessionGet("vacancy");
    if (obj) {
      console.log(obj);
      setObj(obj);

      setTitle(obj.title);
      setDescription(obj.description);
      setCity(obj.city);
      setCategory(obj.categoryID.id);
      setExperience(obj.experience);
      setSalary(obj.salary);
      setCompany(obj.companyID.id);
    }

    return () => {
      sessionSet("vacancy", null);
    };
  }, []);

  let navigate = useNavigate();

  const onSubmit = async (e) => {
    if (!title) toast("Введіть назву");
    if (!city) toast("Введіть місто");
    if (!description) toast("Введіть опис");
    if (!experience) toast("Введіть досвід");
    if (!salary) toast("Введіть зарплату");

    if (!title || !city || !description || !experience || !salary) {
      return;
    }
    if (!editObj) {
      Api.post("vacancies", {
        title,
        city,
        categoryID: `${baseURL}category/${category}`,
        companyID: `${baseURL}companies/${company}`,
        description,
        experience,
        salary,
        createdAt: new Date(),
      })
        .then(() => {
          navigate("/vacancies");
          toast("Створено", "success");
        })
        .catch(() => {
          toast("Помилка Створення");
        });
    } else {
      const _company = companies.find((item) => {
        console.log(item.id, company);
        return item.id == company;
      });

      const _category = categories.find((item) => {
        console.log(item.id, category);
        return item.id == category;
      });

      Api.post(`vacancy/update/${editObj.id}`, {
        title,
        city,
        categoryID: _category,
        companyID: _company,
        description,
        experience,
        salary,
        createdAt: new Date(),
      })
        .then(() => {
          navigate("/vacancies");
          toast("Оновлено", "success");
        })
        .catch(() => {
          toast("Помилка оновлення");
        });
    }

    e.preventDefault();
  };

  return (
    <div class="create_v">
      <form
        className="form-create"
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
            className="create_v_input"
          />
        </div>

        <div class="create_v_inputBlock">
          <p class="create_v_inputTitle">Категорія</p>
          <select
            id="category"
            className="create_v_input"
            value={editObj ? category : undefined}
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
            value={editObj ? company : undefined}
            className="create_v_input"
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          >
            {companies.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        <div class="create_v_inputBlock">
          <p class="create_v_inputTitle">Місто</p>
          <input
            type="text"
            value={city}
            id="city"
            className="create_v_input"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </div>

        <div class="create_v_inputBlock">
          <p class="create_v_inputTitle">Опис</p>
          <textarea
            type="text"
            value={description}
            id="description"
            className="create_v_input"
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
            className="create_v_input"
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
            className="create_v_input"
            onChange={(e) => {
              setSalary(e.target.value);
            }}
          />
        </div>

        <input
          className="add-vacancy"
          type="submit"
          value={editObj ? "Оновити" : "Створити"}
        />
      </form>
    </div>
  );
};

export default CreateVacancy;
