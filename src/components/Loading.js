import classes from './Loading.module.css';

function Loading() {
  return (
    <div className={classes.loading_container}>
      <div className={classes.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1>Loading</h1>
    </div>
  );
}

export default Loading;
