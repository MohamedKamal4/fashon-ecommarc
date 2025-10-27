import Link from "next/link";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import BlackLine from "../../more/blackLine";

export default function SlideTwo({isMuted , toggleMute2}){
    return(
        <>
            <BlackLine title={'jackets'} />
            <div className="w-full h-screen flex justify-center items-center relative">
                <video
                    className="transition-all size-full object-cover"
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    preload="auto"
                    >
                    <source src={`/videos/4.mp4`} type="video/mp4" />
                    متصفحك لا يدعم الفيديو 
                </video>
                <div className=" absolute top-0 left-0 bg-black/50 z-50 size-full">
                    <div className="size-full relative">
                        <div className="size-full absolute top-0 left-0 bg-black/50 z-50">
                            <div className="size-full md:ps-40 flex flex-col justify-center gap-3 font-mono text-white p-10">
                                <h2 className="text-[50px] md:text-[100px] font-bold uppercase text-white pb-5">jackets</h2>
                                <p className="text-[8px] w-[80%] md:w-[50%]">Step out in confidence with our latest jacket collection — where fashion meets functionality. Each jacket is crafted with premium fabrics to keep you warm and stylish through every season. From classic cuts to bold, modern designs, this collection offers the perfect layering piece for any occasion. Whether you’re heading to the office, exploring the city, or enjoying a casual night out, our jackets are designed to elevate your look and keep you comfortable all day long.</p>
                                <Link className="justify-start w-fit flex gap-2 text-[10px] font-mono font-bold items-center" href={'/collections/jackets'}>
                                    DISCOVER <MdArrowOutward />
                                </Link>
                            </div>
                            <div className="w-full absolute bottom-0 left-0 flex justify-between text-white items-end p-10">
                                <button 
                                    className="cursor-pointer flex gap-3 items-center text-[10px] font-mono font-bold" 
                                    onClick={toggleMute2}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BlackLine title={'jackets'} />
        </>
    )
}