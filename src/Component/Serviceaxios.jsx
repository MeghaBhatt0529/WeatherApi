
import axios from "axios";

export const getWeatherData = (city)=>{
    const apiKey = '85a5004226a749cec6433e290cfcfbcd'; //api key

    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
};

