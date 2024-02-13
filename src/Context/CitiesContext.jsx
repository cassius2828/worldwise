import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CitiesContext = createContext();

const url = `http://localhost:8090`;
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
const deleteCityOptions = {
  method: "DELETE",
};
const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState(null);

  // fetch cities on first render
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

  // add a new city to the list
  const createCity = async (newCity) => {
    const createCityOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCity),
    };
    try {
      setIsLoading(true);
      const response = await fetch(`${url}/cities`, createCityOptions);
      const data = await response.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      // console.error('ERROR FETCHING DATA');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // delete a city from the list
  const deleteCity = async (id) => {
    setIsLoading(true);

    try {
      await fetch(`${url}/cities/${id}`, deleteCityOptions);
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        setIsLoading,
        currentCity,
        setCurrentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesProvider;
