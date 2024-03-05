
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const WeatherCityName = () => {
  const [city, setCity] = useState ('');
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = '85a5004226a749cec6433e290cfcfbcd';
  const fetchCitySuggestions = (inputValue) => {
    if (inputValue.length >= 2) {
      // Fetch city suggestions
      axios
        .get(`https://api.openweathermap.org/data/2.5/find?q=${inputValue}&type=like&sort=population&cnt=5&units=metric&appid=${apiKey}`)
        .then((response) => {
          setCitySuggestions(response.data.list.map((city) => city.name));
        })
        .catch((error) => {
          console.error('Error fetching city suggestions:', error);
        });
    } else {
      setCitySuggestions([]);
    }
  };


  const handleCityChange = (event, value) => {
    setCity(value);
    if (value.length >= 2) {
      // Fetch weather data
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${apiKey}`)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    } else {
      setWeatherData(null);
    }
  };


  return (
    <div>
      <Autocomplete
        id="city-autocomplete"
        options={citySuggestions}
        freeSolo
        onInputChange={(event, value) => {
          fetchCitySuggestions(value);
          handleCityChange(event, value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Enter city name" variant="outlined" />
        )}
      />

      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCityName;
