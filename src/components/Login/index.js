import { useState } from 'react';
import Api from '../../api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  let navigate = useNavigate();
  const [state, setState] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  const submit = () => {
    if (!state) {
      Api.get(`users/mail?email=${email}`).then((res) => {
        console.log(res);
        setUser(res.data);
        navigate('/');
      });
    } else {
      Api.post('users', { email, password }).then((res) => {
        setUser(res.data._embedded);
        navigate('/');
      });
    }
  };

  return state ? (
    <div>
      <div class='login_inputBlock'>
        <p class='login_inputTitle'>Пошта</p>
        <input
          type='text'
          value={email}
          id='city'
          className='login_input'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div class='login_inputBlock'>
        <p class='login_inputTitle'>Пароль</p>
        <input
          type='text'
          value={password}
          id='city'
          classname='login_input'
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
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
    <div>
      <div class='login_inputBlock'>
        <p class='login_inputTitle'>Пошта</p>
        <input
          type='text'
          value={email}
          id='city'
          classname='login_input'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div class='login_inputBlock'>
        <p class='login_inputTitle'>Пароль</p>
        <input
          type='text'
          value={password}
          id='city'
          classname='login_input'
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
      </div>
      <button
        onClick={() => {
          submit();
        }}
      >
        Увійти
      </button>
      <button
        onClick={() => {
          setState(true);
        }}
      >
        Створити аккаунт
      </button>
    </div>
  );
};

export default Login;
