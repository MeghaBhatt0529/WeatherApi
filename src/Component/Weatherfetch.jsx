
import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Grid } from '@mui/material';
import fetchInfo from './Servicefetch';

const Weatherfetch= () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);


const handleSearch = () => {
  fetchInfo(city)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error('Error fetching weather data:', error))
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
        <Grid style={{ marginTop: 20 }}>
          <Typography variant="h5">{weatherData.name}</Typography>
          <Typography variant="subtitle1">{weatherData.weather[0].description}</Typography>
          <Typography variant="h6">Temp: {weatherData.main.temp} &#8451;</Typography>
        </Grid>
      )}
    </Paper>
  );
};
export default Weatherfetch;



//     fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => setWeatherData(data))
//       .catch(error => console.error('Error fetching weather data:', error));

//   };


//   useEffect(() => {
//     fetchInfo(city)
//       .then(response => response.json())
//       .then(data => setWeatherData(data))
//       .catch(error => console.error('Error fetching weather data:', error))
// },[city]);

  
