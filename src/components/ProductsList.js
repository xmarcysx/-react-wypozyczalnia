import { useState, useEffect } from 'react';
import Select from 'react-select';

import SystemNavigation from './SystemNavigation';
import Product from './Product';
import Loading from './Loading';

import classes from './ProductsList.module.css';

function ProductsList(props) {
  const [userSearch, setUserSearch] = useState('');
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState({
    value: 'wszystkie',
    label: 'Wszystkie',
  });

  useEffect(() => {
    fetchCarsHandler();
  }, []);

  async function fetchCarsHandler() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://react-magazyn-default-rtdb.firebaseio.com/cars.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedCars = [];

      for (const key in data) {
        loadedCars.push({
          id: key,
          title: data[key].title,
          model: data[key].model,
          price: data[key].price,
          state: data[key].state,
          img: data[key].img,
          modifyDate: data[key].modifyDate,
          category: data[key].category,
        });
      }

      setCars(loadedCars);
    } catch (error) {
      setError(error.message);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  const options = [
    { value: 'wszystkie', label: 'Wszystkie' },
    { value: 'suv', label: 'SUV' },
    { value: 'sport', label: 'Sport' },
    { value: 'kombi', label: 'Kombi' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'miejskie', label: 'Miejskie' },
  ];

  const handleSelectChange = (option) => {
    setSelectedOption(option);
  };

  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      borderRadius: '30px',
      boxShadow: 'none',
      height: '20px',
      width: '200px',
      fontSize: '15px',
    }),
  };

  function userSearchHandler(event) {
    setUserSearch(event.target.value);
  }

  let filteredCars = selectedOption
    ? cars.filter((car) => car.category === selectedOption.value)
    : cars;

  console.log(filteredCars);

  if (selectedOption.value === 'wszystkie') {
    filteredCars = cars;
  }

  const searchedCars = userSearch
    ? filteredCars.filter((car) =>
        car.title.toLowerCase().includes(userSearch.toLowerCase())
      )
    : filteredCars;

  return (
    <div className={classes.container}>
      <SystemNavigation />
      <div className={classes.products_container}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <h1>Lista Samochodów</h1>
            <div className={classes.search}>
              <input type="text" onChange={userSearchHandler} />
              <Select
                styles={style}
                value={selectedOption}
                onChange={handleSelectChange}
                options={options}
                placeholder="Podaj kategorię..."
              />
            </div>

            <div className={classes.products}>
              {searchedCars.map((car) => (
                <Product
                  key={car.id}
                  title={car.title}
                  model={car.model}
                  price={car.price}
                  state={car.state}
                  modifyDate={car.modifyDate}
                  img={car.img}
                />
              ))}
            </div>
          </>
        )}

        {!isLoading && error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default ProductsList;
