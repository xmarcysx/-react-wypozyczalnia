import { NavLink } from 'react-router-dom';

import classes from './Welcome.module.css';

function ErrorPage() {
  return (
    <div className={classes.container}>
      <h1>404</h1>
      <h3>Ta strona nie istniej</h3>
      <NavLink to="/">
        <button className={classes.btn}>Powrót</button>
      </NavLink>
    </div>
  );
}

export default ErrorPage;
