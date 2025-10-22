'use client'
import { Michroma } from "next/font/google";
import { useEffect, useState } from "react";

const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
});

export default function BlackLine({ title }) {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize()
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <div className="w-full py-5 bg-black text-white flex justify-between">
      {Array.from({ length: screenWidth < 768 ? 4 : screenWidth < 1024 ? 6 : 12 }).map((_, index) => (
        <p key={index} className={`${michroma.className} uppercase text-[8px] md:text-[10px]`}>
          {title}
        </p>
      ))}
    </div>
  );
}
