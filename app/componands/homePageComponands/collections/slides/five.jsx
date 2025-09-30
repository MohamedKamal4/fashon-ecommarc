import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

export default function SlideFive(){

    return(
        <div className=" size-full flex pe-20">
            <div className=" w-[50%] h-full pt-20 ps-20">
                <h1 className="font-mono font-bold text-[200px]">SHIRTS</h1>
                <p className="text-[8px] pe-10 py-15">Elevate your wardrobe with our latest shirt collection – where sophistication meets versatility. Designed with premium fabrics and tailored for a flawless fit, these shirts are perfect for both workdays and weekends. Whether you prefer classic solids, modern patterns, or bold statement pieces, this collection offers endless ways to express your style. Stay sharp, stay confident, and make every outfit count.</p>
                <Link className="justify-start py-5 flex gap-2 text-[10px] font-mono font-bold items-center" href={''}>
                    DISCOVER <MdArrowOutward />
                </Link>
            </div>
            <div className=" w-[50%] h-full">
                <div className="w-full h-[100%]">
                    <div className="w-full h-[60%] flex justify-end">
                        <div className=" relative w-[50%] h-full">
                            <Image 
                                src={'/images/shirts1.jpg'}
                                fill
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="w-full flex h-[40%] ">
                        <div className=" w-[50%] h-full overflow-hidden relative">
                            <Image
                                className=" absolute top-[-100px] left-0"
                                src={'/images/shirts2.jpg'}
                                width={'500'}
                                height={'1280'}
                                alt=""
                            />
                        </div>
                        <div className="w-[50%] h-full flex items-center">
                            <ul className=" text-[10px] font-mono font-bold ps-20"> 
                                <li>- Formal</li> 
                                <li>- Casual</li> 
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}