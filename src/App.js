import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VacancyList from "../src/components/VacancysList";
import Vacancy from "../src/components/Vacancy";
import Vidguky from "../src/components/Vidguky";
import Main from "../src/components/Main";
import CreateVacancy from "../src/components/CreateVacancy";
import Header from "./components/Header";
import Api from "./api";
import isAdmin from "./utils/index";

function App() {
  // const user = Api.get("users").then((res) => {
  //   console.log(res.data._embedded);
  //   return res;
  // });

  const user = {
    id: 0,
    name: "Торас",
    age: -1,
    experience: 100500,
    isAdmin: true,
  };

  if (!user) return null;

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main user={user} />}></Route>
          <Route
            path="/vacancies"
            element={<VacancyList user={user} />}
          ></Route>
          <Route
            path="/vacancies/:id"
            element={<Vacancy user={user} />}
          ></Route>
          <Route path="/vidguky" element={<Vidguky user={user} />}></Route>
          <Route
            path="/create-vacancy"
            element={<CreateVacancy user={user} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
