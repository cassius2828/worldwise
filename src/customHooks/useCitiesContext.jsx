import { useContext } from "react";
import { CitiesContext } from "../Context/CitiesContext";

export const useCitiesContext = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
};
