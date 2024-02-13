import { useMap, useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";

const GoToYourLocation = ({ position }) => {
  const navigate = useNavigate();
  const map = useMap();
  map.setView(position);
  useMapEvents({
    click: () => navigate(`cities?lat=${position.lat}&lng=${position.lng}`),
  });
  return null;
};
export default GoToYourLocation;
