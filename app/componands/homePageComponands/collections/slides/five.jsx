import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

export default function SlideFive(){

    return(
        <div className="container m-auto flex h-screen items-center justify-center ">
            <div className="w-[85%] md:w-[70%] xl:w-[30%] h-full">
                <Link href={'/collections/shirts'} >
                    <div className=" relative h-[60%] xl:h-[70%] w-full">
                        <Image 
                            src={'/images/shirts1.jpg'}
                            fill
                            alt=""
                            sizes="30vw"
                        />
                        <div className="size-full absolute top-0 left-0 bg-black/50 text-white flex justify-center items-center">
                            <h1 className="font-mono font-bold text-[20px] xl:text-[100px]">SHIRTS</h1> 
                        </div>
                    </div>
                </Link>
                <div className=" w-full h-[20%] pt-5">
                    <p className="md:text-[8px] text-[5px]">Elevate your wardrobe with our latest shirt collection – where sophistication meets versatility. Designed with premium fabrics and tailored for a flawless fit, these shirts are perfect for both workdays and weekends. Whether you prefer classic solids, modern patterns, or bold statement pieces, this collection offers endless ways to express your style. Stay sharp, stay confident, and make every outfit count.</p>
                    <div className="w-full flex justify-between items-center">
                        <ul className=" md:text-[8px] text-[5px] flex items-center gap-3 font-mono font-bold"> 
                            <li>Formal</li> 
                            <span className='w-[10px] h-[1px] bg-black'></span>
                            <li>Casual</li> 
                        </ul>
                        <Link className="justify-start py-5 flex gap-2 md:text-[8px] text-[5px] font-mono font-bold items-center" href={'/collections/shirts'}>
                            DISCOVER <MdArrowOutward />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}