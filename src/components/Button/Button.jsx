import styles from "./Button.module.css";
const Button = ({ children, onClick, type, isLoading }) => {
  return (
    <button
      // this prevents the user from pressing the btn and returning a null value from the function
      disabled={isLoading}
      style={{ cursor: isLoading ? "wait" : "pointer" }}
      onClick={onClick}
      //   this is in brackets bc you would not be able to access it properly if it were just dot notation
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
};
export default Button;
