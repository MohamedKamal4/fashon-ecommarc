import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5"

export default function SlideOne({isMuted , toggleMute1}){

    return(
        <div>
            <div className="absolute top-0 left-0 size-full overflow-hidden" >
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted={isMuted}
                playsInline
            >
                <source src="/videos/1.mp4" type="video/mp4" />
                متصفحك لا يدعم الفيديو 
            </video>
            <div className=" absolute bottom-[20px] left-[20px]">
                <button className=" cursor-pointer flex gap-3 items-center text-[10px] font-mono font-bold" onClick={toggleMute1}>
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