import Link from "next/link";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";

export default function SlideOne({isMuted , toggleMute1}){

    return(
        <div className="py-10 container m-auto w-full h-screen flex justify-center items-center">
            <div className="w-[60%] relative h-[90%]">
                <Link href={'/collections/shoes'} >
                    <div className=" w-full h-[80%] relative">
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
                        <div className="flex justify-center items-center text-white absolute top-0 left-0 size-full bg-black/50 z-50">
                            <h2 className="text-[100px] font-extrabold uppercase">Shoes</h2>
                        </div>
                    </div>
                </Link>
                <div className="w-full h-[20%] flex items-center">
                    <div className="w-[70%] flex flex-col gap-2"> 
                        <div className="font-mono w-full flex flex-col gap-2">
                            <p className="text-[8px] ">
                                Step into the season with our latest sneaker collection – a perfect blend of comfort, durability, and modern style. Designed for all-day wear, these sneakers feature lightweight materials, cushioned soles, and a sleek design that keeps you looking sharp from morning to night. Whether you are hitting the streets, the gym, or just keeping it casual, this collection has the pair that fits your lifestyle. Elevate your everyday look with sneakers that are made to move with you.
                            </p>
                        </div>
                        <ul className=" text-[8px] flex items-center gap-3 font-mono w-full font-bold"> 
                            <li>Formal</li> 
                            <span className="w-[10px] h-[1px] bg-black"></span> 
                            <li>Casual</li> 
                        </ul>
                    </div>
                    <div className="w-[30%] flex flex-col items-end gap-2">
                        <button 
                            className="cursor-pointer flex gap-3 items-center text-[10px] font-mono font-bold" 
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
                        <Link className="justify-center flex gap-2 text-[10px] font-mono font-bold items-center" href={'/collections/shoes'}>
                            DISCOVER <MdArrowOutward />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}