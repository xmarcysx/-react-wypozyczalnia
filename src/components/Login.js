import { useRef, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Loading from './Loading';
import PopupBad from './PopupBad';
import PopupGood from './PopupGood';

import classes from './Login.module.css';

function Login() {
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [badAuth, setBadAuth] = useState(false);
  const [goodAuth, setGoodAuth] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const loginRef = useRef('');
  const passwordRef = useRef('');

  useEffect(() => {
    fetchUsersHandler();
  }, []);

  async function fetchUsersHandler() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://react-magazyn-default-rtdb.firebaseio.com/users.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedUsers = [];

      for (const key in data) {
        loadedUsers.push({
          id: key,
          login: data[key].login,
          password: data[key].password,
          role: data[key].role,
        });
      }

      setUsers(loadedUsers);
    } catch (error) {
      setError(error.message);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  function submitHandler(event) {
    event.preventDefault();

    const loginUser = {
      login: loginRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(users);

    const user = users.find(
      (user) =>
        user.login === loginUser.login && user.password === loginUser.password
    );

    if (user) {
      setLoggedUser({
        login: user.login,
        password: user.password,
        role: user.role,
      });
      setGoodAuth(true);
      setBadAuth(false);
      return;
    } else {
      setGoodAuth(false);
      setBadAuth(true);
      return;
    }
  }

  function changeBadState() {
    loginRef.current.value = '';
    passwordRef.current.value = '';
    setBadAuth(false);
  }

  function changeGoodState() {
    setGoodAuth(false);
    sessionStorage.setItem('loggedUserRole', loggedUser.role);
    navigate('/system/lista-samochodow');
    window.location.reload(true);
  }

  const loginForm = (
    <form className={classes.formularz} onSubmit={submitHandler}>
      <h1>Logowanie</h1>
      <input type="text" id="login" ref={loginRef} placeholder="Podaj login" />

      <input
        type="password"
        id="password"
        ref={passwordRef}
        placeholder="Podaj hasło"
      />
      <button type="submit" className={classes.btn}>
        Zaloguj się
      </button>
    </form>
  );

  return (
    <div
      className={classes.container}
      style={
        badAuth
          ? { backgroundColor: 'black' }
          : { backgroundColor: 'transparent' } && goodAuth
          ? { backgroundColor: 'green' }
          : { backgroundColor: 'transparent' }
      }
    >
      <div className={classes.login_container}>
        {isLoading ? <Loading /> : loginForm}
        {badAuth && (
          <PopupBad
            title="Brak Autoryzacji. Nieprawidłowe dane"
            changeState={changeBadState}
          />
        )}

        {goodAuth && (
          <PopupGood
            title={`Witamy w systemie ${loggedUser.login}`}
            changeState={changeGoodState}
          />
        )}

        {!isLoading && error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
