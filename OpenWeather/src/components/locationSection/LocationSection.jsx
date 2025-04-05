import { FaLocationDot } from "react-icons/fa6";
export default function LocationSection({location,date}) {
  return (
    <section className="flex flex-col w-screen items-center justify-center pt-3 gap-3">
      <span className="flex gap-2 text-3xl font-bold">
        <FaLocationDot className="text-2xl mt-1.5" />
        {location.city}
      </span>
      <span className="text-lg">{date.day}</span>
    </section>
  );
}
