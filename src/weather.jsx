
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const fetchWeatherData = (url) => {
    axios.get(url)
      .then(response => {
        setWeatherData(response.data);
        setError(null);
      })
      .catch(() => {
        setError('Error fetching weather data');
      });
  };

  useEffect(() => {
    fetchWeatherData('https://freetestapi.com/api/v1/weathers?limit=5');
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeatherData(`https://freetestapi.com/api/v1/weathers?search=${query}`);
  };

  return (
    <div className="weather-container">
      <h1 className="weather-header">Weather Data</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {error && <div className="error">{error}</div>}
      {!weatherData && !error && <div className="loading">Loading...</div>}
      {weatherData && (
        <div className="weather-data">
          {weatherData.map((weather) => (
            <div key={weather.id} className="weather-item">
              <h2><Link to={`/wdetails/${weather.id}`}>{weather.city}, {weather.country}</Link></h2>
              <p><strong>Temperature:</strong> {weather.temperature}°C</p>
              <p><strong>Condition:</strong> {weather.weather_description}</p>
              <p><strong>Humidity:</strong> {weather.humidity}%</p>
              <p><strong>Wind Speed:</strong> {weather.wind_speed} km/h</p>
              <p><strong>Latitude:</strong> {weather.latitude}</p>
              <p><strong>Longitude:</strong> {weather.longitude}</p>
              <h3>Forecast:</h3>
              <ul className="forecast-list">
                {weather.forecast.map((day, dayIndex) => (
                  <li key={dayIndex}>
                    <p><strong>Day {dayIndex + 1}:</strong></p>
                    <p><strong>Temperature:</strong> {day.temperature}°C</p>
                    <p><strong>Condition:</strong> {day.weather_description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
