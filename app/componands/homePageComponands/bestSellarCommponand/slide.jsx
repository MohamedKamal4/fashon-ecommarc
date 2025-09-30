'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel } from 'swiper/modules';
import { CiBookmark } from "react-icons/ci";
import AOS from "aos";
import "aos/dist/aos.css";
import GetProduct from "./getProduct";
import BlackLine from "../more/blackLine";


export default function BestSellarSlide({ data }) {
    const [activeItem, setActiveItem] = useState(0)
    const [item, setItem] = useState(data[0])
    const [isGet , setIsGet] = useState(false)
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true)
        AOS.init({
            duration: 1000, 
            once: true,     
        });
    }, []);
    
    if (!isClient) return null; 

  return (
    <section className=" pb-25">
        <BlackLine title={'BEST SELLAR'} />
      <div
        data-aos='fade-up'
        className="container mt-25 m-auto relative">
        <Swiper
            slidesPerView={3}
            centeredSlides
            speed={800} 
            modules={[Mousewheel]}
            mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
            className="mySwiper h-[600px] w-full"
            onSlideChange={(swiper) => {
                setActiveItem(swiper.activeIndex);
                setItem(data[swiper.activeIndex]);
            }}
        >
            {data.map((el , index) => (
                <SwiperSlide key={el.id} className={`h-full relative w-[33.33%] ${activeItem === index ? ` scale-105 ` : 'scale-50 opacity-50'}`}>
                    <div className={`size-full relative`}>
                        <Image
                            src={`/images/bestSellar/${el.home}`}
                            fill
                            alt={el.title || "Best Seller"}
                            className="object-cover fixed"
                            sizes="33.33vw"
                        />
                    </div>

                    {activeItem === index &&
                        <div className=" absolute top-0 right-0 size-full bg-transparent pt-10">
                            <div data-aos='fade-right' className="h-full py-10 absolute top-0 left-[-50px] flex flex-col justify-between">
                                <div className="text-[10px] text-gray-500 font-mono font-bold ps-5 border-s-2 border-black">
                                    <h1 className="pb-5">{el.name}</h1>
                                    <p className="w-[30%] text-[8px]">{el.discription}</p>
                                </div>
                                <button onClick={() => {
                                    setIsGet(true)
                                }} className="px-5 w-fit cursor-pointer py-2 text-[10px] bg-black text-white">
                                    GET
                                </button>
                            </div>
                            <div data-aos='fade-left' className=" absolute top-0 py-10 right-[-50px] h-full flex flex-col items-end justify-between  ">
                                <div  className="pe-5">
                                    <button className=" cursor-pointer"><CiBookmark /></button>
                                </div>
                                <div className=" text-[10px] text-gray-500 font-mono font-bold pe-5 border-e-2 border-black">
                                    <div className="flex gap-2">
                                        <p>{el.price} $</p>
                                        <p className=" text-red-600 line-through">{el.originalPrice}</p>
                                    </div>
                                    <p className=" uppercase">Soldid {el.soldCount}</p>
                                    <p className=" uppercase">sizes {el.sizes.join(' - ')}</p>
                                </div>
                            </div>
                        </div>
                    }
                </SwiperSlide>
            ))}
        </Swiper>
      </div>

      
        <GetProduct data={item} isGet={isGet} setIsGet={setIsGet} />

    </section>
  )
}
