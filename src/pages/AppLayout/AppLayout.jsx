import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";

import styles from "./AppLayout.module.css";


const AppLayout = () =>
  // {cities, isLoading}

  {

    return (
      <div className={styles.app}>
        <Sidebar />
        <Map />
      </div>
    );
  };

export default AppLayout;
