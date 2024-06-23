import React, {useState} from 'react';
import axios from 'axios';

const Weather = () => {
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [dt, setdt] = useState(0);
    const [weatherRes, setWeatherRes] = useState(null);
    const [error, setError] = useState(null);

    const getWeather = async () =>{
        try{
           const response = await axios.get(`http://localhost:5001/api/weather?lat=${lat}&lon=${lon}&dt=${dt}`);
           setWeatherRes(response.data);
           setError(response.error);
        }catch(error){
            setError('could not fetch weather data');
            setWeatherRes(null);
        }
    };

    return (
        <div>
            <input type="number" value={lat} onChange={(e)=>setLat(parseFloat(e.target.value))}
            placeholder='Enter the longitude'/>
            <input type="number" value={lon} onChange={(e) =>setLon(parseFloat(e.target.value))}
            placeholder='Enter the latitude'/>
            <input type="number" value={dt} onChange={(e) =>setdt(e.target.value)}
            placeholder='Enter the date and Time'/>
            <button onClick={getWeather}>Get Weather</button>
            {error && <p>{error}</p>}
            {weatherRes && (
                <div>
                    {/* <h3>{weatherRes[0].weather[0].description}</h3> */}
                    <p>{(weatherRes.data[0].temp - 273.15).toFixed(2)}°C</p>
                </div>
            )}
        </div>
    );
};

export default Weather;