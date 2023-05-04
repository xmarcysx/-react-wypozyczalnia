import classes from './Product.module.css';

function Product(props) {
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

  return (
    <div className={classes.product_component}>
      <img src={props.img} alt="samochod" />
      <div className={classes.details}>
        <h1 className={classes.title}>{props.title}</h1>
        <h3 className={classes.model}>{props.model}</h3>
        <p className={classes.price}>{props.price} zł</p>
      </div>

      <div className={classes.state}>
        <div className={bgColor}>{props.state}</div>
      </div>

      <div className={classes.info}>
        <p>Modyfikacja:</p>
        <span>{props.modifyDate}</span>
      </div>
    </div>
  );
}
export default Product;
