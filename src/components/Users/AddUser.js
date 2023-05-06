import { useRef, useState, useEffect } from 'react';

import Navigation from '../Navigation';
import PopupBad from '../Popups/PopupBad';
import Loading from '../Loading/Loading';
import PopupGood from '../Popups/PopupGood';

import classes from '../../styles/AddUser.module.css';

function AddUser() {
  const [authBad, setAuthBad] = useState(false);
  const [authGood, setAuthGood] = useState(false);

  const loginRef = useRef('');
  const passwordRef = useRef('');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  async function addNewUser(user) {
    const response = await fetch(
      'https://react-magazyn-default-rtdb.firebaseio.com/users.json',
      {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
  }

  function submitHandler(event) {
    event.preventDefault();

    if (loginRef.current.value === '' || passwordRef.current.value === '') {
      setAuthBad(true);

      return;
    }

    const newUser = {
      login: loginRef.current.value,
      password: passwordRef.current.value,
      role: 'user',
    };

    addNewUser(newUser);
    loginRef.current.value = '';
    passwordRef.current.value = '';

    setAuthGood(true);
  }

  function changeBadState() {
    setAuthBad(false);
  }

  function changeGoodState() {
    setAuthGood(false);
  }

  const form = (
    <form className={classes.formularz} onSubmit={submitHandler}>
      <h1 className={classes.banner}>Dodaj Nowego Użytkownika</h1>
      <input type="text" id="login" ref={loginRef} placeholder="Podaj login" />

      <input
        type="password"
        id="password"
        ref={passwordRef}
        placeholder="Podaj hasło"
      />
      <button type="submit" className={classes.btn}>
        Dodaj
      </button>
    </form>
  );

  return (
    <div
      className={classes.container}
      style={
        authBad
          ? { backgroundColor: 'black' }
          : { backgroundColor: 'transparent' } && authGood
          ? { backgroundColor: 'green' }
          : { backgroundColor: 'transparent' }
      }
    >
      <Navigation />

      <div className={classes.register_container}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {authGood ? (
              <PopupGood
                title="Użytkownik został dodany do bazy danych"
                changeState={changeGoodState}
              />
            ) : (
              ''
            )}
            {authBad ? (
              <PopupBad
                title="Podano nieprawidłowe dane dla rejestracji użytkownika"
                changeState={changeBadState}
              />
            ) : (
              form
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AddUser;
