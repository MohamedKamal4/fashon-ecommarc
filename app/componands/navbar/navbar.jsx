'use client'

import { FaMinus, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ThreeDModel from "../homePageComponands/heroSection/model";
import { GiMovementSensor } from "react-icons/gi";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
export default function Navbar({ className }){
    const pathname = usePathname()
    const [openList , setOpenList] = useState(false)
    const [mounted, setMounted] = useState(false);
    const [isMuted , setIsMuted] = useState(true)
    const [openCollections , setOpenCollections] = useState(false)
    const [openSearch , setOpenSearch] = useState(false)

    useEffect(() => {
        AOS.init({
        duration: 1000, 
        once: true,     
        });
        setMounted(true); 
    }, []);

    if (!mounted) return null; 


    return(
        <header>
            <nav className={` fixed left-0 top-0 w-full z-[3000] navbar`}>
                <div data-aos='fade-down' className={`${className} container relative z-[1000] py-5 flex justify-between items-center m-auto`}>
                    <div className={`w-[50%] flex gap-10 items-center`}>
                        <div className=" h-[40px] w-[10%] ">
                            <button
                                onClick={() => {setOpenList(!openList)
                                    setIsMuted(true)
                                }}
                                className="z-[5000] size-full focus:outline-0 flex flex-col justify-around cursor-pointer relative"
                                >
                                <span
                                    className={`w-full h-[1px] transform transition-all duration-300 
                                    ${openList ? "translate-y-[6px] bg-white rotate-45" : "bg-black"}`}
                                ></span>
                                <span
                                    className={`w-full h-[1px] bg-black transition-all duration-300 
                                    ${openList ? "opacity-0" : "opacity-100"}`}
                                ></span>
                                <span
                                    className={`w-full h-[1px] transform transition-all duration-300
                                    ${openList ? "-translate-y-[20px] bg-white -rotate-45" : " bg-black"}`}
                                ></span>
                            </button>
                        </div>
                        <div className={` fixed top-0 list flex ${openList ? 'left-[-50px]' : 'left-[-200%] opacity-0'} h-screen w-screen bg-black/50 z-[4000] backdrop-blur-xs`}>
                            <div className=" w-[50%] flex h-full bg-black/25 backdrop-blur-xs rounded-tr-4xl rounded-br-4xl ">
                                <div className=" bg-white/50 py-30 backdrop-blur-xs rounded-tr-4xl rounded-br-4xl h-full w-[50%]">
                                    <div className=" size-full px-10">
                                        <ul className="text-xs h-full gap-2 ps-20 py-15 flex flex-col justify-between items-start">
                                            <li className={`${pathname === '/' ? 'font-bold' : ''}`}><Link href={'/'}>HOME</Link></li>
                                            <li><button className={`cursor-pointer flex gap-5 items-center`} onClick={(() => {
                                                setOpenCollections(!openCollections)
                                                setIsMuted(true)
                                            })}>
                                                COLLECTIONS 
                                                {openCollections ? 
                                                    <FaMinus />
                                                    :
                                                    <FaPlus />
                                                }
                                            </button></li>
                                            <li><Link href={''}>BEST SELLAR</Link></li>
                                            <li><Link href={''}>NEW</Link></li>
                                            <li><Link href={''}>SALE</Link></li>
                                            <li><Link href={''}>ABOUT US</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className=" w-[50%] relative h-full flex justify-center items-center">
                                    <div className={` ${openCollections ? 'opacity-0 z-0' : 'opacity-100 z-[2000]'} nav-vid w-[90%] absolute top-[15%] left-[5%] h-[70%]`}>
                                        <video
                                            className="absolute top-0 left-0 w-full h-full object-cover"
                                            autoPlay
                                            loop
                                            muted={isMuted}
                                            playsInline
                                            >
                                            <source src="/videos/nav.mp4" type="video/mp4" />
                                            متصفحك لا يدعم الفيديو 
                                        </video>
                                        <div className=" absolute bottom-[20px] left-[20px]">
                                            <button className=" cursor-pointer text-white flex gap-3 items-center text-[10px] font-mono font-bold" onClick={() => {
                                                setIsMuted(!isMuted)
                                            }}>
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
                                    <div className={`${openCollections ? 'opacity-100 z-[2000]' : 'opacity-0 z-0'} nav-vid w-full h-[50%] py-5 top-[25%] left-0 absolute`}>
                                        <ul className="size-full font-mono font-bold text-[10px] flex flex-col justify-center text-white">
                                            <Link href={'/collections/pants'}><li className=" hover:bg-black ps-20 w-full py-3">PANTS</li></Link>
                                            <Link href={'/collections/tshirts'}><li className=" hover:bg-black ps-20 w-full py-3">T SHIRTS</li></Link>
                                            <Link href={'/collections/shoes'}><li className=" hover:bg-black ps-20 w-full py-3">SHOES</li></Link>
                                            <Link href={'/collections/shirts'}><li className=" hover:bg-black ps-20 w-full py-3">SHIRTS</li></Link>
                                            <Link href={'/collections/jackets'}><li className=" hover:bg-black ps-20 w-full py-3">JACKETS</li></Link>
                                            <Link href={'/collections/hoodies'}><li className=" hover:bg-black ps-20 w-full py-3">HOODIES</li></Link>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className=" w-[50%] h-full">
                                <ThreeDModel />
                                <div className=" absolute bottom-[20px] right-[20px]">
                                    <p className="text-[10px] font-bold flex gap-2 font-mono text-white"><GiMovementSensor /> 3D MODEL YOU CAN MOVE IT</p>
                                </div>
                            </div>
                        </div>
                        <div className={`w-[50%] flex items-center justify-center`}>
                            <Link href={'/'} >
                                <p className=" uppercase font-bold text-5xl">Bold & <br /> Worth</p>
                            </Link>
                        </div>
                    </div>
                    <div className="w-[50%] flex justify-end items-center">
                        <ul className="flex gap-1 text-[10px] items-center">
                            <li className="h-[100%] px-2">
                                {openSearch ? 
                                    <button type="button" className=" cursor-pointer" onClick={(() => {
                                        setOpenSearch(false)
                                    })}>CANCEL</button>
                                    :
                                    <input type="text" onClick={(() => {
                                        setOpenSearch(true)
                                    })} placeholder="SEARCH" className="py-2 focus:outline-0 placeholder:text-[8px] border-b-[1px] border-black placeholder:text-black" />
                                }
                            </li>
                            <li className="h-[100%] px-2"><button type="buuton" className=" cursor-pointer">LOG IN</button></li>
                            <li className="h-[100%] px-2"><Link className=" flex items-center gap-1" href={''}>Shopping bag <span className="font-sans">[ 0 ]</span></Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className={`flex bg-white justify-center items-center fixed left-0 w-screen min-h-screen transition-transform ${openSearch ? 'opacity-100 z-[500] top-0' : ' opacity-0 z-0 top-[-200%]'} `}>
                <div className=" w-[40%] border-b-[1px] border-black">
                    <input type="text" placeholder="WHAT ARE YOU LOOCKING FOR" className="py-2 text-[10px] w-full text-center focus:outline-0 placeholder:text-[10px] tracking-wide placeholder:text-black" />
                </div>
            </div>
        </header>
    )
}