import { Link, useParams, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCitiesContext } from "../../customHooks/useCitiesContext";
import ChangeCenter from "./ChangeCenter";
import DetectClick from "./DetectClick";
import { useGeoLoc } from "../../customHooks/useGeoLoc";
import { useURLPosition } from "../../customHooks/useURLPosition";
import Button from "../Button/Button";

const Map = () => {
  // allows us to navigate to something without necessarily clicking a link
  // ex: onSubmit can have a navigate func that will change the page
  // const navigate = useNavigate();
  // sets map position to Madrid

  const [mapPosition, setMapPosition] = useState([
    40.46635901755316, -3.7133789062500004,
  ]);
  // returns array that has current state (searchParams) and then get the setter funtion for it
  // this will search the params for us from the url and give us global state we can use anywhere
  const [searchParams, setSearchParams] = useSearchParams();
  const [userLocationAvailable, setUserLocationAvailable] = useState(false);
  let { user_coordinates } = useParams();

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLoc();

  const { cities } = useCitiesContext();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  // WORK AROUND:
  // useEffect on mount with getPosition will return null, then it will be updated after
  // im sure this is not best practice, but until I can effectively use a cb to replace
  // the array I think I must do this
  useEffect(() => {
    getPosition();
  }, []);

  const goToYourLocation = () => {
    getPosition();
    setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    setUserLocationAvailable(true);
  };

  return (
    <div
      className={styles.mapContainer}

      // onClick={() => navigate("form")}
    >
      <Link
        to={`current_location/?lat=${geoLocationPosition?.lat}&lng=${geoLocationPosition?.lng}`}
      >
        <Button
          // determines disabled attr on btn
          // this prevents the user from pressing the btn and returning a null value from the function
          isLoading={isLoadingPosition}
          type="position"
          onClick={goToYourLocation}
        >
          {isLoadingPosition ? "Loading..." : "Use Your Position"}
        </Button>
      </Link>

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {userLocationAvailable && (
          <Marker
            key={`YourLocation`}
            position={[geoLocationPosition?.lat, geoLocationPosition?.lng]}
          >
            <Popup>
              {/* <span>{city?.emoji}</span>
              <span>{city?.cityName}</span> */}
              <span>This is your location, style later!</span>
            </Popup>
          </Marker>
        )}
        {cities.map((city, index) => {
          return (
            <Marker
              key={city + index}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                <span>{city?.emoji}</span>
                <span>{city?.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />

        <DetectClick />
      </MapContainer>
    </div>
  );
};

export default Map;
