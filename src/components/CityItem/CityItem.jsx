import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCitiesContext } from "../../customHooks/useCitiesContext";
const formatDate = (date) => {
  let finalDate = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
  return finalDate;
};
const CityItem = ({ city }) => {
  const { currentCity, setCurrentCity } = useCitiesContext();
  const { cityName, emoji, date, id, position } = city;

  return (
    <li>
      <Link
        onClick={() => {
          console.log(currentCity === id);
          setCurrentCity(id);
        }}
        // I was failing to use the template literal correct so I changed his css class name to active instead of cityItem--active
        className={
          currentCity === id
            ? `${styles.cityItem} 
        
        ${styles.active}`
            : styles.cityItem
        }
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {" "}
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};
export default CityItem;
