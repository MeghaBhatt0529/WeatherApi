
import React from 'react';
import { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import {getWeatherData } from './Serviceaxios';

const WeatherAxios = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

    const handleSearch = () => {
      getWeatherData(city)
          .then(response => setWeatherData(response.data))
          .catch(error => console.error('Error fetching weather data:', error));
    };

    console.log(city);

  return (
    <Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <TextField
        label="City"
        variant="outlined"
        fullWidth
        value={city}
        onChange={e => setCity(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>

      {weatherData && (
        <div style={{ marginTop: 20 }}>
          <Typography variant="h5">{weatherData.name}</Typography>
          <Typography variant="subtitle1">{weatherData.weather[0].description}</Typography>
          <Typography variant="h6">Temp: {weatherData.main.temp} &#8451;</Typography>
        </div>
      )}
    </Paper>
  );
};

export default WeatherAxios;


// without service File;

    // const apiKey = '85a5004226a749cec6433e290cfcfbcd'; //api key
    // axios
    //   .get(apiUrl)
    //   .then(response => setWeatherData(response.data))
    //   .catch(error => console.error('Error fetching weather data:', error));

      // Using UseEffect

  //  useEffect(() =>{
    
  //     getWeatherData(city)
  //     .then(response => setWeatherData(response.data))
  //     .catch(error => console.error('Error fetching weather data:', error));
  //   });

  // Using HandleSearch
