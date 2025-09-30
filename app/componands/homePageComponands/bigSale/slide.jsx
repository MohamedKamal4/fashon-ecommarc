'use client'

import BlackLine from "../more/blackLine"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel } from 'swiper/modules';
import Image from "next/image";
import Link from "next/link";


export default function SlideBigSale({data}){
    console.log(data)

    return(
        <section>
            <BlackLine title={'BIG SALE'} />
            <div className=" container m-auto flex flex-col h-screen">
                <div className=" w-full h-[20%] flex items-end py-5">
                    <p className=" w-[50%] text-[10px] font-bold font-mono">"Upgrade your wardrobe without breaking the bank! Our Sale Collection is packed with your favorite styles at unbeatable prices. From everyday essentials to statement pieces, it’s the perfect time to refresh your look and save big. Don’t miss out – shop now before they’re gone!"</p>
                </div>
                <div className=" w-full h-[60%] ">
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
                        modules={[Mousewheel]}
                        mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
                        className="mySwiper size-full"
                    >
                        {data.map((item , index) => {
                            return(
                                <SwiperSlide key={item.id}>
                                    <div className=" size-full flex justify-center items-center flex-col">
                                        <div className="h-[80%] w-full">
                                            <Link href={''}>
                                            <div className="size-full relative card">
                                                <Image 
                                                    src={item.MainImage}
                                                    fill
                                                    alt=""
                                                />
                                            </div>
                                            </Link>
                                        </div>
                                        <div className="py-3 px-2 flex justify-between items-center w-full text-[10px] font-mono font-bold">
                                            <span>{item.price} $ - <span className=" line-through text-[8px] text-red-600">{item.originalPrice} $</span></span>
                                            <span>0 {index + 1}</span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <div className=" w-full h-[20%] flex items-start justify-end py-5">
                    <p className=" w-[50%] text-[10px] font-bold font-mono">"Who said style has to be expensive? Discover our exclusive Sale Collection, where premium quality meets amazing discounts. Whether you’re hunting for casual wear, work outfits, or weekend fits, we’ve got deals you won’t want to miss. Grab your favorites today and elevate your style for less!"</p>
                </div>
            </div>
        </section>
    )
}