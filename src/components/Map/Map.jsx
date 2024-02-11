import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

const Map = () => {
  // allows us to navigate to something without necessarily clicking a link
  // ex: onSubmit can have a navigate func that will change the page
  const navigate = useNavigate();
  // returns array that has current state (searchParams) and then get the setter funtion for it
  // this will search the params for us from the url and give us global state we can use anywhere
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      {/* // ! example of the effect the setter function will have for this url param state */}
      {/* <button onClick={()=> setSearchParams({lat: '', lng: ''})}>Clear Position</button> */}
    </div>
  );
};
export default Map;
