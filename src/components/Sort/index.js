import { useState, useEffect } from "react";
import Api from "../../api";
import "./style.scss";

const Sort = ({ setData, user }) => {
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState(null);
  const [city, setCity] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const [salary, setSalary] = useState(null);
  const [sort, setSort] = useState(5);
  const [personal, setPersonal] = useState(true);
  // const [type, setType] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Api.get("categories").then((res) => {
      console.log(res);
      setCategories(res.data);
    });
  }, []);

  const handleSubmit = () => {
    const searchParams = new URLSearchParams();

    if (title) searchParams.append("title", title);
    if (experience) searchParams.append("experience", parseInt(experience, 10));
    if (city) searchParams.append("city", city);
    console.log(categoryID);
    if (categoryID && categoryID >= 0)
      searchParams.append("categoryID", parseInt(categoryID, 10));
    if (salary) searchParams.append("salary", parseInt(salary, 10));
    searchParams.append("sort", sort);
    if (user && !user.isAdmin && personal)
      searchParams.append("userId", user.id);

    const url = `vacancy/filter?${searchParams.toString()}`;

    Api.get(url).then((res) => {
      if (user && user.isAdmin) {
        setData(res.data);
      } else {
        setData(res.data.filter((item) => item.status));
      }
    });
  };

  return (
    <div className="filters">
      {user && !user.isAdmin && (
        <div className="sort_inputBlock">
          <p className="sort_inputTitle">Персональні вакансії</p>
          <input
            onChange={(e) => {
              setPersonal(e.target.checked);
            }}
            checked={personal}
            type="checkbox"
            id="title"
            className="sort_input"
          />
        </div>
      )}

      <div className="sort_inputBlock">
        <p className="sort_inputTitle">Назва</p>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          type="text"
          id="title"
          className="sort_input"
        />
      </div>

      <div className="sort_inputBlock">
        <p className="sort_inputTitle">Досвід</p>
        <input
          onChange={(e) => {
            setExperience(e.target.value);
          }}
          value={experience}
          type="number"
          min={0}
          id="title"
          className="sort_input"
        />
      </div>
      <div className="sort_inputBlock">
        <p className="sort_inputTitle">Категорія</p>
        <select
          id="category"
          className="sort_input"
          onChange={(e) => {
            console.log(e);
            setCategoryID(e.target.value);
          }}
        >
          <option value={-1}>Всі</option>
          {categories.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="sort_inputBlock">
        <p className="sort_inputTitle">Мінімальна зарплата</p>
        <input
          onChange={(e) => {
            setSalary(e.target.value);
          }}
          value={salary}
          type="number"
          min={0}
          id="title"
          className="sort_input"
        />
      </div>
      <div className="sort_inputBlock">
        <p className="sort_inputTitle">Сортувати</p>
        <select
          id="category"
          className="sort_input"
          onChange={(e) => {
            console.log(e);
            setSort(e.target.value);
          }}
        >
          <option value={1}>за зарплатою (від нижчої до вищої)</option>
          <option value={2}>за зарплатою (від вищої до нижчої)</option>
          <option value={3}>за датою в зрост (старіші)</option>
          <option value={4}>за датою в спад (новіші)</option>
        </select>
      </div>

      <button
        className="apply-filters"
        onClick={() => {
          handleSubmit();
        }}
      >
        Застосувати
      </button>
    </div>
  );
};

export default Sort;
