import { useRef, useState, useEffect } from 'react';
import Select from 'react-select';

import Navigation from '../Navigation';
import PopupBad from '../Popups/PopupBad';
import Loading from '../Loading/Loading';
import PopupGood from '../Popups/PopupGood';

import classes from '../../styles/AddNewCar.module.css';

function AddNewCar() {
  const [authBad, setAuthBad] = useState(false);
  const [authGood, setAuthGood] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const nazwaRef = useRef('');
  const modelRef = useRef('');
  const cenaRef = useRef('');
  const imgRef = useRef('');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  async function addNewCar(car) {
    const response = await fetch(
      'https://react-magazyn-default-rtdb.firebaseio.com/cars.json',
      {
        method: 'POST',
        body: JSON.stringify(car),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  function submitHandler(event) {
    event.preventDefault();

    if (
      nazwaRef.current.value === '' ||
      modelRef.current.value === '' ||
      cenaRef.current.value === '' ||
      imgRef.current.value === '' ||
      selectedOption === null
    ) {
      setAuthBad(true);

      return;
    }

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const formattedDay = (day < 10 ? '0' : '') + day;
    const formattedMonth = (month < 10 ? '0' : '') + month;

    const formatedHour = (hour < 10 ? '0' : '') + hour;
    const formattedMinute = (minute < 10 ? '0' : '') + minute;

    const newCar = {
      title: nazwaRef.current.value,
      model: modelRef.current.value,
      price: cenaRef.current.value,
      img: imgRef.current.value,
      state: 'wolny',
      modifyDate: `${formattedDay}.${formattedMonth}.${year} - ${formatedHour}:${formattedMinute}`,
      category: selectedOption,
    };

    addNewCar(newCar);
    nazwaRef.current.value = '';
    modelRef.current.value = '';
    cenaRef.current.value = '';
    imgRef.current.value = '';
    setSelectedOption(null);

    setAuthGood(true);
  }

  function changeBadState() {
    setSelectedOption(null);
    setAuthBad(false);
  }

  function changeGoodState() {
    setAuthGood(false);
  }

  const options = [
    { value: 'suv', label: 'SUV' },
    { value: 'sport', label: 'Sport' },
    { value: 'kombi', label: 'Kombi' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'miejskie', label: 'Miejskie' },
  ];

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      borderRadius: '30px',
      boxShadow: 'none',
      height: '20px',
      width: '250px',
      fontSize: '15px',
    }),
  };

  const form = (
    <form className={classes.formularz} onSubmit={submitHandler}>
      <h1 className={classes.banner}>Dodaj Nowy Samochód</h1>

      <input type="text" id="nazwa" ref={nazwaRef} placeholder="Podaj nazwę" />
      <input type="text" id="model" ref={modelRef} placeholder="Podaj model" />
      <input type="text" id="cena" ref={cenaRef} placeholder="Podaj cenę" />
      <input
        type="text"
        id="img"
        ref={imgRef}
        placeholder="Podaj URL zdjęcia"
      />
      <Select
        styles={style}
        value={selectedOption}
        onChange={handleSelectChange}
        options={options}
        placeholder="Podaj kategorię..."
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
                title="Samochód został dodany do bazy danych"
                changeState={changeGoodState}
              />
            ) : (
              ''
            )}
            {authBad ? (
              <PopupBad
                title="Podano nieprawidłowe dane dla samochodu"
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

export default AddNewCar;
