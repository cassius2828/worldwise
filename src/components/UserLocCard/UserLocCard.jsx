import { useParams } from "react-router-dom";
import styles from "./UserLocCard.module.css";
import Spinner from "../Spinner/Spinner";
import { useCitiesContext } from "../../customHooks/useCitiesContext";
import BackButton from "../BackButton/BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function UserLocCard() {
  // solved this all on my own...nice
  /*
  Issues overcame were
  1. Loading and fetching the data without errors
  2. properly filtering the list of cities
  3. applying the filtered city from the array that was returned
  by the filter method

  */
  const { id } = useParams();
  const { cities, isLoading } = useCitiesContext();

  if (isLoading) return <Spinner />;

  if (!cities.length) return "Loading...";

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City Name</h6>
        <h3>
          <span>{`emoji`}</span> {`city name`}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {`balnk`} on</h6>
        <p>today</p>
        {/* <p>{formatDate(date || null)}</p> */}
      </div>

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          //   href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {`this city name`} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default UserLocCard;
