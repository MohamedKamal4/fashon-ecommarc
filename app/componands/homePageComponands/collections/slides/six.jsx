import Link from "next/link";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import BlackLine from "../../more/blackLine";

export default function SlideSix({isMuted , toggleMute6}){


    return(
        <>
            <BlackLine title={'hoodies'} />
            <div className=" h-screen relative">
                <video
                    className="transition-all size-full object-cover"
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    >
                    <source src={`/videos/hoodies.mp4`} type="video/mp4" />
                    متصفحك لا يدعم الفيديو 
                </video>
                <div className=" size-full absolute top-0 left-0 z-50 bg-black/50">
                <div className=" container m-auto h-full">
                        <div className="ps-40 size-full flex flex-col justify-center font-mono absolute top-0 left-0 text-white">
                            <h2 className="text-9xl font-bold uppercase pb-5">hoodies</h2>
                            <p className="text-[8px] w-[50%]">Stay cozy and stylish with our latest hoodie collection – the perfect balance of comfort and street-ready fashion. Crafted with soft, premium fabrics, these hoodies are made to keep you warm while looking effortlessly cool. Whether you’re lounging at home, heading out with friends, or layering up for chilly days, this collection has the perfect piece for every vibe. Upgrade your casual look with hoodies designed for all-day comfort and modern style.</p>
                            <Link className="justify-start w-fit py-5 flex gap-2 text-[10px] font-mono font-bold items-center" href={'/collections/hoodies'}>
                                DISCOVER <MdArrowOutward />
                            </Link>
                        </div>
                        <div className="w-full flex justify-between text-white items-center absolute bottom-0 px-10 py-5 left-0">
                            <button 
                                className="cursor-pointer flex gap-3 items-center text-[10px] font-mono font-bold" 
                                onClick={toggleMute6}
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
            <BlackLine title={'hoodies'} />
        </>
    )
}