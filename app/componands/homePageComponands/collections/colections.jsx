'use client'

import BlackLine from "../more/blackLine";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useState } from "react";
import SlideThree from "./slides/three"
import SlideFour from "./slides/four"
import SlideOne from "./slides/one" 
import SlideTwo from "./slides/two" 
import SlideFive from "./slides/five"
import SlideSix from "./slides/six"
import { PiSlideshowFill } from "react-icons/pi";



export default function Collections() {
  const [isMuted , setIsMuted] = useState({
    one: true,
    two: true,
    three: true,
    six: true
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
      two: true, 
      three: true,
      six: true
    }))
  }

  const toggleMute2 = () => {
    setIsMuted(prev => ({
      ...prev,
      two: !prev.two,
      one: true ,
      three: true, 
      six: true 
    }))
  }

  const toggleMute3 = () => {
    setIsMuted(prev => ({
      ...prev,
      three: !prev.three,
      one: true ,
      two: true ,
      six: true 
    }))
  }
  const toggleMute6 = () => {
    setIsMuted(prev => ({
      ...prev,
      six: !prev.six,
      one: true ,
      two: true ,
      three: true 
    }))
  }

  return (
    <section>
      <BlackLine title={'COLLECTIONS'}/>
      <Swiper 
        onSlideChange={handleSlideChange}
        navigation={true} 
        modules={[Navigation]} 
        className="mySwiper w-full h-screen"
      >
        {/* === intro === */}
        <SwiperSlide>
          <div className=" size-full flex ">
            <div className=" container m-auto flex flex-col gap-2 justify-center items-center">
              <PiSlideshowFill />
              <span className="text-[8px] font-mono font-bold">SCROL FOR</span>
              <p className="text-[12px] font-mono font-bold">DISCOVER OUR COLLECTIONS</p>
            </div>
          </div>
        </SwiperSlide>
        {/* === SLIDE 1 === */}
        <SwiperSlide className="size-full relative">
          <SlideTwo isMuted={isMuted.two} toggleMute2={toggleMute2} />
        </SwiperSlide>
        {/* === SLIDE 2 === */}
        <SwiperSlide className="size-full relative">
          <SlideFour />
        </SwiperSlide>
        {/* === SLIDE 3 === */}
        <SwiperSlide className="size-full py-20">
          <SlideOne isMuted={isMuted.one} toggleMute1={toggleMute1} />
        </SwiperSlide>
        {/* === SLIDE 4 === */}
        <SwiperSlide className="size-full relative">
          <SlideThree isMuted={isMuted.three} toggleMute3={toggleMute3} />
        </SwiperSlide>
        {/* === SLIDE 5 === */}
        <SwiperSlide className="size-full relative">
          <SlideFive />
        </SwiperSlide>
        {/* === SLIDE 6 === */}
        <SwiperSlide className="size-full relative">
          <SlideSix  isMuted={isMuted.six} toggleMute6={toggleMute6}/>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
