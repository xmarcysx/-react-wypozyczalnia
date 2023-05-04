import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Loading from './Loading';

import magazyn from '../images/wypozyczalnia.jpg';
import classes from './Welcome.module.css';

function Welcome() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const welcomeContainer = (
    <>
      <h1>Witamy w Wypożyczalni</h1>
      <img className={classes.magazyn_img} src={magazyn} alt="magazyn" />
      <h3>Zaloguj się do systemu</h3>
      <NavLink to="/logowanie">
        <button className={classes.btn}>Logowanie</button>
      </NavLink>
    </>
  );

  return (
    <div className={classes.container}>
      <div className={classes.welcome_container}>
        {isLoading ? <Loading /> : welcomeContainer}
      </div>
    </div>
  );
}

export default Welcome;
