import Link from "next/link";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";

export default function SlideTwo({isMuted , toggleMute2}){
    return(
        <>
            <video
                className="transition-all size-full object-cover"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                >
                <source src={`/videos/4.mp4`} type="video/mp4" />
                متصفحك لا يدعم الفيديو 
            </video>
            <div className=" size-full absolute top-0 left-0 z-50 bg-black/50">
                <div className=" container m-auto h-full">
                    <div className="ps-40 size-full flex flex-col justify-center font-mono absolute top-0 left-0 text-white">
                        <h2 className="text-9xl font-bold uppercase pb-5">jackets</h2>
                        <p className="text-[8px] w-[50%]">Step out in confidence with our latest jacket collection — where fashion meets functionality. Each jacket is crafted with premium fabrics to keep you warm and stylish through every season. From classic cuts to bold, modern designs, this collection offers the perfect layering piece for any occasion. Whether you’re heading to the office, exploring the city, or enjoying a casual night out, our jackets are designed to elevate your look and keep you comfortable all day long.</p>
                        <Link className="justify-start w-fit py-5 flex gap-2 text-[10px] font-mono font-bold items-center" href={''}>
                            DISCOVER <MdArrowOutward />
                        </Link>
                    </div>
                    <div className="w-full flex justify-between text-white items-center absolute bottom-0 px-10 py-5 left-0">
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
        </>
    )
}