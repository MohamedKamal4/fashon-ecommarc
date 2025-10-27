import Link from "next/link";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";


export default function SlideThree({isMuted , toggleMute3}){

    return(
        <div className=" container mt-30 m-auto flex flex-col items-center justify-center h-screen">
            <div className="w-[85%] h-[60%] md:w-[70%] md:h-[70%] xl:w-[30%] xl:h-[70%] relative">
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
                <Link href={'/collections/tshirts'} >
                    <div className="flex justify-center items-center text-white absolute top-0 left-0 size-full bg-black/50 z-50">
                        <h2 className="text-[20px] xl:text-[70px] font-extrabold uppercase">T - SHIRTS</h2>
                    </div>
                </Link>
                
            </div>
            <div className="w-[85%] md:w-[70%] xl:w-[30%] py-5 flex flex-col gap-3 h-[20%]">
                <p className="md:text-[8px] text-[5px] font-mono font-bold text-gray-500">Discover our latest T-shirt collection designed for everyday comfort and effortless style. Made with premium fabrics and tailored for the perfect fit, these tees are versatile enough for casual days, nights out, or layering with your favorite pieces. Whether you prefer a minimal look or a bold statement, this collection has something to match your vibe. Upgrade your wardrobe with timeless essentials you’ll reach for every single day.</p>
                <div className=" w-full flex gap-4 items-center">
                    <button 
                        className="cursor-pointer flex gap-2 items-center md:text-[8px] text-[5px] font-mono font-bold" 
                        onClick={toggleMute3}
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
                    <Link className="justify-start flex gap-2 md:text-[8px] text-[5px]  font-mono font-bold items-center" href={'/collections/tshirts'}>
                        DISCOVER <MdArrowOutward />
                    </Link>
                </div>
            </div>
        </div>
    )

}