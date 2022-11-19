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

function App() {
  const user = Api.get("users").then((res) => {
    console.log(res.data._embedded);
    return res;
  });

  if (!user) return null;

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/vacancies" element={<VacancyList />}></Route>
          <Route path="/vacancies/:id" element={<Vacancy />}></Route>
          <Route path="/vidguky" element={<Vidguky />}></Route>
          <Route path="/create-vacancy" element={<CreateVacancy />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
