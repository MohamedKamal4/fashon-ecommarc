'use client'
import Image from "next/image"
import { useEffect, useState } from "react"

export default function HeadNewPage(){
    const [sectionNum , setSectionNum] = useState(0)

    const sections = [
        {
            mediaType: 'img',
            captions: {
                first: 'Cozy layers. Clean lines. Effortless style.',
                socend: 'Embrace the season with bold & worth Winter 2026 Collection — made for those who lead, not follow.'
            },
            src: '/images/newCover.jpg'
        },
        {
        mediaType: 'img',
            captions: {
                first: 'Discover the warmth of elegance in every detail.',
                socend: 'The new bold & worth Winter Collection — where classic design meets modern sophistication. Because true luxury is timeless.',
            },
            src: '/images/newCover2.jpg'
        },
        {
        mediaType: 'img',
            captions: {
                first: 'Winter’s here, but style never chills.',
                socend: 'Step into the season with the bold & worth New Collection Bold looks. Warm vibes. Unstoppable energy.',
            },
            src: '/images/newCover3.jpg'
        },
        {
        mediaType: 'img',
            captions: {
                first: 'Cold outside. Fire in your style.',
                socend: 'The Winter Collection by bold & worth — made to stand out when the world fades.',
            },
            src: '/images/newCover4.jpg'
        },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setSectionNum((prev) => (prev + 1) % sections.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    return(
        <div className="h-screen w-full relative flex justify-center items-center">
            {sections.map((sec , index) => {
                return(
                    <div key={index} className={` ${index === sectionNum ? 'z-10 opacity-100' : 'z-0 opacity-0'} animate w-[50%] md:w-[40%] h-full flex justify-center flex-col items-start absolute bottom-0 left-auto`}>
                        <div className="w-full h-[20%] xl:h-[40%] overflow-hidden relative mt-10 xl:mt-30" >
                            <Image
                                src={sec.src}
                                alt=""
                                fill
                                priority
                                sizes='50vw'
                            />
                        </div>
                        <div className="h-[10%] text-[5px] md:text-[10px] py-2 xl:pe-20 font-mono font-bold uppercase">
                            <h1>{sec.captions.first}</h1>
                            <h2>{sec.captions.socend}</h2>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}