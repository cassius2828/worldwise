import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";

import styles from "./AppLayout.module.css";
import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_API_KEY;

const url =
"https://global-zip-codes-with-lat-and-lng.p.rapidapi.com/api/v1/country/IN";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "global-zip-codes-with-lat-and-lng.p.rapidapi.com",
    "Content-Type": "application/json"
  },
};

const AppLayout = () => {
  const [cities, setCities] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchCities = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        // console.error('ERROR FETCHING DATA');
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};

export default AppLayout;
