import { PiSunDimFill } from "react-icons/pi";

export default function DayWeather() {
  return (
    <div className="flex flex-col gap-3 text-white justify-center w-[85px] items-center bg-gradient-to-tl from-[#565eef]  via-[#8187f0]  to-[#565eef] to-100% rounded-4xl py-2 hover:scale-110 flex-shrink-0">
      <span>MON</span>
      <PiSunDimFill className="text-yellow-400 text-2xl" />
      <div className="flex flex-col">
        <span className="text-lg font-bold">22°</span>
        <span className="font-bold text-[#c3c4df]">16°</span>
      </div>
    </div>
  );
}
