import Link from "next/link";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";

export default function SlideOne({isMuted , toggleMute1}){

    return(
        <div className="py-10 container m-auto w-full h-screen flex justify-center items-center">
            <div className="w-[85%] flex flex-col gap-1 justify-center items-center xl:w-[60%] relative h-[90%]">
                <div className=" w-full h-[40%] xl:h-[80%] relative">
                    <video
                        className="transition-all size-full object-cover"
                        autoPlay
                        muted={isMuted}
                        loop
                        playsInline
                        preload="auto"
                        >
                        <source src={`/videos/2.mp4`} type="video/mp4" />
                        متصفحك لا يدعم الفيديو 
                    </video>
                    <Link href={'/collections/shoes'} >
                        <div className="flex justify-center items-center text-white absolute top-0 left-0 size-full bg-black/50 z-50">
                            <h2 className="text-[20px] xl:text-[100px] font-extrabold uppercase">Shoes</h2>
                        </div>
                    </Link>
                </div>
                <div className="w-full h-[20%] flex flex-col gap-2 xl:flex-row items-center">
                    <div className="w-full xl:w-[70%] flex flex-col gap-2"> 
                        <div className="font-mono w-full flex flex-col gap-2">
                            <p className="md:text-[8px] text-[5px] ">
                                Step into the season with our latest sneaker collection – a perfect blend of comfort, durability, and modern style. Designed for all-day wear, these sneakers feature lightweight materials, cushioned soles, and a sleek design that keeps you looking sharp from morning to night. Whether you are hitting the streets, the gym, or just keeping it casual, this collection has the pair that fits your lifestyle. Elevate your everyday look with sneakers that are made to move with you.
                            </p>
                        </div>
                    </div>
                    <div className="w-full xl:w-[30%] flex items-center xl:flex-col xl:items-end gap-4">
                        <button 
                            className="cursor-pointer flex gap-2 items-center md:text-[8px] text-[5px] font-mono font-bold" 
                            onClick={toggleMute1}
                        >
                            {isMuted ? 
                            <>
                                <span>MUTED</span>
                                <IoVolumeMuteOutline />
                            </>
                            :
                            <>
                                <span>UNMUTED</span>
                                <IoVolumeHighOutline />
                            </>
                            }
                        </button>
                        <Link className="xl:justify-center flex gap-2 md:text-[8px] text-[5px] font-mono font-bold items-center" href={'/collections/shoes'}>
                            DISCOVER <MdArrowOutward />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}