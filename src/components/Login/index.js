import { useEffect, useState } from "react";
import Api, { sessionSet, toast } from "../../api";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Login = ({ setUser, user }) => {
  let navigate = useNavigate();
  const [state, setState] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [name, setName] = useState("");
  const [vik, setVik] = useState("");
  const [dosvid, setDosvid] = useState("");

  const submit = () => {
    if (!state) {
      if (!password) {
        toast("Введіть пароль", "error");
        return;
      }

      Api.get(`users/mail?email=${email}`)
        .then((res) => {
          console.log(res);
          setUser(res.data);
          navigate("/");

          sessionSet("user", res.data);
        })
        .catch(() => {
          toast("Неправильні дані, перевірте пароль та пошту!!!", "error");
        });
    } else {
      if (!email) toast("Введіть пошту");
      if (!name) toast("Введіть імя");
      if (!vik) toast("Введіть вік");
      if (!dosvid) toast("Введіть досвід");

      if (!email || !name || !vik || !dosvid) {
        return;
      }

      Api.post("users", {
        email,
        name,
        age: vik,
        experience: dosvid,
        isAdmin: false,
        userKeys: "java",
      }).then((res) => {
        setUser(res.data._embedded);
        navigate("/");
      });
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return state ? (
    <div>
      <div class="login_inputBlock">
        <p class="login_inputTitle">Пошта</p>
        <input
          type="text"
          value={email}
          id="city"
          className="login_input"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div class="login_inputBlock">
        <p class="login_inputTitle">Імя</p>
        <input
          type="text"
          value={name}
          id="city"
          className="login_input"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div class="login_inputBlock">
        <p class="login_inputTitle">Вік</p>
        <input
          type="text"
          value={vik}
          id="city"
          className="login_input"
          onChange={(e) => {
            setVik(e.target.value);
          }}
        />
      </div>
      <div class="login_inputBlock">
        <p class="login_inputTitle">Досвід</p>
        <input
          type="text"
          value={dosvid}
          id="city"
          className="login_input"
          onChange={(e) => {
            setDosvid(e.target.value);
          }}
        />
      </div>
      <div class="login_inputBlock">
        <p class="login_inputTitle">Пароль</p>
        <input type="text" id="city" className="login_input" />
      </div>
      <button
        onClick={() => {
          submit();
        }}
      >
        Реєструватись
      </button>
      <button
        onClick={() => {
          setState(false);
        }}
      >
        Уже існує аккаунт
      </button>
    </div>
  ) : (
    <div className="login-form">
      <div class="login_inputBlock">
        <p class="login_inputTitle">Пошта</p>
        <input
          type="text"
          value={email}
          id="city"
          className="login_input"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div class="login_inputBlock">
        <p class="login_inputTitle">Пароль</p>
        <input
          type="text"
          value={password}
          id="city"
          className="login_input"
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
      </div>
      <div className="buttonscn">
        <button
          className="login-button"
          onClick={() => {
            submit();
          }}
        >
          Увійти
        </button>
        <button
          className="signin-button"
          onClick={() => {
            setState(true);
          }}
        >
          Створити аккаунт
        </button>
      </div>
    </div>
  );
};

export default Login;
