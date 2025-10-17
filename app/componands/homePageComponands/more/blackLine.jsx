import { Michroma } from "next/font/google";

const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
});

export default function BlackLine({ title }) {
  return (
    <div className="w-full py-5 bg-black text-white flex justify-between">
      {Array.from({ length: 12 }).map((_, index) => (
        <p key={index} className={`${michroma.className} uppercase text-[10px]`}>
          {title}
        </p>
      ))}
    </div>
  );
}
