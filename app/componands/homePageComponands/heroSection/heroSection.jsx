"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import SlideThree from "./heroSlides/three";
import SlideTwo from "./heroSlides/two";
import SlideOne from "./heroSlides/one";


export default function HomePageHeroSection() {
    const [isMuted , setIsMuted] = useState({
      one: true,
      two: true
    })

    const handleSlideChange = () => {
      setIsMuted({
        one: true,
        two: true,
        three: true,
        six: true,
      });
    }

    const toggleMute1 = () => {
      setIsMuted(prev => ({
        ...prev,
        one: !prev.one,
        two: true
      }))
    }

    const toggleMute2 = () => {
      setIsMuted(prev => ({
        ...prev,
        two: !prev.one,
        one: true
      }))
    }

  return (
    <main className="relative">
      <div className="h-screen">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper size-full" onSlideChange={handleSlideChange}>
          <SwiperSlide>
            <SlideOne isMuted={isMuted.one} toggleMute1={toggleMute1} />
          </SwiperSlide>
          <SwiperSlide>
            <SlideThree />
          </SwiperSlide>
          <SwiperSlide>
            <SlideTwo isMuted={isMuted.two} toggleMute2={toggleMute2} />
          </SwiperSlide>
        </Swiper>
      </div>
    </main>
  );
}
