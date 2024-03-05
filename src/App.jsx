// import React from "react";
// import "./App.css";
// import DataTable from "./Component/DataTable";

// function App() {
//   return(
//     <div>

//     <DataTable/>
  
//     </div>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import "./App.css";
// import WeatherAxios from './Component/WeatherAxios';
// import Weatherfetch from './Component/Weatherfetch';
// import WeatherCityName from './Component/WeatherCityName';
import Weatherdebounce from './Component/Weatherdebounce';


function App() {
  return (
    <div className="App" style={{ textAlign: 'center', marginTop: 50 }}>
      <h1>Weather App</h1>
      <Weatherdebounce/>
      {/* <Weatherfetch/>
      <WeatherAxios/>
      <WeatherCityName/> */}
     
    </div>
  );
}

export default App;


