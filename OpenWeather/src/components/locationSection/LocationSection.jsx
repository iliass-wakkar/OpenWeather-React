import { FaLocationDot } from "react-icons/fa6";
export default function LocationSection() {
  return (
    <section className="flex flex-col items-center justify-center pt-11 gap-3">
      <span className="flex gap-2 text-3xl font-bold">
        <FaLocationDot className="text-2xl mt-1.5"/>
        Location
      </span>
      <span className="text-lg">Monday, 1 jan 2025</span>
      <span className="text-3xl font-bold">9:00</span>
    </section>
  );
}
