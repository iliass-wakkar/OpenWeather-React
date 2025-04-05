export default function DayWeather({ dayData, currentHour, OnClickFunction }) {
  // Convert hour string to numerical value (e.g. "15:00" -> 15)
  const hourValue = parseInt(dayData.hour.split(":")[0], 10);

  // Check if this hour has passed
  const isPastHour = currentHour > hourValue;

  return (
    <div
      onClick={OnClickFunction}
      className={`${
        isPastHour
          ? "opacity-50 grayscale bg-[#565eef]/50"
          : "hover:scale-105 bg-[#565eef]"
      } flex flex-col gap-2 text-white justify-center w-[85px] items-center rounded-2xl p-3 transition-all duration-300 cursor-pointer`}
    >
      <span className="text-sm font-medium">{dayData.hour}</span>
      <img
        className="h-12 w-12"
        src={dayData.image}
        alt={dayData.weatherCondition}
      />
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">{dayData.temp}°</span>
        <span className="text-xs font-bold text-[#c3c4df]">
          {dayData.precipitation+' ' }mm
        </span>
      </div>
    </div>
  );
}
