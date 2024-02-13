import { useState } from "react";

export const useGeoLoc = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  const getPosition = () => {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
    console.log(position)
  };

return {isLoading, position, error, getPosition}
};
