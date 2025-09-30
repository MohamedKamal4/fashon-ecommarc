import Link from "next/link";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { SwiperSlide } from "swiper/react";

export default function SlideOne({isMuted , toggleMute1}){

    return(
        <div className="container py-10 m-auto size-full flex justify-center items-center">
        <div className="w-[80%] relative h-[100%]">
            <div className="p-5 font-mono absolute top-0 left-0 text-white">
            <h2 className="text-[10px] font-bold uppercase pb-5">Shoes</h2>
            <p className="text-[8px] w-[50%]">
                Step into the season with our latest sneaker collection – a perfect blend of comfort, durability, and modern style. Designed for all-day wear, these sneakers feature lightweight materials, cushioned soles, and a sleek design that keeps you looking sharp from morning to night. Whether you are hitting the streets, the gym, or just keeping it casual, this collection has the pair that fits your lifestyle. Elevate your everyday look with sneakers that are made to move with you.
            </p>
            </div>
            <div className="p-5 absolute bottom-0 right-0"> 
                <ul className=" text-[8px] text-white font-mono font-bold"> 
                    <li>Formal</li> 
                    <li>Casual</li> 
                </ul>
            </div>
            {/* VIDEO 1 */}
                <video
                className="transition-all size-full object-cover"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                >
                <source src={`/videos/2.mp4`} type="video/mp4" />
                متصفحك لا يدعم الفيديو 
            </video>

            {/* CONTROLS */}
            <div className="w-full flex justify-between text-gray-500 items-center absolute bottom-[-30px] left-0">
            <button 
                className="cursor-pointer flex gap-3 items-center text-[10px] font-mono font-bold" 
                onClick={toggleMute1}
            >
                {isMuted ? 
                <>
                    <IoVolumeMuteOutline />
                    <span>MUTED</span>
                </>
                :
                <>
                    <IoVolumeHighOutline />
                    <span>UNMUTED</span>
                </>
                }
            </button>
            <Link className="justify-center flex gap-2 text-[10px] font-mono font-bold items-center" href={''}>
                DISCOVER <MdArrowOutward />
            </Link>
            </div>
        </div>
        </div>
    )
}