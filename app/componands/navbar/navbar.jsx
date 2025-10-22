'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SearchWindow from "./searchWindow";
import NavList from "./navList";
import LogIn from "./login";
import { useSelector } from "react-redux"
import { MdPerson } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { logout } from "../../redux/slices/loginSlice"
import { useDispatch } from "react-redux"
import { setLogo  } from "../../redux/slices/changeLogo";
import { usePathname } from "next/navigation";
import { IoBagOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { clearFavoriteList } from "../../redux/slices/favoriteList";


export default function Navbar({ className }){
    const [openList , setOpenList] = useState(false)
    const [openLogin , setOpenLogin] = useState(false)
    const [mounted, setMounted] = useState(false);
    const [isMuted , setIsMuted] = useState(true)
    const [openCollections , setOpenCollections] = useState(false)
    const [openSearch , setOpenSearch] = useState(false)
    const [openProfileList , setOpenProfileList] = useState(false)
    const user = useSelector((stata) => stata.login.data)
    const isAuth = useSelector((state) => state.login.isAuthenticated)
    const cart = useSelector((state) => state.addProduct.cart);
    const favoriteList = useSelector((state) => state.favoriteList.favoriteList);
    const changeLogo = useSelector((state) => state.isChange.changeLogo);
    const dispatch = useDispatch()
    const pathname = usePathname()
  
    useEffect(() => {
        if(pathname !== '/'){
            dispatch(setLogo(false))
        }
    }, [pathname]);
  
    const btn = [
        {
            name: 'PANTS',
            pageName: 'pants'
        },
        {
            name: 'T SHIRTS',
            pageName: 'tshirts'
        },
        {
            name: 'SHOES',
            pageName: 'shoes'
        },
        {
            name: 'SHIRTS',
            pageName: 'shirts'
        },
        {
            name: 'JACKETS',
            pageName: 'jackets'
        },
        {
            name: 'HOODIES',
            pageName: 'hoodies'
        },
    ]

    useEffect(() => {
        AOS.init({
        duration: 1000, 
        once: true,     
        });
        setMounted(true); 
    }, []);

    if (!mounted) return null; 

    return(
        <>
            {pathname !== '/admin/1/dashboard' && 
                <>
                    <header>
                        <nav className={` fixed left-0 top-0 w-full z-[3000] ${openProfileList ? 'bg-white' : ''} navbar`}>
                            <div data-aos='fade-down' className={`${className} px-2 xl:px-10 relative z-[1000] py-5 flex justify-between items-center`}>
                                <div className={`w-[50%] xl:w-[50%] flex gap-3 xl:gap-10 items-center`}>
                                    <div className=" h-[30px] w-[20%] md:h-[40px] md:w-[20%] xl:w-[10%]">
                                        <button
                                            onClick={() => {setOpenList(!openList)
                                                setIsMuted(true)
                                            }}
                                            className="size-full relative focus:outline-0 flex flex-col justify-around cursor-pointer "
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
                                    
                                    <div className={`w-[70%] md:w-[80%] xl:pe-20 flex items-center justify-center`}>
                                        <Link href={'/'} >
                                            {changeLogo ?
                                                <div  className="xl:py-5 md:ps-20">
                                                    <span className="text-[5px] w-full flex uppercase">bold & worth</span>
                                                    <p className=" uppercase font-bold text-sm md:text-5xl">the new</p>
                                                </div>
                                                :
                                                <p className=" uppercase font-bold text-xl md:text-5xl">Bold & <br /> Worth</p>
                                            }
                                        </Link>
                                    </div>
                                </div>
        
                                <div className="w-[50%] xl:w-[50%]">
                                    <ul className="flex w-full h-full justify-end gap-4 text-[10px] items-center">
                                        <li className="md:flex hidden justify-center items-center">
                                            {openSearch ? 
                                                <button type="button" className="text-[10px] cursor-pointer" onClick={(() => {
                                                    setOpenSearch(false)
                                                })}>CANCEL</button>
                                                :
                                                <button type="button" className="text-[10px] md:pe-20 md:py-2 md:border-b-[1px] md:cursor-text md:border-black uppercase cursor-pointer" onClick={(() => {
                                                    setOpenSearch(true)
                                                })}>search</button>
                                            }
                                        </li>
                                        <li className="flex justify-center items-center">
                                            {isAuth ?
                                                user.username === 'admin' ?
                                                    <Link href={`/admin/${user?.id}/dashboard`} >
                                                        DASHBOARD
                                                    </Link>
                                                    :
                                                    <button onClick={(() => {
                                                        setOpenProfileList(!openProfileList)
                                                    })} className="cursor-pointer">
                                                        {openProfileList ? 
                                                            <IoIosClose size={20} /> 
                                                            :
                                                            <MdPerson size={15} />
                                                        }
                                                    </button>
                                                    :
                                                <button onClick={(() => {
                                                    setOpenLogin(true)
                                                })} type="buuton" className="text-[8px] md:text-[10px] cursor-pointer">LOG IN</button>
                                            }
                                        </li>
                                        <li className="flex md:hidden justify-center items-center">
                                            {openSearch ? 
                                                <button type="button" className="uppercase text-[8px] cursor-pointer" onClick={(() => {
                                                    setOpenSearch(false)
                                                })}>cancel</button>
                                                :
                                                <button type="button" className="text-[8px] md:pe-20 md:py-2 md:border-b-[1px] md:cursor-text md:border-black uppercase cursor-pointer" onClick={(() => {
                                                    setOpenSearch(true)
                                                })}><CiSearch size={15} /></button>
                                            }
                                        </li>
                                        {(isAuth && user.username === 'admin') ?
                                            <button onClick={(() => {
                                                dispatch(logout())
                                                setOpenProfileList(false)
                                            })} className="cursor-pointer" >
                                                <div className="uppercase">
                                                    <span>log out</span>
                                                </div>
                                            </button>
                                            :
                                            <>
                                                <li className="hidden md:flex"><Link className=" flex items-center gap-1 text-[10px] uppercase" href={'/ShoppingBag'}>Shopping bag <span className="font-sans">{`[ ${cart.length} ]`}</span></Link></li>
                                                <li className="flex md:hidden"><Link className=" flex items-center gap-1 text-[10px] uppercase" href={'/ShoppingBag'}><IoBagOutline size={13} /> <span className="font-sans">{`[ ${cart.length} ]`}</span></Link></li>
                                            </>
                                        }
                                    </ul>
                                </div>
                            </div>
                            {isAuth &&
                                <div className={`absolute top-0 pt-[140px] transition-[10s] ${openProfileList ? 'right-0' : 'right-[-420px] z-[-5] opacity-0'} bg-white w-[420px] h-screen`}>
                                    <Link href={'/new'} >            
                                        <div className="p-5 flex flex-col justify-center items-center w-full h-[60%]">
                                            <div className="w-[50%] h-[90%] relative ">
                                                <video
                                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                                    autoPlay
                                                    loop
                                                    muted={true}
                                                    playsInline
                                                    >
                                                    <source src="/videos/new.mp4" type="video/mp4" />
                                                    متصفحك لا يدعم الفيديو 
                                                </video>
                                            </div>
                                            <div className="w-[50%] h-[10%] font-bold font-mono text-[10px] flex items-center">
                                                <p>DISCOVER OUR NEW COLLECTIONS</p>
                                            </div>
                                        </div>
                                    </Link>    
                                    <ul className="w-full h-[40%] py-5">
                                        <li className=" uppercase flex pb-5 gap-3 items-center text-[10px] font-bold font-mono text-black px-10">
                                            <div className="border-[1px] bg-white text-[6px] flex flex-col justify-center items-center border-black relative w-[30px] h-[30px]">
                                                <span>BOLD &</span>
                                                <span>WORTH</span>
                                            </div>
                                            <div>
                                                <h2>{user.name}</h2>
                                                <h3>@ {user.username}</h3>
                                            </div>
                                        </li>
                                        <li className="w-full uppercase flex gap-3 py-2 items-center text-[10px] font-bold font-mono text-black px-10">
                                            <Link className="size-full" href={`/favoriteList/${user.username}/${user.id}`}>
                                                <div className="size-full flex justify-between items-center">
                                                    <div className=" flex items-center gap-5">
                                                        <span>favorites list</span>
                                                        <span>{`[ ${favoriteList.length} ]`}</span>
                                                    </div>
                                                    <FaArrowRightLong />
                                                </div>
                                            </Link>
                                        </li>
                                        <li className="w-full uppercase flex gap-3 py-2 items-center text-[10px] font-bold font-mono text-black px-10">
                                            <Link className="size-full" href={`/orders/${user.username}/${user.id}`}>
                                                <div className="size-full flex justify-between items-center">
                                                    <span>my orders</span>
                                                    <FaArrowRightLong />
                                                </div>
                                            </Link>
                                        </li>
                                        <li className="w-full flex gap-3 py-5 items-center text-[10px] font-bold font-mono text-black px-10">
                                            <button onClick={(() => {
                                                dispatch(logout() , clearFavoriteList())
                                                setOpenProfileList(false)
                                            })} className="size-full cursor-pointer" >
                                                <div className="size-full uppercase flex justify-between items-center">
                                                    <span>log out</span>
                                                    <IoIosLogOut />
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </nav>
                    </header>
                    <NavList className={className} openList={openList}  openCollections={openCollections}  setOpenCollections={setOpenCollections}  setIsMuted={setIsMuted}  isMuted={isMuted}  setOpenList={setOpenList}  btn={btn} /> 
                    <LogIn openLogin={openLogin} setOpenLogin={setOpenLogin} />
                    <SearchWindow openSearch={openSearch} setOpenSearch={setOpenSearch} />
                </>
            }
        </>
    )
}