import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ErrorPage from './components/ErrorPage';
import Login from './components/Login';
import Welcome from './components/Welcome';
import ListCars from './components/Cars/ListCars';
import AddUser from './components/Users/AddUser';
import ListEditCars from './components/Cars/ListEditCars';
import Protected from './components/Protected';
import AddNewCar from './components/Cars/AddNewCar';

import './App.css';

const loggedRole = sessionStorage.getItem('loggedUserRole');

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    if (loggedRole === 'admin') {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/logowanie" element={<Login />} />
        <Route path="/system/lista-samochodow" element={<ListCars />} />

        <Route
          path="/system/dodaj-uzytkownika"
          element={
            <Protected isSignedIn={isSignedIn}>
              <AddUser />
            </Protected>
          }
        />
        <Route
          path="/system/edycja-samochodow"
          element={
            <Protected isSignedIn={isSignedIn}>
              <ListEditCars />
            </Protected>
          }
        />
        <Route
          path="/system/dodaj-samochod"
          element={
            <Protected isSignedIn={isSignedIn}>
              <AddNewCar />
            </Protected>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
