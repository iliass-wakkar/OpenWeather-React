import { FaLocationDot } from "react-icons/fa6";
import { PiArrowsCounterClockwiseBold } from "react-icons/pi";

export default function LocationSection({location,date,lang,switchLang}) {
  return (
    <section className="flex flex-col w-screen items-center justify-center pt-3 gap-3 lg:pt-10 lg:gap-16">
      <span className="relative flex gap-2 text-center text-3xl font-bold">
        <FaLocationDot className="text-2xl mt-1.5" />
        {location.city}
        <span
          onClick={() => {
            lang === "ar" ? switchLang("en") : switchLang("ar");
          }}
          className="absolute flex items-center text-lg -right-26 gap-1 cursor-pointer font-normal"
        >
          <PiArrowsCounterClockwiseBold />
          {lang === "ar" ? "EN" : "AR"}
        </span>
      </span>
      <span className="text-lg">{date.day}</span>
    </section>
  );
}
