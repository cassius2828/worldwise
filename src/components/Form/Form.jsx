// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../Button/Button";
// import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import { useURLPosition } from "../../customHooks/useURLPosition";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCitiesContext } from "../../customHooks/useCitiesContext";
import {useNavigate} from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;
function Form() {
  const { createCity } = useCitiesContext();
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  // const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState(null);

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const { mapLat, mapLng } = useURLPosition();
    const navigate = useNavigate();

  useEffect(() => {
    if (!mapLng && !mapLat) return;
    const fetchCityData = async () => {
      setIsLoadingGeocoding(true);
      try {
        const res = await fetch(
          `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
        );
        const data = await res.json();
        console.log(`mapLat is ${mapLat} and the mapLng is ${mapLng}`);
        if (!data.countryCode)
          throw new Error(
            "Cannot find city at this location. Please select a new location"
          );

        setCityName(data.city || data.locality || "cannot find city");
        setCountryName(data.country || data.locality || "cannot find country");
        setEmoji(convertToEmoji(data.countryCode));
        setGeocodingError(null);
        console.log(data);
      } catch (err) {
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    };
    fetchCityData();
  }, [mapLat, mapLng]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      countryName,
      emoji,
      date,
      notes,
      position: { lat: mapLat, lng: mapLng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  };
  // const navigate = useNavigate();
  if (isLoadingGeocoding) return <Spinner />;
  if (!mapLat && !mapLng)
    return <Message message={"Start by clicking somewhere on the map"} />;
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${isLoadingGeocoding ? "loading" : ""}`}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          // value={lat}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
        />
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          onClick={
            () => {}
            // () => navigate()
          }
          type="primary"
        >
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
