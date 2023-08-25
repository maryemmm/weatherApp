import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);
  const [error, setError] = useState(null); // State to hold error message

  const url = `https://api.weatherapi.com/v1/forecast.json?key=93d12964634b48b683b154401232208&q=${location}&aqi=no`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        setError(null); // Reset error state before fetching
        setData({});
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        if (error.response) {
          // Handle API response errors
          console.error("API Error:", error.response.data);
          setError(
            "Failed to fetch weather data from API. Please try again later."
          );
        } else if (error.request) {
          // Handle network errors
          console.error("Network Error:", error.request);
          setError("Connexion failed.");
        } else {
          // Handle other errors
          console.error("Error:", error);
          setError(" Please try again later.");
        }
      }
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
        ></input>
      </div>
      <div className="container">
        {error && <div>{error}</div>}
        <div className="top">
          <div className="location">
            {data.current && data.location ? (
              <>
                <img
                  src={`http:${data.current.condition.icon}`}
                  alt="Weather Icon"
                  className="icon"
                />
                <p>{data.location.name}</p>
              </>
            ) : null}
          </div>
          <div className="temp">
            {data.current ? (
              <h1>
                {isCelsius
                  ? `${data.current.temp_c}°C`
                  : `${data.current.temp_f}°F`}
              </h1>
            ) : null}
          </div>
          {data.current ? (
            <button
              className="toggle-button"
              onClick={() => setIsCelsius(!isCelsius)}
            >
              {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
            </button>
          ) : null}
          <div className="description">
            {data.current ? <p>{data.current.condition.text}</p> : null}
          </div>
        </div>
        {data.location !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.current ? (
                <p className="bold">
                  {isCelsius
                    ? `${data.current.feelslike_c}°C`
                    : `${data.current.feelslike_f}°F`}
                </p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.current ? (
                <p className="bold">{data.current.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.current ? (
                <p className="bold">{data.current.wind_mph} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
