import DayWeather from "./dayWeather/DayWeather";
import LocationSection from "./locationSection/LocationSection";
import WeatherInfo from "./weathaerInfo/WeatherInfo";

export default function OpenWeather() {
  return (
    <div className="flex text-[#565eef] flex-col h-[92vh] bg-gradient-to-br from-[#7667fc] via-[#9fabdd] to-[#8396ee] to-100% backdrop-blur-sm items-center justify-center">
      <div className="flex flex-col items-start h-screen w-screen bg-white/30 backdrop-blur-md rounded-lg ">
        <div className="relative flex flex-col items-center  h-4/6 w-screen bg-white/30 backdrop-blur-md rounded-lg ">
          <LocationSection />
          <WeatherInfo />
        </div>
        <section className="flex flex-col justify-center items-center h-2/6 w-full">
          <div className="w-full p-2">
            <span className="font-bold px-8">7-day</span>
          </div>
          <section className="w-full h-fit px-3 overflow-x-auto overflow-y-hidden py-2 scrollbar-custom">
            {/* Container */}
            <div className="flex gap-2 w-max min-w-full">
              {/* Inner wrapper */}
              <DayWeather />
              <DayWeather />
              <DayWeather />
              <DayWeather />
              <DayWeather />
              <DayWeather />
              <DayWeather />
              {/* Add as many as needed */}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
