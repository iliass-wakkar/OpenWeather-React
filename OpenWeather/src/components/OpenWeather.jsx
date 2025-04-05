import { useEffect, useCallback, useState, useMemo } from "react";
import DayWeather from "./dayWeather/DayWeather";
import LocationSection from "./locationSection/LocationSection";
import WeatherInfo from "./weathaerInfo/WeatherInfo";
import axios from "axios";
import { useTranslation } from "react-i18next";
import moment from "moment/min/moment-with-locales";

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
  const { t, i18n } = useTranslation();
  const [language,setLanguage] = useState('ar')
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
 
  //HOOKS -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const date = useMemo(() => {
    language === "ar" ? moment.locale("ar-ma") : moment.locale("en");
    i18n.changeLanguage(language)
     return{
       day: moment().format("dddd,MMMM Do YYYY"),
       hour: moment().format("h:mm:ss a"),
     }
  },[language])
  useEffect(() => {
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
  }, [language]);

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
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=${language}`
      );
      console.log(response.data)
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

  
  return (
    <div className="flex text-[#565eef] flex-col h-screen w-screen bg-gradient-to-br from-[#8396ee] via-[#9fabdd] to-[#3726d1] to-100% backdrop-blur-sm items-center justify-center">
      <div className="flex flex-col items-start h-screen w-screen bg-white/30 backdrop-blur-md rounded-lg lg:gap-26 ">
        <div className="relative flex flex-col items-center  h-fit w-screen ">
          <LocationSection
            lang={language}
            switchLang={setLanguage}
            location={location}
            date={date}
          />
          <WeatherInfo translator={t} weatherData={weatherData} />
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
