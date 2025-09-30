import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5"
import { Caveat, Dancing_Script } from "next/font/google";

const dancingScript = Caveat({
  subsets: ["latin"],
  weight: ["400"],
});

export default function SlideTwo({isMuted , toggleMute2}){

    return(
        <div className="size-full relative flex">
            <div
            className="w-[33.33%] relative h-full overflow-hidden" >
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted={true}
                playsInline
            >
                <source src="/videos/h2.mp4" type="video/mp4" />
                متصفحك لا يدعم الفيديو 
            </video>
            </div>
            <div
            className="w-[33.33%] relative h-full overflow-hidden" >
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted={isMuted}
                playsInline
            >
                <source src="/videos/h2.mp4" type="video/mp4" />
                متصفحك لا يدعم الفيديو 
            </video>
            </div>
            <div
            className="w-[33.33%] relative h-full overflow-hidden" >
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted={true}
                playsInline
            >
                <source src="/videos/h2.mp4" type="video/mp4" />
                متصفحك لا يدعم الفيديو 
            </video>
            </div>
            <div className=" absolute top-0 left-0 size-full bg-black/50 flex justify-center items-center z-50">
                <div>
                    <h1 className={`${dancingScript.className} text-white text-9xl text-center`}>" BE UNIQUE <br /> WITH US ,,</h1>
                </div>
                <div className=" absolute bottom-[20px] left-[20px]">
                    <button className=" cursor-pointer flex gap-3 items-center text-[10px] font-mono font-bold" onClick={toggleMute2}>
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