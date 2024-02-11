import { createContext, useEffect, useState } from "react";
export const CitiesContext = createContext();
const url = `http://localhost:8090`;
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${url}/cities`, options);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        // console.error('ERROR FETCHING DATA');
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        setIsLoading,
        currentCity,
        setCurrentCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesProvider;
