'use client'
import { usePathname } from "next/navigation"

export default function Footer(){
    const pathname = usePathname()

    return(
        <>
            {pathname !== '/checkout/user' && pathname !== '/ShoppingBag' && pathname !== '/success'  &&
                <footer>
                    <div className="container m-auto flex justify-center items-center">
                        <div className="w-[50%] text-[10px] font-bold font-mono flex flex-col justify-center items-center gap-5 py-20">
                            <p className=" font-extrabold">JOIN OUR NEWSLETTER</p>
                            <ul className=" flex w-full justify-between items-center px-20">
                                <li>TIKTOK</li>
                                <li>INSTAGRAM</li> 
                                <li>FACEBOOK</li>
                                <li>X</li>
                                <li>PINTEREST</li>
                                <li>YOUTUBE</li>
                                <li>LINKEDIN</li>
                            </ul>
                            <ul className=" flex w-[60%] justify-between items-center px-15">
                                <li>COOKIES SETTINGS</li>
                                <li>PRIVACY</li>
                                <li>TERMS OF USE</li>
                            </ul>
                        </div>
                    </div>
                </footer>
            }
        </>
    )
}