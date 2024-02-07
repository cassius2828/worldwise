import styles from "./Button.module.css";
const Button = ({ children, onClick, type }) => {
  return (
    <button
      onClick={() => {
        onClick;
      }}
    //   this is in brackets bc you would not be able to access it properly if it were just dot notation
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
};
export default Button;
