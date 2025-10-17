'use client'


import Image from "next/image"
import { useEffect, useState } from "react"
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5"

export default function HomePageHeroSection({isMuted , toggleMuteMain}){
    const [sectionNum , setSectionNum] = useState(0)

    const sections = [
        {
            mediaType: 'video',
            captions: {
                first: 'Elevate the essentials.',
                socend: 'Style that speaks in silence.',
                third: 'Subtle luxury - Pure confidence.' 
            },
            src: '/videos/1.mp4'
        },
        {
            mediaType: 'img',
            captions: {
                first: 'Redefine your style.',
                socend: 'Timeless pieces.',
                third: 'Effortless confidence.' 
            },
            src: '/images/win.jpg'
        },
        {
            mediaType: 'video',
            captions: {
                first: 'For those who dare to stand out.',
                socend: 'Every piece tells your story.',
                third: 'Effortless confidence.' 
            },
            src: '/videos/h2.mp4'
        },
        {
            mediaType: 'img',
            captions: {
                first: 'Timeless pieces.',
                socend: 'Where elegance meets the everyday.',
                third: 'Discover fashion made for your movement.' 
            },
            src: '/images/win2.jpg'
        },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setSectionNum((prev) => (prev + 1) % sections.length);
        }, 40000);
        return () => clearInterval(interval);
    }, []);

  return (
    <main className="relative">
      <div className=" container m-auto">
        <div className="h-screen w-full relative flex justify-center items-center">
            {sections.map((sec , index) => {
                return(
                    <div key={index} className={` ${index === sectionNum ? 'z-10 opacity-100' : 'z-0 opacity-0'} animate w-[25%] h-full flex justify-end flex-col items-center absolute bottom-[20px] left-auto`}>
                        <div className="w-full h-[68%] overflow-hidden relative " >
                            {sec.mediaType === 'video' ?
                                <>
                                    <video
                                        className="absolute top-0 left-0 w-full h-full object-cover"
                                        autoPlay
                                        loop
                                        muted={index === sectionNum ? isMuted : true}
                                        playsInline
                                    >
                                        <source src={sec.src} type="video/mp4" />
                                        متصفحك لا يدعم الفيديو 
                                    </video>
                                    <div className=" absolute bottom-[10px] left-[20px]">
                                        <button className=" cursor-pointer text-white flex gap-3 items-center text-[10px] font-mono font-bold" onClick={toggleMuteMain}>
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
                                </>
                                :
                                <Image
                                    src={sec.src}
                                    alt=""
                                    fill
                                    priority
                                    sizes="25vw"
                                />
                            }
                        </div>
                        <div className="h-[10%] w-full text-[10px] py-2 font-mono font-bold uppercase">
                            <h1>{sec.captions.first}</h1>
                            <h2>{sec.captions.socend}</h2>
                            <h3>{sec.captions.third}</h3>
                        </div>
                    </div>
                )
            })

            }
        </div>
        <div className="w-full h-[500px] text-[12px] uppercase font-mono flex justify-center items-center flex-col">
          <h1 className="font-bold">DISCOVER OUR COLLECTIONS</h1>
          <p className="text-[10px] font-bold">scroll down</p>
          <span className="h-[100px] w-[2px] pending-two relative bg-black/50 mt-5"></span>
        </div>
      </div>
    </main>
  );
}
