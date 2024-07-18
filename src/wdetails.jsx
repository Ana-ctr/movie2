import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const WeatherDetails = () => {
  const { id } = useParams();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://freetestapi.com/api/v1/weathers/${id}`)
      .then(response => {
        setWeather(response.data);
        setError(null);
      })
      .catch(() => {
        setError('Error fetching weather details');
      });
  }, [id]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!weather) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="weather-details-container">
      <h1>{weather.city}, {weather.country}</h1>
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
  );
};

export default WeatherDetails;
