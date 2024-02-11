import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/Product/Product";
import Pricing from "./pages/Pricing/Pricing";
import Homepage from "./pages/Homepage/Homepage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import Form from "./components/Form/Form";
import City from "./components/City/City";
import CitiesProvider from "./Context/CitiesContext";

// const API_KEY = import.meta.env.VITE_API_KEY;

// const url =
//   "https://global-zip-codes-with-lat-and-lng.p.rapidapi.com/api/v1/country/IN";
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": API_KEY,
//     "X-RapidAPI-Host": "global-zip-codes-with-lat-and-lng.p.rapidapi.com",
//     "Content-Type": "application/json",
//   },
// // };

function App() {
  return (
    <>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="app" element={<AppLayout />}>
              {/* outlet */}

              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City  />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />

              {/* joutlet */}
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </>
  );
}

export default App;

/*
How Can I Practice API and DB usage?

1. Pull necessary info from API such as position, cityName, country,
2. Add things such as the emoji, notes thru req.body
3. Add things like new Date, serial id, and others from DB interaction

*/
