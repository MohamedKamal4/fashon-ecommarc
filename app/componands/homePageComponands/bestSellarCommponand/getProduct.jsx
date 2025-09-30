'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { Michroma } from "next/font/google";

const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
});


export default function GetProduct({ data, isGet, setIsGet }) {
    const [show, setShow] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [openList , setOpenList] = useState(false)

    useEffect(() => {
        if (isGet) {
            setShow(true); // أظهر الـ modal أولاً
            setTimeout(() => setAnimate(true), 20); // شغّل الأنيميشن بعد mount بفريم واحد
        } else {
            setAnimate(false); // شغّل أنيميشن الخروج
            const timer = setTimeout(() => setShow(false), 700); // بعد ما الأنيميشن يخلص خفي العنصر
            return () => clearTimeout(timer);
        }
    }, [isGet]);

    if (!show) return null;

    return (
        <section
            className={`fixed bg-white bottom-0 left-0 w-screen h-screen transition-opacity duration-500 ease-in-out
            ${animate ? "opacity-100 z-[11000]" : "opacity-0 pointer-events-none"}`}
        >
            <div className="container relative m-auto h-full flex gap-[5%] overflow-hidden">
                {/* زر الإغلاق */}
                <div className="absolute top-[20px] right-[20px] z-[1000]">
                    <button
                        className="cursor-pointer"
                        onClick={() => setIsGet(false)}
                    >
                        <IoIosClose color="black" size={50} />
                    </button>
                </div>

                <div className={`w-[30%] py-20 h-full flex flex-col justify-between gap-10 relative transform transition-all duration-700 ease-out
                    ${animate ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
                >
                    <div className={`flex flex-col gap-5 ${michroma.className}`}>
                        <h1 className={`text-4xl font-mono ${michroma.className}`}>{data.name}</h1>
                        <div className=" ps-5 border-s-2 border-black">
                            <p className={`${michroma.className} text-[10px] text-gray-500 font-mono`}>{data.discription}</p>
                        </div>
                    </div>
                    <div className="text-[7px] flex flex-col gap-2">
                        <p>Origins special collection.</p>
                        <p>Product Measurements</p>
                        <p>Composition & care</p>
                        <p>Check in-store availability</p>
                        <p>SHIPPING, EXCHANGES AND RETURNS</p>
                        <p>Composition: 100% cotton</p>
                    </div>
                </div>

                {/* الصورة مع أنيميشن */}
                <div
                    className={`w-[40%] h-full relative transform transition-all duration-700 ease-out
                    ${animate ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
                >
                    <Image
                        fill
                        src={data.images[1]}
                        alt=""
                        sizes="35vw"
                        className="object-cover"
                    />
                    <p className="font-bold absolute top-[20px] right-[20px] text-xs text-gray-500 font-mono">{data.soldCount} SOLDID</p>
                </div>

                <div
                    className={`w-[30%] ${michroma.className} py-20 h-full flex flex-col justify-end relative transform transition-all duration-700 ease-out
                    ${animate ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
                >
                    <div className="flex items-end gap-5 pb-3">
                        <p className="text-2xl text-red-500 line-through font-mono">{data.originalPrice}$</p>
                        <span className="text-6xl">/</span>
                        <p className="text-6xl font-mono">{data.price} $</p>
                    </div>
                    <div className="w-full">
                        <div className={`flex relative justify-around overflow-hidden h-[150px]`}>
                            <ul className={`w-full h-full left-0 absolute transition-all ${openList ? 'bottom-0' : 'bottom-[-100%]'} overflow-hidden bg-black`}>
                                {data.sizes.map((btn , index) => {
                                    return(
                                        <li className="bg-black" key={index}>
                                            <button className="py-2 transition-all hover:scale-150 cursor-pointer bg-black text-white text-[7px] w-full">{btn}</button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <button onClick={() => {
                            setOpenList(!openList)
                        }} className="w-full cursor-pointer bg-black text-white text-[10px] font-mono font-bold py-2">
                            ADD TO CARD
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
