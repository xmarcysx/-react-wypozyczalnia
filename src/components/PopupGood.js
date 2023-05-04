import classes from './PopupGood.module.css';

function PopupGood(props) {
  return (
    <div className={classes.popup}>
      <h1>{props.title}</h1>
      <button onClick={props.changeState} className={classes.btn}>
        Zamknij
      </button>
    </div>
  );
}

export default PopupGood;
