import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const WeatherAPI = () => {
  const [city, setCity] = useState("Vadodara"); 
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      const API_KEY = "9f15b4bccdb249d5898173219251103";
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeather(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (input.trim() !== "") {
      setCity(input);
      fetchWeather(input);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <>
      <style>
        {`
          .weather-container {
            margin: auto;
            padding: 50px;
            font-family: Times New Roman, sans-serif;
            text-align: center;
            border-radius: 55px;
            box-shadow: 8px 12px 18px rgba(0, 0, 0, 0.7);
            background-color:rgba(4, 135, 180, 0.2);
          }
          .weather-icon {
            width: 80px;
          }
          .input-container {
            display: flex;
            justify-content: center;
            margin-bottom: 15px;
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          }
          .input-field {
            padding: 8px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 60%;
          }
          .search-button {
            padding: 8px 12px;
            margin-left: 10px;
            font-size: 16px;
            background-color:rgb(168 108 39);
            color: white;
            border: none;
            border-radius: 12px;
            cursor: pointer;
          }
          .search-button:hover {
            background-color:rgb(212, 135, 46);
          }
        `}
      </style>

      <div className="weather-container">
        <h1>Weather App</h1>
        <div className="input-container">
          <input
            type="text"
            className="input-field"
            placeholder="Enter city name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : weather ? (
          <div>
            <h2>{weather.location.name}</h2>
            <img
              className="weather-icon"
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
            />
            <h2>{weather.current.temp_c}°C</h2>
            <p>{weather.current.condition.text}</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind: {weather.current.wind_kph} kph</p>
          </div>
        ) : (
          <p>Failed to fetch weather data.</p>
        )}
        <div>
          <Link
            to="/"
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "1.2rem",
              backgroundColor: "#4caf50",
              color: "white",
              textDecoration: "none",
              borderRadius: "25px",
              display: "inline-block",
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default WeatherAPI;