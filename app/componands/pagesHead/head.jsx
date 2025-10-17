'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoVolumeHighOutline, IoVolumeMuteOutline } from 'react-icons/io5';
import { Caveat } from "next/font/google";

const dancingScript = Caveat ({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Head({pageName}){
    const [isMuted , setIsMuted] = useState(true)
    const HeadItems = {
        pants: {
            mainTitle: "Men’s Pants Collection | Bold & Worth",
            secondTitle: "Shop premium men’s pants – from slim-fit chinos to casual joggers. Designed for comfort, durability, and timeless style to fit every occasion.",
            itemOne: '/videos/pantsHead.mp4',
            itemTwo: '/images/pantsHead.jpg'
        },
        shirts: {
            mainTitle: "Men’s Shirts | Classic & Casual Styles",
            secondTitle: "Discover elegant men’s shirts made with high-quality fabrics. Perfect for business, casual outings, and every moment in between.",
            itemOne: '/videos/shirtsHead.mp4',
            itemTwo: '/images/shirtsHead.jpg'
        },
        tshirts: {
            mainTitle: "Men’s T-Shirts | Trendy Everyday Wear",
            secondTitle: "Upgrade your casual style with our versatile men’s t-shirts. Modern fits, soft fabrics, and stylish designs for every personality.",
            itemOne: '/videos/tshirtsHead.mp4',
            itemTwo: '/images/tshirtsHead.jpg'
        },
        shoes: {
            mainTitle: "Men’s Shoes | Sneakers, Formal & More",
            secondTitle: "Step up your style with our men’s shoes collection. From sleek formal shoes to casual sneakers, designed for comfort and confidence.",
            itemOne: '/videos/shoesHead.mp4',
            itemTwo: '/images/shoesHead.jpg'
        },
        jackets: {
            mainTitle: "Men’s Jackets | Stylish & Seasonal",
            secondTitle: "Find the perfect men’s jacket for every season. Warm winter coats and modern lightweight designs that complete your wardrobe.",
            itemOne: '/videos/jacketsHead.mp4',
            itemTwo: '/images/jacketsHead.jpg'
        },
        hoodies: {
            mainTitle: "Men’s Hoodies | Comfort & Style",
            secondTitle: "Explore our men’s hoodies – crafted for everyday comfort with a modern look. Soft fabrics and versatile styles for any occasion.",
            itemOne: '/videos/hoodiesHead.mp4',
            itemTwo: '/images/hoodiesHead.jpg'
        },
        favoriteList: {
            mainTitle: "Your Favorites | BOLD & WORTH",
            secondTitle: "Browse your favorite items in one place. Save, revisit, and shop your personal style picks anytime you like.",
            itemOne: '/videos/favoriteHead.mp4',
            itemTwo: '/images/favoriteListHead.jpg'
        },
        bestSellar: {
            mainTitle: "Best Sellers | Customer Favorites",
            secondTitle: "Shop our best-selling men’s fashion picks. Trusted by customers for their quality, style, and timeless appeal.",
            itemOne: '/videos/bestSellarHead.mp4',
            itemTwo: '/images/bestSellarSecondHead.jpg'
        },
        new: {
            mainTitle: "New Arrivals | Latest Men’s Fashion",
            secondTitle: "Stay ahead with our new arrivals – fresh, stylish, and modern pieces that keep your wardrobe up to date.",
            itemOne: '/videos/newHead.mp4',
            itemTwo: '/images/newHead.jpg'
        },
        sale: {
            mainTitle: "Sale | Men’s Fashion Deals",
            secondTitle: "Don’t miss our exclusive men’s fashion sale. Get premium quality pieces at unbeatable prices – limited time only.",
            itemOne: '/videos/saleHead.mp4',
            itemTwo: '/images/saleHead.jpg'
        },
    }
    const data = HeadItems[pageName];

    return(
        <main>
            <div className="h-screen">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper size-full" onSlideChange={(() => {
                    setIsMuted(true)
                })}>
                    <SwiperSlide className='size-full'>
                        <div className='size-full flex justify-center items-center p-30 pb-10'>
                            <div className='w-[50%] h-full relative'>
                                {data?.itemOne && (
                                <video
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                    autoPlay
                                    loop
                                    muted={isMuted}
                                    playsInline
                                >
                                    <source src={data.itemOne} type="video/mp4" />
                                    متصفحك لا يدعم الفيديو
                                </video>
                                )}

                                <div className={`absolute flex justify-center items-center size-full text-white top-0 left-0 bg-black/50 z-50 ${dancingScript.className}`}>
                                    <h1 className={` ${pageName === 'new' ? 'opacity-0' : ''} text-2xl`}>{data.mainTitle}</h1>
                                    <button className="absolute bottom-[20px] left-[20px] cursor-pointer flex gap-3 items-center text-[10px] font-mono font-bold" onClick={(() => {
                                        setIsMuted(!isMuted)
                                    })}>
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
                    </SwiperSlide>
                    <SwiperSlide className='size-full'>
                        {data?.itemTwo && (
                            <div className='size-full relative'>
                                <Image
                                src={data.itemTwo}
                                fill
                                alt={data.mainTitle}
                                />
                                <div className={`${dancingScript.className} text-white text-3xl absolute top-0 left-0 size-full bg-black/75 backdrop-blur-xs z-50 flex justify-center items-center`}>
                                    <h2 className='w-[70%] text-center'>{data.secondTitle}</h2>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                </Swiper>
            </div>
        </main>
    )
}