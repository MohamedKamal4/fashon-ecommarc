'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos"
import "aos/dist/aos.css"

export default function HeadCollectionPage({collections}){
    const [isClient, setIsClient] = useState(false);

    const images ={
        pants: 'pants.jpg',
        jackets: 'jackets.jpg',
        shoes: 'shoes.jpg',
        hoodies: 'hoodies.jpg',
        tshirts: 'tshirts.jpg',
        shirts: 'shirts.jpg'
    }
        
        
    useEffect(() => {
        setIsClient(true)
        AOS.init({
            duration: 800,
            once: true,    
            offset: 100, 
        })
    },[])

    if (!isClient) return null; 


    return(
        <div className=" w-full flex justify-center items-center mb-30 pt-32">
            <div data-aos='zoom-in' className=" relative h-[500px] w-[35%]">
                <Image 
                    src={`/images/${images[collections]}`}
                    alt=""
                    fill
                    priority
                    sizes={'35vw'}
                />
            </div>
        </div>
    )
}