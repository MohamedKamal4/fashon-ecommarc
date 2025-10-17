'use client'
import { Fragment, useEffect, useState } from "react";
import Brecks from "./brecks";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function NewProducts() {
    const [groupedProducts, setGroupedProducts] = useState([]);
    const [scrollDir, setScrollDir] = useState("down");
    const [isClient , setIsClient] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
        const res = await fetch("http://localhost:3000/api/data/collections");
        const data = await res.json();

        const allProducts = [...data.jackets, ...data.hoodies, ...data.pants];
        const groups = [];

        for (let i = 0; i < allProducts.length; i += 6) {
            groups.push(allProducts.slice(i, i + 6));
        }
        const notFull = groups.filter((group) => group.length === 6)

        setGroupedProducts(notFull);
        };

        fetchData();
    }, []);


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
  
    useEffect(() => {
        setIsClient(true)
        AOS.init({
        duration: 1000,
        once: false,
        offset: 100,
        easing: 'ease-in-out',
        });
    }, []);


    if(!isClient) return null

    return (
        <>
        
            <section
            data-aos={scrollDir === 'down' ? 'zoom-out' : 'zoom-in'}
            className="flex justify-center items-center my-50">
                <div className='relative w-[10%] h-[100px] overflow-hidden'>
                    <Image
                        src='/images/new/master.jpg'
                        alt=''
                        fill
                        sizes="10vw"
                        className="scale-200"
                    />
                </div>
            </section>
            {groupedProducts.map((group, index) => (
                <Fragment key={index}>
                    <section data-aos={scrollDir === 'down' ? 'zoom-out' : 'zoom-in'}>
                        <Brecks
                            num ={ index === 0 ? "one" :
                            index === 1 ? "two" :
                            index === 2 ? "three" :
                            index === 3 ? "four" :
                            index === 4 ? "five" :
                            index === 5 ? "six" :
                            index === 6 ? "seven" :
                            index === 7 ? "eight" :
                            index === 8 ? "nine" : "ten"}
                        />
                    </section>
                    <section>
                        <div className="container m-auto flex flex-wrap">
                            {group.map((el , index) => {
                                return(
                                    <div className="w-[33.33%] h-screen px-10 py-15" key={index}>
                                        <Link href={`/details/${el.category}/${el.id}`}>
                                            <div className="size-full relative">
                                                    <Image
                                                        src={el?.images[0]}
                                                        alt=''
                                                        fill
                                                        sizes="33.33vw"
                                                    />
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                    
                </Fragment>
            ))}
        </>
    );
}
