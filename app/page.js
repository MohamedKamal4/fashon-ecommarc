'use client'
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import Loading from "./componands/loadingCompnand/loading";
const About = dynamic(() => import("./componands/homePageComponands/about/about"))
const Collections = dynamic(() => import("./componands/homePageComponands/collections/colections"))
const HomePageHeroSection = dynamic(() => import('./componands/homePageComponands/heroSection/heroSection')) 

export default function Home() {
  
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <HomePageHeroSection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Collections />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <About />
      </Suspense>
    </>
  );
}
