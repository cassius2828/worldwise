import { useNavigate } from "react-router-dom";
import { useMapEvents } from "react-leaflet";

const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
};
export default DetectClick;
