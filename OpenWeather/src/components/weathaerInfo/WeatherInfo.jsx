import { FaUmbrella } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { FaWind } from "react-icons/fa6";
import LoadingCircleSpinner from "../loading motion/LoadingCircleSpinner";
import Loading from "../loading motion/Loading";

// Weather image mapping
const WEATHER_IMAGE_MAP = {
  "Clear sky": {
    day: "sunny.png",
    night: "moon.png",
  },
  "Mainly clear": {
    day: "pcloudy.png",
    night: "pcloudy 0.png",
  },
  "Partly cloudy": {
    day: "mcloudy.png",
    night: "mcloudy 0.png",
  },
  Overcast: {
    day: "mcloudy.png",
    night: "mcloudy 0.png",
  },
  Fog: {
    day: "foggy.png",
    night: "foggy 0.png",
  },
  "Rime fog": {
    day: "foggy.png",
    night: "foggy 0.png",
  },
  "Light drizzle": {
    day: "Lrain.png",
    night: "Lrain 0.png",
  },
  "Moderate drizzle": {
    day: "rain.png",
    night: "rain 0.png",
  },
  "Dense drizzle": {
    day: "rain.png",
    night: "rain 0.png",
  },
  "Slight rain": {
    day: "rain.png",
    night: "rain 0.png",
  },
  "Moderate rain": {
    day: "rain.png",
    night: "rain 0.png",
  },
  "Heavy rain": {
    day: "rain.png",
    night: "rain 0.png",
  },
  "Slight snow": {
    day: "Lsnow.png",
    night: "Lsnow 0.png",
  },
  "Moderate snow": {
    day: "Snow.png",
    night: "Snow 0.png",
  },
  "Heavy snow": {
    day: "Snow.png",
    night: "Snow 0.png",
  },
  Thunderstorm: {
    day: "TStorm.png",
    night: "Tstorm 0.png",
  },
  // Add remaining mappings...
};

// In your WeatherInfo component
export default function WeatherInfo({ weatherData, translator }) {
  // Get day/night status from weather data
  const isDay = weatherData?.isDay; // Make sure you're passing this from your API processing
  console.log(weatherData);
  const getWeatherImage = () => {
    const condition = weatherData?.weatherCondition || "Clear sky";
    const timeKey = isDay ? "day" : "night";

    return WEATHER_IMAGE_MAP[condition]?.[timeKey] || "sunny.png";
  };

  return (
    <section className="flex flex-col items-center w-[50%] justify-center gap-6 lg:gap-20">
      <div className="relative flex flex-col items-center w-fit mt-5">
        {weatherData.weatherCondition ? (
          <img
            className="h-[165px] w-[165px]"
            src={getWeatherImage()}
            alt={weatherData.weatherCondition}
          />
        ) : (
          <LoadingCircleSpinner />
        )}
        <span className="absolute mt-20 flex text-[100px] text-left font-bold ">
          {weatherData.temperature ? (
            weatherData.temperature + "°"
          ) : (
            <Loading />
          )}
        </span>
        <span className="text-2xl bottom-2 mt-10 -left-12">
          {translator(weatherData.weatherCondition)}
        </span>
      </div>
      <div className="flex items-center gap-10 justify-center text-white bg-[#565eef] rounded-2xl w-fit px-11 py-4 mb-4">
        <div className="flex flex-col items-center justify-center gap-0.5 font-bold ">
          <FaUmbrella className="text-xl" />
          <span className="text-xl">
            {weatherData.precipitation || weatherData.precipitation == 0 ? (
              weatherData.precipitation + "mm"
            ) : (
              <Loading color={"bg-white"} />
            )}
          </span>
          <span className="text-sm font-normal">
            {translator("Precipitation")}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-0.5 font-bold ">
          <IoWater className="text-xl" />
          <span className="text-xl">
            {weatherData.humidity ? (
              weatherData.humidity + "%"
            ) : (
              <Loading color={"bg-white"} />
            )}
          </span>
          <span className="text-sm font-normal">{translator("Humidity")}</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-0.5 font-bold ">
          <FaWind className="text-xl" />
          <span className="text-lg w-fit">
            {weatherData.windSpeed ? (
              weatherData.windSpeed + "km/h"
            ) : (
              <Loading color={"bg-white"} />
            )}
          </span>
          <span className="text-sm w-max font-normal">
            {translator("Wind speed")}
          </span>
        </div>
      </div>
    </section>
  );
}
