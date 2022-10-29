import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VacancyList from "../src/components/VacancysList";
import Vacancy from "../src/components/Vacancy";
import Vidguky from "../src/components/Vidguky";
import Main from "../src/components/Main";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/vacancies" element={<VacancyList />}>
            <Route path=":id" element={<Vacancy />}></Route>
          </Route>
          <Route path="/vidguky" element={<Vidguky />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
