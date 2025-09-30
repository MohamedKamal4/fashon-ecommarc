
import { Michroma } from "next/font/google";
import Link from "next/link";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
});

export default function SlideThree({isMuted , toggleMute3}){

    return(
        <div className=" container m-auto flex h-full">
            <div className="w-[50%] p-20 h-full">
                <h1 className={`${michroma.className} text-6xl py-20`}>
                    T - SHIRTS
                </h1>
                <p className="text-[8px] font-mono font-bold text-gray-500">Discover our latest T-shirt collection designed for everyday comfort and effortless style. Made with premium fabrics and tailored for the perfect fit, these tees are versatile enough for casual days, nights out, or layering with your favorite pieces. Whether you prefer a minimal look or a bold statement, this collection has something to match your vibe. Upgrade your wardrobe with timeless essentials you’ll reach for every single day.</p>
                <Link className="justify-start py-5 flex gap-2 text-[10px] font-mono font-bold text-gray-500 items-center" href={''}>
                    DISCOVER <MdArrowOutward />
                </Link>
            </div>
            <div className="w-[50%] h-full relative">
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
                <div className="w-full flex justify-between text-white items-center absolute bottom-0 px-10 py-5 left-0">
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
        </div>
    )

}