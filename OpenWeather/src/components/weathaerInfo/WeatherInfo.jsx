import { FaUmbrella } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { FaWind } from "react-icons/fa6";

export default function WeatherInfo() {
  return (
    <section className="flex flex-col items-center justify-center gap-3">
      <div className="relative flex flex-col ">
        <span className="text-[140px] font-bold ">22°</span>
        <span className="absolute text-2xl bottom-2">sunny</span>
        <img
          className="absolute mt-16 ml-10 scale-130 h-full w-full"
          src="Sun+cloud.png"
          alt=""
        />
      </div>
      <div className="flex items-center gap-10 justify-center bg-white/30 rounded-full w-[380px] h-[90px] mb-4">
        <div className="flex flex-col items-center justify-center gap-0.5 font-bold ">
          <FaUmbrella className="text-xl" />
          <span className="text-xl">22%</span>
          <span className="text-sm font-normal">Precipitation</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-0.5 font-bold ">
          <IoWater className="text-xl" />
          <span className="text-xl">22%</span>
          <span className="text-sm font-normal">Humidity</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-0.5 font-bold ">
          <FaWind className="text-xl" />
          <span className="text-lg">22 km/h</span>
          <span className="text-sm font-normal">Wind speed</span>
        </div>
      </div>
    </section>
  );
}
