import classes from './CarToEdit.module.css';

function CarToEdit(props) {
  const state = props.state;
  let bgColor = null;
  switch (state) {
    case 'wolny':
      bgColor = classes.state_btn_green;
      break;
    case 'wypożyczony':
      bgColor = classes.state_btn_orange;
      break;
    case 'uszkodzony':
      bgColor = classes.state_btn_red;
      break;
  }

  function removeCarHandler() {
    props.onDelete(props.id);
  }

  function changeCarStateHandler() {
    props.onChangeState(props.id);
  }

  return (
    <div className={classes.product_component}>
      <img src={props.img} alt="samochod" />
      <div className={classes.details}>
        <h1 className={classes.title}>{props.title}</h1>
        <h3 className={classes.model}>{props.model}</h3>
        <p className={classes.price}>{props.price} zł</p>
      </div>

      <div className={classes.state}>
        <div className={bgColor} onClick={changeCarStateHandler}>
          {props.state}
        </div>
      </div>

      <div className={classes.delete}>
        <span className={classes.delete_btn} onClick={removeCarHandler}>
          X
        </span>
      </div>
    </div>
  );
}
export default CarToEdit;
