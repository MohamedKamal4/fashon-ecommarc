'use client'

import 'swiper/css';
import 'swiper/css/navigation';
import "aos/dist/aos.css";

import dynamic from "next/dynamic";
import Loading from "./componands/loadingCompnand/loading";
import NewHome from "./componands/homePageComponands/newHome/newHome";
import AOS from "aos";

import { useEffect , useState } from "react";
import { Navigation } from 'swiper/modules';
import { useDispatch } from "react-redux";
import { toggleLogo } from "./redux/slices/changeLogo";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';

const About = dynamic(() => import("./componands/homePageComponands/about/about"), { loading: () => <Loading /> });
const HomePageHeroSection = dynamic(() => import("./componands/homePageComponands/heroSection/heroSection"), { loading: () => <Loading /> });
const SlideOne = dynamic(() => import("./componands/homePageComponands/collections/slides/one"), { loading: () => <Loading /> });
const SlideTwo = dynamic(() => import("./componands/homePageComponands/collections/slides/two"), { loading: () => <Loading /> });
const SlideThree = dynamic(() => import("./componands/homePageComponands/collections/slides/three"), { loading: () => <Loading /> });
const SlideFour = dynamic(() => import("./componands/homePageComponands/collections/slides/four"), { loading: () => <Loading /> });
const SlideFive = dynamic(() => import("./componands/homePageComponands/collections/slides/five"), { loading: () => <Loading /> });
const SlideSix = dynamic(() => import("./componands/homePageComponands/collections/slides/six"), { loading: () => <Loading /> });

export default function Home() {
    const dispatch = useDispatch()
    const changeLogo = useSelector((state) => state.isChange.changeLogo);
    const [scrollDir, setScrollDir] = useState("down");
    const [isClient , setIsClient] = useState(false)

    useEffect(() => {
      let lastScroll = window.scrollY;
  
      const handleScroll = () => {
        const currentScroll = window.scrollY;
        const direction = currentScroll > lastScroll ? "down" : "up";
  
        if (direction !== scrollDir) {
          setScrollDir(direction);
          AOS.refresh();
        }
  
        lastScroll = currentScroll <= 0 ? 0 : currentScroll;
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollDir]);
  
    const [isMuted, setIsMuted] = useState({
      main: true,
      one: true,
      two: true,
      three: true,
      six: true,
    });
  
    const toggleMute = (key) => {
      setIsMuted({
        main: key === "main" ? !isMuted.main : true,
        one: key === "one" ? !isMuted.one : true,
        two: key === "two" ? !isMuted.two : true,
        three: key === "three" ? !isMuted.three : true,
        six: key === "six" ? !isMuted.six : true,
      });
    };
  
    useEffect(() => {
      setIsClient(true)
      AOS.init({
        duration: 1000,
        once: false,
        offset: 100,
        easing: 'ease-in-out',
      });
    }, []);
  
    useEffect(() => {
      if (changeLogo) {
        setIsMuted({
          main: true,
          one: true,
          two: true,
          three: true,
          six: true,
        });
      }
    }, [changeLogo]);
  
    const sections = [
      <SlideOne key="one" isMuted={isMuted.one} toggleMute1={() => toggleMute("one")} />,
      <SlideFive key="five" />,
      <SlideSix key="six" isMuted={isMuted.six} toggleMute6={() => toggleMute("six")} />,
      <SlideFour key="four" />,
      <SlideTwo key="two" isMuted={isMuted.two} toggleMute2={() => toggleMute("two")} />,
      <SlideThree key="three" isMuted={isMuted.three} toggleMute3={() => toggleMute("three")} />,
    ];
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
    if(!isClient) return null

  return (
    <>
      <Swiper navigation={true} 
      autoHeight={true}
      modules={[Navigation]} className="mySwiper swiper-home" onSlideChange={(() => {
        window.scrollTo(0, 0);
        dispatch(toggleLogo ())
      })}>
        <SwiperSlide className="h-fit">
            <HomePageHeroSection isMuted={isMuted.main} toggleMuteMain={() => toggleMute("main")} /> 
            {sections.map((section, index) => (
              <section
                key={index}
                data-aos={index === 2 || index === 4 ? '' : scrollDir === 'down' ? 'zoom-out' : 'zoom-in'}
                className="xl:my-50"
              >
                {section}
              </section>
            ))}
            <About /> 
        </SwiperSlide>
        <SwiperSlide className="overflow-hidden" >
            <NewHome />
        </SwiperSlide>
      </Swiper>
    </>
  );
}