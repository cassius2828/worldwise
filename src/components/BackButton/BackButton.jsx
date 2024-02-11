import {
  NavLink,
  // useNavigate
} from "react-router-dom";
import Button from "../Button/Button";
// import styles from '../Button/Button.module.css'

// import { TagManager } from "react-gtm-module";
// const tagManagerArgs = {
//     gtmId: `${import.meta.VITE_GTM_ID}`
// }

// TagManager.initialize(tagManagerArgs)

const BackButton = () => {
  //    debugger;
  // const navigate = useNavigate();
  return (
    // * until I can get the navigate hook to work, this will take me back to app/cities
    <NavLink to="/app/cities">
      <Button
        // onClick={(e) => {
        //   e.preventDefault();
        //   navigate('cities');
        // }}
        type="back"
      >
        &larr;Back
      </Button>
    </NavLink>
  );
};
export default BackButton;
