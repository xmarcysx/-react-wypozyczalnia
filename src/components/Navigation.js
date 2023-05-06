import { NavLink } from 'react-router-dom';

import classes from '../styles/Navigation.module.css';

function Navigation(props) {
  function logoutHandler() {
    sessionStorage.removeItem('loggedUserRole');
    return;
  }

  const loggedRole = sessionStorage.getItem('loggedUserRole');

  return (
    <nav className={classes.navigation}>
      <h1>Magazyn</h1>
      <ul>
        <li>
          <NavLink
            to="/system/lista-samochodow"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Lista Samochodów
          </NavLink>
        </li>
        {loggedRole === 'user' ? (
          ''
        ) : (
          <>
            <li>
              <NavLink
                to="/system/dodaj-samochod"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Dodaj Samochód
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/system/edycja-samochodow"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Edycja Samochodów
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/system/dodaj-uzytkownika"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Dodaj użytkownika
              </NavLink>
            </li>
          </>
        )}

        <li onClick={logoutHandler}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Wyloguj
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
