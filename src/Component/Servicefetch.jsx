
const fetchInfo = (city) => { 

    const apiKey = '85a5004226a749cec6433e290cfcfbcd'; //api key
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            
    }
    
    export default fetchInfo;



    // https://maps.googleapis.com/maps/api/place/autocomplete/output?parameters

    // let searchBox = new google.maps.places.Autocomplete(document.querySelector("#city-search"));
 