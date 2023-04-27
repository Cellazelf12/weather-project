import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTemperatureLow, FaTemperatureHigh, FaWind} from 'react-icons/fa';
import './Weather.css';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async (latitude, longitude) => {
            const API_KEY = process.env.REACT_APP_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
            const response = await axios.get(url);
            setWeatherData(response.data);
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeatherData(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.error(error);
                fetchWeatherData(40.4167754, -3.7037902); // Establece la ubicación predeterminada en Madrid
            }
        );
    }, []);

    return (

        <div className="weather-container">
            {!weatherData ? (
                <p>Loading weather data...</p>
            ) : (
                <div className="weather-card">
                    <div className="weather-location">{weatherData.name}</div>
                    <div className="weather-temp">{Math.round(weatherData.main.temp)}°C</div>
                    <div className="weather-details">
                        <div className="weather-detail">
                            <div className="weather-icon">
                                <FaTemperatureLow />
                            </div>
                            <div className="weather-label">
                                Min: {Math.round(weatherData.main.temp_min)}°C
                            </div>
                        </div>
                        <div className="weather-detail">
                            <div className="weather-icon">
                                <FaTemperatureHigh />
                            </div>
                            <div className="weather-label">
                                Max: {Math.round(weatherData.main.temp_max)}°C
                            </div>
                        </div>
                        <div className="weather-detail">
                            <div className="weather-icon">
                                <FaWind />
                            </div>
                            <div className="weather-label">
                                Wind: {weatherData.wind.speed} km/h
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
