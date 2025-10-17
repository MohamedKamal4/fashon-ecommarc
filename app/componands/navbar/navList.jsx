import { GiMovementSensor } from "react-icons/gi"
import ThreeDModel from "../homePageComponands/heroSection/model"
import { FaMinus, FaPlus } from "react-icons/fa"
import Link from "next/link"
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5"
import { usePathname } from "next/navigation";
export default function NavList({openList , openCollections , setOpenCollections , setIsMuted , isMuted , setOpenList , btn}){
    const pathname = usePathname()
    return(
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
                            <li className={`${pathname === '/bestSellar' ? 'font-bold' : ''}`}><Link href={'/bestSellar'} onClick={(() => {
                                setOpenList(false)
                            })}>BEST SELLAR</Link></li>
                            <li className={`${pathname === '/new' ? 'font-bold' : ''}`}><Link href={'/new'} onClick={(() => {
                                setOpenList(false)
                            })}>NEW</Link></li>
                            <li className={`${pathname === '/sale' ? 'font-bold' : ''}`}><Link href={'/sale'} onClick={(() => {
                                setOpenList(false)
                            })}>SALE</Link></li>
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
                            {btn.map((el , index) => {
                                return(
                                    <Link key={index} href={`/collections/${el.pageName}`}><li onClick={(() => {
                                        setOpenList(false)
                                    })} className=" hover:bg-black ps-20 w-full py-3">{el.name}</li></Link>
                                )
                            })}
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
    )
} 