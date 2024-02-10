import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { WeatherForm } from "../Components/WeatherForm";
import sunrise from "../Components/Assests/sunrise-and-clouds-0370288581068895b2f9098e63d045b3.png";
import sunset from "../Components/Assests/sunset.png";
import wind from "../Components/Assests/wind.png";
import humidity from "../Components/Assests/humidity.png";
import snowbg from "../Components/Assests/snowbg.jpg";
import bgimage from "../Components/Assests/bgimage-1.jpg";
import rain from "../Components/Assests/rain.jpg";
import clouds from "../Components/Assests/clouds.jpg";
import thunder from "../Components/Assests/thunder.jpg";

export const WeatherPage = () => {
  const [time, settime] = useState(new Date().toLocaleTimeString());
  const [value, setValue] = useState("jaipur");
  const [date, setdate] = useState(Date.now());
  const [Weather, setWeather] = useState({
    name: "",
    temp: "",
    humidity: "",
    wind: "",
    weather: "",
    pressure: "",
    visiblity: "",
    sunrise: "",
    sunset: "",
    icon: "",
  });

  const sunriseTime = new Date(Weather.sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(Weather.sunset * 1000).toLocaleTimeString();

  const api_key = "8079d122994308eb25151a8b9e8cf155";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${api_key}`;

  const handleSeacrch = async (lat, lon) => {
    try {
      const response = await axios.get(url);
      setWeather((prev) => ({
        ...prev,
        name: response.data.name,
        temp: response.data.main.temp,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,
        weather: response.data.weather[0].main,
        visiblity: response.data.visibility,
        pressure: response.data.main.pressure,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        icon: response.data.weather[0].icon,
      }));
    } catch (error) {
      console.log(error);
      alert("please enter valid city name");
    }
  };
  useEffect(() => {
    handleSeacrch();
    setInterval(() => {
      settime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <>
      <div className="bg-img">
        {Weather.weather === "Clear" ? (
          <img src={bgimage} />
        ) : Weather.weather === "Snow" ? (
          <img src={snowbg} />
        ) : Weather.weather === "Clouds" ? (
          <img src={clouds} />
        ) : Weather.weather === "Rain" ? (
          <img src={rain} />
        ) : Weather.weather === "Thunderstorm" ? (
          <img src={thunder} />
        ) : (
          <img src={bgimage} />
        )}
      </div>
      <div className="container">
        <div className="W-card flex-col text-white">
          <div className="name px-2 uppercase items-center flex justify-between gap-5 text-white text-xl font-normal">
            <div className="flex flex-col gap-1">
              {Weather.name}
              <div className="w-temp text-sm w-100 flex justify-center">
                {time}
              </div>
            </div>
            <div>
              <WeatherForm
                value={value}
                setValue={setValue}
                handleSeacrch={handleSeacrch}
              />
            </div>
          </div>
          <div className="w-image w-100 flex justify-center mt-5 ">
            <img
              src={`http://openweathermap.org/img/w/${Weather.icon}.png`}
              style={{
                width: "200px",
              }}
            />
          </div>
          <div className="w-temp w-100 flex justify-center text-5xl text-white font-medium">
            {Math.round(Weather.temp)}°C
          </div>
          <div className="w-weather w-100 flex justify-center text-white font-normal">
            {Weather.weather}
          </div>

          <div className="w-Sun flex justify-between mt-5">
            <div className="sunrise flex gap-2">
              <img src={sunrise} style={{ width: "50px" }} />
              <div className="sunrise-detail flex flex-col">
                <p className="text-xl">Sunrise</p>
                <p className="text-sm">{sunriseTime}</p>
              </div>
            </div>
            <div className="sunset flex gap-2">
              <img src={sunset} style={{ width: "50px" }} />
              <div className="Sunset-detail flex flex-col">
                <p className="text-xl">Sunset</p>
                <p className="text-sm">{sunsetTime}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-10">
            <div className="flex gap-2">
              <img src={wind} style={{ width: "50px" }} />
              <div className="wind flex flex-col">
                <p className="text-xl">Wind</p>
                <p className="text-sm">{Math.round(Weather.wind)} Km/h</p>
              </div>
            </div>
            <div className="flex gap-2">
              <img src={humidity} style={{ width: "50px" }} />
              <div className="humidity flex flex-col">
                <p className="text-xl">humidity</p>
                <p className="text-sm">{Weather.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
