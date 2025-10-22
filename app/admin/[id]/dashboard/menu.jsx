'use client'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { logout } from "../../../redux/slices/loginSlice"
import { useDispatch } from "react-redux"
import Link from "next/link"

export default function MenuDashboard({openMenu , setOpenMenu , michroma , results , setResults}){
    const dispatch = useDispatch()

    const list = [
        {
            nameItem : 'statistics',
            result : 'statistics'
        },
        {
            nameItem : 'products',
            result : 'products'
        },
        {
            nameItem : 'users',
            result : 'users'
        },
        {
            nameItem : 'orders',
            result : 'orders'
        },
        {
            nameItem : 'collections',
            result : 'collections'
        },
    ]

    return(
       <div className={` ${openMenu ? 'left-0' : 'left-[-20%]'}  w-[20%] list h-screen fixed top-0 bg-black`}>
            <div className="w-full flex py-10 justify-center items-center">
                <Link href={'/'} >
                    <h1 className={` uppercase text-white font-bold text-xl md:text-4xl ${michroma.className}`}>Bold & <br /> Worth</h1>
                </Link>
            </div>
            <div className="text-[12px] font-bold font-mono  text-white w-full h-[50%] p-10">
                <ul className="flex flex-col gap-3 ">
                    {list.map((item , index) => {
                        return(
                            <li key={index} className={results === item.result ? 'bg-white text-black p-2' : ''}>
                                <button onClick={() => {
                                    setResults(item.result)
                                } } className="uppercase cursor-pointer">
                                    {item.nameItem}
                                </button>
                            </li>
                        )
                    })}
                    <li className=" w-full h-[1px] my-5 bg-white"></li>
                    <li className="uppercase">
                        <Link href={'/'} >
                            home
                        </Link>
                    </li>
                    <li>
                        <button onClick={(() => {
                            dispatch(logout())
                        })} className="cursor-pointer" >
                            <div className="uppercase">
                                <span>log out</span>
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
            <div role="button" onClick={() => {
                setOpenMenu(!openMenu)
            }} className=" absolute flex justify-center items-center cursor-pointer top-0 right-[-20px] h-full w-[20px] bg-black">
                {openMenu ?
                    <IoIosArrowBack color="white" />
                    :
                    <IoIosArrowForward color="white" />
                }
            </div>  
        </div>
    )
} 