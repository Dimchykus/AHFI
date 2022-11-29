import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import VacancyList from "../src/components/VacancysList";
import Vacancy from "../src/components/Vacancy";
import Vidguky from "../src/components/Vidguky";
import Main from "../src/components/Main";
import CreateVacancy from "../src/components/CreateVacancy";
import Header from "./components/Header";
import Login from "./components/Login";
import Api, { sessionGet } from "./api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Module from "./components/Module";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);

  /*
 {
    id: 0,
    name: "Торас",
    age: -1,
    experience: 100500,
    isAdmin: true,
  }
  */
  useEffect(() => {
    const data = sessionGet("user");

    if (data) setUser(data);
  }, []);

  return (
    <div className="main">
      <ToastContainer />
      <Header user={user} resetUser={() => setUser(null)} />
      <Routes>
        <Route
          path="/login"
          element={<Login setUser={setUser} user={user} />}
          user={user}
        ></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Main user={user} />{" "}
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/vacancies" element={<VacancyList user={user} />}></Route>
        <Route path="/vacancies/:id" element={<Vacancy user={user} />}></Route>
        <Route
          path="/vidguky"
          element={
            <ProtectedRoute user={user}>
              <Vidguky user={user} />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/create-vacancy"
          element={
            <ProtectedRoute user={user}>
              <CreateVacancy user={user} />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/in-progress" element={<Module user={user} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
