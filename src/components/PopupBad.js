import classes from './PopupBad.module.css';

function PopupBad(props) {
  return (
    <div className={classes.popup}>
      <h1>{props.title}</h1>
      <button onClick={props.changeState} className={classes.btn}>
        Zamknij
      </button>
    </div>
  );
}

export default PopupBad;
