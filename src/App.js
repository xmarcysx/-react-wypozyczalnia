import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ErrorPage from './components/ErrorPage';
import Login from './components/Login';
import Welcome from './components/Welcome';
import ProductsList from './components/ProductsList';
import AddUser from './components/AddUser';
import EditCars from './components/EditCars';
import Protected from './components/Protected';

import './App.css';
import AddNewCar from './components/AddNewCar';

const loggedRole = sessionStorage.getItem('loggedUserRole');

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    if (loggedRole === 'admin') {
      console.log('TAK');
      setIsSignedIn(true);
    } else {
      console.log('Nie');
      setIsSignedIn(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/logowanie" element={<Login />} />
        <Route path="/system/lista-samochodow" element={<ProductsList />} />

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
              <EditCars />
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

// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import ErrorPage from './components/ErrorPage';
// import Login from './components/Login';
// import Welcome from './components/Welcome';
// import ProductsList from './components/ProductsList';
// import AddUser from './components/AddUser';
// import EditProduct from './components/EditProduct';

// import './App.css';
// import AddNewCar from './components/AddNewCar';

// const loggedRole = sessionStorage.getItem('loggedUserRole');

// const router = createBrowserRouter([
//   {
//     path: '/',
//     errorElement: <ErrorPage />,
//     children: [
//       { path: '', element: <Welcome /> },
//       { path: 'logowanie', element: <Login /> },
//       {
//         path: '/system/lista-samochodow',
//         element: <ProductsList />,
//       },
//       { path: '/system/dodaj-uzytkownika', element: <AddUser /> },
//       { path: '/system/edycja-samochodow', element: <EditProduct /> },
//       { path: '/system/dodaj-samochod', element: <AddNewCar /> },
//     ],
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;
