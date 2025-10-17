import Link from "next/link";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";


export default function SlideThree({isMuted , toggleMute3}){

    return(
        <div className=" container m-auto flex flex-col items-center h-screen">
            <div className="w-[30%] h-[70%] relative">
                <video
                    className="transition-all size-full object-cover"
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    >
                    <source src={`/videos/3.mp4`} type="video/mp4" />
                    متصفحك لا يدعم الفيديو 
                </video>
                <div className=" absolute bottom-0 left-0 w-full p-5 flex justify-between items-center">
                    <button 
                        className="cursor-pointer flex gap-3 items-center text-[10px] font-mono font-bold" 
                        onClick={toggleMute3}
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
            <div className="w-[30%] py-5 flex flex-col gap-3 h-[20%]">
                <h1 className={`font-bold font-mono text-[10px]`}>
                    T - SHIRTS
                </h1>
                <p className="text-[8px] font-mono font-bold text-gray-500">Discover our latest T-shirt collection designed for everyday comfort and effortless style. Made with premium fabrics and tailored for the perfect fit, these tees are versatile enough for casual days, nights out, or layering with your favorite pieces. Whether you prefer a minimal look or a bold statement, this collection has something to match your vibe. Upgrade your wardrobe with timeless essentials you’ll reach for every single day.</p>
                <Link className="justify-start flex gap-2 text-[10px]  font-mono font-bold items-center" href={'/collections/tshirts'}>
                    DISCOVER <MdArrowOutward />
                </Link>
            </div>
        </div>
    )

}