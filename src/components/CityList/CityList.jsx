import styles from "./CityList.module.css";
import Spinner from "../Spinner/Spinner";
import CityItem from "../CityItem/CityItem";
import Message from "../Message/Message";

const CityList = ({ cities, isLoading }) => {
  // console.log(cities)
  if (isLoading) return <Spinner />;

  // THis conditional early return ensures that if there is no data, then we have something to load
  // rather than resulting in an error when trying to access undefined values
  // since the data would not yet be fetch on a hard reload
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

 

  return (
    <ul className={styles.cityList}>
      {cities?.map((city) => {
        return <CityItem city={city} key={city.id} />;
      })}
    </ul>
  );
};
export default CityList;
