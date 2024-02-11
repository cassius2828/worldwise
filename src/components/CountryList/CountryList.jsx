import { useCitiesContext } from "../../customHooks/useCitiesContext";

import CountryItem from "../CountryItem/CountryItem";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import styles from "./CountryList.module.css";

const CountryList = () => {
  const { cities, isLoading } = useCitiesContext();
  if (isLoading) return <Spinner />;

  // THis conditional early return ensures that if there is no data, then we have something to load
  // rather than resulting in an error when trying to access undefined values
  // since the data would not yet be fetch on a hard reload
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // review, practice, and fully understyand this later. Redo it without any guidence
  /*
  1. start with the array of objects that we want to filter
  2. initialize a variable to perform the reducer on
  3. start will a condition for filtering our results; in this case
  we are going to map over the existing array and return the country of the item. From there we see if the value being looked at is already included in our array
  4. If we determine that the new value is not found in the array, then we will add a new object with the values of the country and emoji of the cities object
  5. If the value IS found in the array then we just return the array with no changes to it
  
  */
  const countries = cities.reduce((acc, value) => {
    if (!acc.map((item) => item.country).includes(value.country))
      return [...acc, { country: value.country, emoji: value.emoji }];
    else return [...acc];
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries?.map((country, index) => {
        return <CountryItem country={country} key={country.country + index} />;
      })}
    </ul>
  );
};
export default CountryList;
