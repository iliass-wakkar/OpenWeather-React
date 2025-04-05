import { useEffect, useCallback, useState, useMemo } from "react";
import DayWeather from "./dayWeather/DayWeather";
import LocationSection from "./locationSection/LocationSection";
import WeatherInfo from "./weathaerInfo/WeatherInfo";
import axios from "axios";

// Weather code to text mapping (WMO codes)
const WEATHER_CODE_MAP = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Heavy thunderstorm with hail",
};
// const location = "skhirat"
// const weatherData = {
//   latitude: 31.8125,
//   longitude: -7.0625,
//   generationtime_ms: 0.8769035339355469,
//   utc_offset_seconds: 0,
//   timezone: "Africa/Casablanca",
//   timezone_abbreviation: "GMT",
//   elevation: 733.0,
//   current_weather_units: {
//     time: "iso8601",
//     interval: "seconds",
//     temperature: "°C",
//     windspeed: "km/h",
//     winddirection: "°",
//     is_day: "",
//     weathercode: "wmo code",
//   },
//   current_weather: {
//     time: "2025-04-01T22:15",
//     interval: 900,
//     temperature: 14.6,
//     windspeed: 4.5,
//     winddirection: 299,
//     is_day: 0,
//     weathercode: 2,
//   },
//   hourly_units: {
//     time: "iso8601",
//     temperature_2m: "°C",
//     relativehumidity_2m: "%",
//     windspeed_10m: "km/h",
//     precipitation: "mm",
//   },
//   hourly: {
//     time: [
//       "2025-04-01T00:00",
//       "2025-04-01T01:00",
//       "2025-04-01T02:00",
//       "2025-04-01T03:00",
//       "2025-04-01T04:00",
//       "2025-04-01T05:00",
//       "2025-04-01T06:00",
//       "2025-04-01T07:00",
//       "2025-04-01T08:00",
//       "2025-04-01T09:00",
//       "2025-04-01T10:00",
//       "2025-04-01T11:00",
//       "2025-04-01T12:00",
//       "2025-04-01T13:00",
//       "2025-04-01T14:00",
//       "2025-04-01T15:00",
//       "2025-04-01T16:00",
//       "2025-04-01T17:00",
//       "2025-04-01T18:00",
//       "2025-04-01T19:00",
//       "2025-04-01T20:00",
//       "2025-04-01T21:00",
//       "2025-04-01T22:00",
//       "2025-04-01T23:00",
//       "2025-04-02T00:00",
//       "2025-04-02T01:00",
//       "2025-04-02T02:00",
//       "2025-04-02T03:00",
//       "2025-04-02T04:00",
//       "2025-04-02T05:00",
//       "2025-04-02T06:00",
//       "2025-04-02T07:00",
//       "2025-04-02T08:00",
//       "2025-04-02T09:00",
//       "2025-04-02T10:00",
//       "2025-04-02T11:00",
//       "2025-04-02T12:00",
//       "2025-04-02T13:00",
//       "2025-04-02T14:00",
//       "2025-04-02T15:00",
//       "2025-04-02T16:00",
//       "2025-04-02T17:00",
//       "2025-04-02T18:00",
//       "2025-04-02T19:00",
//       "2025-04-02T20:00",
//       "2025-04-02T21:00",
//       "2025-04-02T22:00",
//       "2025-04-02T23:00",
//       "2025-04-03T00:00",
//       "2025-04-03T01:00",
//       "2025-04-03T02:00",
//       "2025-04-03T03:00",
//       "2025-04-03T04:00",
//       "2025-04-03T05:00",
//       "2025-04-03T06:00",
//       "2025-04-03T07:00",
//       "2025-04-03T08:00",
//       "2025-04-03T09:00",
//       "2025-04-03T10:00",
//       "2025-04-03T11:00",
//       "2025-04-03T12:00",
//       "2025-04-03T13:00",
//       "2025-04-03T14:00",
//       "2025-04-03T15:00",
//       "2025-04-03T16:00",
//       "2025-04-03T17:00",
//       "2025-04-03T18:00",
//       "2025-04-03T19:00",
//       "2025-04-03T20:00",
//       "2025-04-03T21:00",
//       "2025-04-03T22:00",
//       "2025-04-03T23:00",
//       "2025-04-04T00:00",
//       "2025-04-04T01:00",
//       "2025-04-04T02:00",
//       "2025-04-04T03:00",
//       "2025-04-04T04:00",
//       "2025-04-04T05:00",
//       "2025-04-04T06:00",
//       "2025-04-04T07:00",
//       "2025-04-04T08:00",
//       "2025-04-04T09:00",
//       "2025-04-04T10:00",
//       "2025-04-04T11:00",
//       "2025-04-04T12:00",
//       "2025-04-04T13:00",
//       "2025-04-04T14:00",
//       "2025-04-04T15:00",
//       "2025-04-04T16:00",
//       "2025-04-04T17:00",
//       "2025-04-04T18:00",
//       "2025-04-04T19:00",
//       "2025-04-04T20:00",
//       "2025-04-04T21:00",
//       "2025-04-04T22:00",
//       "2025-04-04T23:00",
//       "2025-04-05T00:00",
//       "2025-04-05T01:00",
//       "2025-04-05T02:00",
//       "2025-04-05T03:00",
//       "2025-04-05T04:00",
//       "2025-04-05T05:00",
//       "2025-04-05T06:00",
//       "2025-04-05T07:00",
//       "2025-04-05T08:00",
//       "2025-04-05T09:00",
//       "2025-04-05T10:00",
//       "2025-04-05T11:00",
//       "2025-04-05T12:00",
//       "2025-04-05T13:00",
//       "2025-04-05T14:00",
//       "2025-04-05T15:00",
//       "2025-04-05T16:00",
//       "2025-04-05T17:00",
//       "2025-04-05T18:00",
//       "2025-04-05T19:00",
//       "2025-04-05T20:00",
//       "2025-04-05T21:00",
//       "2025-04-05T22:00",
//       "2025-04-05T23:00",
//       "2025-04-06T00:00",
//       "2025-04-06T01:00",
//       "2025-04-06T02:00",
//       "2025-04-06T03:00",
//       "2025-04-06T04:00",
//       "2025-04-06T05:00",
//       "2025-04-06T06:00",
//       "2025-04-06T07:00",
//       "2025-04-06T08:00",
//       "2025-04-06T09:00",
//       "2025-04-06T10:00",
//       "2025-04-06T11:00",
//       "2025-04-06T12:00",
//       "2025-04-06T13:00",
//       "2025-04-06T14:00",
//       "2025-04-06T15:00",
//       "2025-04-06T16:00",
//       "2025-04-06T17:00",
//       "2025-04-06T18:00",
//       "2025-04-06T19:00",
//       "2025-04-06T20:00",
//       "2025-04-06T21:00",
//       "2025-04-06T22:00",
//       "2025-04-06T23:00",
//       "2025-04-07T00:00",
//       "2025-04-07T01:00",
//       "2025-04-07T02:00",
//       "2025-04-07T03:00",
//       "2025-04-07T04:00",
//       "2025-04-07T05:00",
//       "2025-04-07T06:00",
//       "2025-04-07T07:00",
//       "2025-04-07T08:00",
//       "2025-04-07T09:00",
//       "2025-04-07T10:00",
//       "2025-04-07T11:00",
//       "2025-04-07T12:00",
//       "2025-04-07T13:00",
//       "2025-04-07T14:00",
//       "2025-04-07T15:00",
//       "2025-04-07T16:00",
//       "2025-04-07T17:00",
//       "2025-04-07T18:00",
//       "2025-04-07T19:00",
//       "2025-04-07T20:00",
//       "2025-04-07T21:00",
//       "2025-04-07T22:00",
//       "2025-04-07T23:00",
//     ],
//     temperature_2m: [
//       15.0, 14.3, 13.9, 13.5, 12.9, 12.5, 11.8, 12.2, 13.5, 14.9, 16.0, 17.4,
//       18.8, 20.0, 20.7, 21.3, 20.7, 20.6, 20.2, 18.8, 16.2, 15.7, 14.8, 14.2,
//       13.6, 13.0, 12.6, 12.4, 12.1, 11.6, 11.7, 11.8, 12.6, 14.4, 16.3, 17.9,
//       19.2, 20.2, 20.7, 21.1, 21.2, 19.2, 17.0, 15.7, 14.8, 14.0, 13.5, 13.1,
//       12.8, 12.3, 11.8, 11.5, 11.3, 11.1, 10.8, 10.4, 12.6, 14.8, 16.6, 18.7,
//       20.5, 22.0, 23.0, 23.0, 23.6, 23.7, 22.4, 20.0, 18.2, 17.0, 15.8, 14.9,
//       13.7, 12.7, 11.9, 11.1, 10.4, 9.9, 9.5, 9.8, 13.0, 15.2, 16.9, 18.5, 19.7,
//       20.3, 21.3, 21.6, 21.4, 20.8, 20.3, 19.3, 17.3, 16.1, 15.0, 14.4, 13.9,
//       13.4, 13.0, 12.7, 12.3, 12.0, 12.1, 12.8, 14.0, 15.4, 16.9, 18.6, 20.0,
//       20.9, 21.4, 21.7, 21.7, 21.4, 20.6, 19.1, 17.2, 15.6, 14.7, 14.1, 13.6,
//       13.0, 12.4, 12.0, 11.7, 11.6, 12.0, 13.1, 14.6, 16.1, 17.5, 19.0, 20.2,
//       21.2, 22.0, 22.4, 22.2, 21.6, 21.1, 19.2, 17.7, 16.4, 15.5, 14.9, 14.3,
//       13.9, 13.7, 13.4, 12.9, 12.4, 12.5, 13.4, 14.8, 16.3, 17.7, 19.3, 20.7,
//       21.9, 23.0, 23.7, 23.8, 23.5, 22.6, 20.7, 18.3, 16.3, 15.1, 14.3,
//     ],
//     relativehumidity_2m: [
//       75, 78, 82, 84, 86, 87, 86, 85, 77, 74, 63, 53, 47, 44, 41, 38, 39, 39,
//       36, 42, 64, 68, 74, 79, 83, 88, 91, 93, 94, 96, 96, 96, 92, 78, 61, 49,
//       47, 44, 39, 37, 36, 45, 55, 62, 67, 72, 75, 79, 83, 86, 89, 91, 93, 94,
//       94, 96, 86, 73, 68, 61, 55, 50, 46, 45, 37, 35, 33, 44, 58, 61, 51, 58,
//       68, 76, 80, 80, 86, 90, 94, 94, 85, 70, 61, 57, 52, 49, 44, 39, 39, 42,
//       43, 50, 57, 63, 72, 77, 80, 84, 87, 90, 93, 95, 94, 90, 83, 76, 67, 58,
//       50, 45, 41, 39, 38, 38, 40, 46, 56, 64, 71, 78, 83, 87, 90, 92, 94, 94,
//       93, 89, 83, 75, 66, 55, 46, 40, 36, 34, 34, 35, 36, 50, 60, 69, 77, 84,
//       90, 93, 93, 94, 96, 97, 96, 91, 83, 76, 71, 66, 61, 55, 48, 43, 41, 40,
//       43, 51, 62, 71, 76, 79,
//     ],
//     windspeed_10m: [
//       5.2, 3.3, 1.8, 2.4, 3.6, 3.2, 2.3, 2.2, 1.4, 3.3, 3.8, 4.4, 2.9, 5.1, 8.9,
//       13.4, 15.4, 9.3, 6.6, 4.6, 8.8, 4.7, 4.8, 3.3, 2.4, 2.3, 2.6, 0.5, 1.5,
//       3.3, 1.6, 1.6, 3.2, 1.6, 2.5, 4.6, 10.8, 9.8, 14.3, 9.6, 8.9, 19.5, 19.7,
//       13.4, 9.7, 8.4, 6.2, 4.3, 2.2, 3.1, 3.3, 2.7, 1.1, 1.1, 1.8, 2.7, 1.0,
//       3.9, 4.3, 7.9, 8.6, 7.5, 10.5, 20.3, 14.2, 7.5, 17.3, 11.5, 4.0, 6.1, 4.4,
//       3.1, 3.6, 3.3, 3.3, 5.2, 4.7, 5.2, 5.4, 5.9, 1.0, 7.7, 8.2, 10.4, 11.7,
//       12.4, 10.0, 9.4, 10.7, 8.1, 5.0, 1.5, 16.7, 8.2, 6.9, 5.9, 6.1, 4.6, 2.9,
//       1.5, 0.5, 0.5, 1.0, 0.7, 1.6, 3.1, 5.0, 7.2, 8.5, 9.0, 9.0, 8.7, 8.5, 8.7,
//       7.3, 3.6, 2.3, 5.1, 4.8, 4.1, 4.1, 2.1, 2.2, 4.2, 3.3, 2.6, 3.2, 2.5, 1.1,
//       1.1, 3.6, 7.8, 10.9, 12.4, 12.4, 12.1, 10.7, 9.2, 7.9, 10.2, 13.4, 15.0,
//       12.9, 8.9, 5.5, 4.0, 3.4, 3.4, 3.8, 4.4, 4.7, 3.7, 2.0, 1.8, 4.3, 8.0,
//       10.5, 11.3, 10.9, 10.2, 9.4, 7.9, 6.3, 4.1, 4.8, 7.1, 7.6, 7.4,
//     ],
//     precipitation: [
//       0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
//       0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
//       0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
//       0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
//       0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.0, 0.1, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
//       0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
//       0.0, 0.0, 0.0, 0.0, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
//       0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
//       0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
//       0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
//       0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
//       0.0, 0.0, 0.0,
//     ],
//   },
// };
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
    day: "Lrain.png",
    night: "Lrain 0.png",
  },
  "Dense drizzle": {
    day: "Lrain.png",
    night: "Lrain 0.png",
  },
  "Slight rain": {
    day: "rain.png",
    night: "rain 0.png",
  },
  "Moderate rain": {
    day: "hail.png",
    night: "hail 0.png",
  },
  "Heavy rain": {
    day: "hail.png",
    night: "hail 0.png",
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

export default function OpenWeather() {
  const [weatherData, setWeatherData] = useState({
    temperature: 14.1,
    weatherCondition: "Partly Cloudy",
    precipitation: 0,
    humidity: 78,
    windSpeed: 4.0,
    units: {
      temp: "°C",
      speed: "km/h",
      precip: "mm",
    },
  });
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    city: null,
  });
  const [date, setDate] = useState({
    day: null,
    hour: null,
  });
  //HOOKS -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    getDate();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (latitude != null || longitude != null) {
            getCityName(latitude, longitude);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  }, []);

  // Modified processWeatherData function
  const processWeatherData = useCallback((data) => {
    if (!data) return null;

    const currentTime = new Date(data.current_weather.time);
    const currentHourIndex = data.hourly.time.findIndex(
      (t) => new Date(t).getHours() === currentTime.getHours()
    );
    const safeIndex = currentHourIndex !== -1 ? currentHourIndex : 0;

    // Process hourly forecast
    const hourlyForecast = data.hourly.time.slice(0, 24).map((time, index) => {
      const date = new Date(time);
      const isDay = date.getHours() >= 6 && date.getHours() < 18;
      const weatherCode = data.hourly.weathercode[index];
      const condition = WEATHER_CODE_MAP[weatherCode] || "Unknown";

      return {
        hour: date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        image:
          WEATHER_IMAGE_MAP[condition]?.[isDay ? "day" : "night"] ||
          "sunny.png",
        temp: data.hourly.temperature_2m[index],
        precipitation: data.hourly.precipitation[index],
        weatherCondition: condition,
      };
    });

    return {
      isDay: data.current_weather.is_day,
      temperature: data.current_weather.temperature,
      weatherCondition:
        WEATHER_CODE_MAP[data.current_weather.weathercode] || "Unknown",
      precipitation: data.hourly.precipitation[safeIndex],
      humidity: data.hourly.relativehumidity_2m[safeIndex],
      windSpeed: data.current_weather.windspeed,
      units: {
        temp: data.hourly_units.temperature_2m,
        speed: data.current_weather_units.windspeed,
        precip: data.hourly_units.precipitation,
      },
      hourlyForecast,
    };
  }, []);

  // Update your API call to include weathercode
  const fetchWeather = useCallback(
    async (signal) => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation,weathercode&current_weather=true&timezone=Africa/Casablanca`,
          { signal }
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Fetch error:", error);
        }
        return null;
      }
    },
    [location?.latitude, location?.longitude]
  );

  useEffect(() => {
    const controller = new AbortController();

    const loadWeather = async () => {
      if (!location?.latitude) return;

      const rawData = await fetchWeather(controller.signal);
      if (!rawData) return;

      const processed = processWeatherData(rawData);
      setWeatherData(processed);
    };

    loadWeather();
    return () => controller.abort();
  }, [fetchWeather, processWeatherData, location?.latitude]);

  //FUNCTIONS -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //used to get lat and lon and name of city
  const getCityName = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      setLocation({
        latitude: lat,
        longitude: lon,
        city:
          response.data.address.city ||
          response.data.address.town ||
          response.data.address.village,
      });
    } catch (error) {
      console.error("Reverse geocode error:", error);
    }
  };

  //used to get current day date
  const getDate = () => {
    const now = new Date();

    const dayFormatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const hourFormatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false, // Set to true if you want AM/PM format
    });

    const currentdate = {
      day: dayFormatter.format(now), // Example: "Monday, 1 Jan 2025"
      hour: hourFormatter.format(now), // Example: "9:00"
    };

    setDate(currentdate);
  };
  return (
    <div className="flex text-[#565eef] flex-col h-screen w-screen bg-gradient-to-br from-[#3726d1] via-[#9fabdd] to-[#8396ee] to-100% backdrop-blur-sm items-center justify-center">
      <div className="flex flex-col items-start h-screen w-screen bg-white/30 backdrop-blur-md rounded-lg ">
        <div className="relative flex flex-col items-center  h-fit w-screen ">
          <LocationSection location={location} date={date} />
          <WeatherInfo weatherData={weatherData} />
        </div>
        <section className="flex flex-col justify-center items-center h-fit w-full">
          <div className="w-full p-2">
            <span className="font-bold px-5 underline text-xl">Today</span>
          </div>
          <section className="w-full h-fit px-3 overflow-x-auto overflow-y-hidden py-2 scrollbar-custom">
            {/* Container */}
            <div className="flex gap-2 w-max min-w-full">
              {weatherData.hourlyForecast?.map((hour, index) => {
                return (
                  <DayWeather
                    key={index}
                    dayData={hour}
                    currentHour={date.hour}
                  />
                );
              })}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
