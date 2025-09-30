import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import BlackLine from "../../more/blackLine";
export default function SlideFour(){
    

    return(
        <div className=" container flex m-auto h-full">
            <div className="w-[40%] pt-20 ps-20">
                <div className="font-mono flex flex-col justify-center h-full text-black">
                    <h2 className="text-9xl font-bold uppercase pb-5">PANTS</h2>
                    <p className="text-[8px] pe-10 py-15">Step out in confidence with our latest jacket collection — where fashion meets functionality. Each jacket is crafted with premium fabrics to keep you warm and stylish through every season. From classic cuts to bold, modern designs, this collection offers the perfect layering piece for any occasion. Whether you’re heading to the office, exploring the city, or enjoying a casual night out, our jackets are designed to elevate your look and keep you comfortable all day long.</p>
                    <Link className="justify-start py-5 flex gap-2 text-[10px] font-mono font-bold items-center" href={''}>
                        DISCOVER <MdArrowOutward />
                    </Link>
                </div>
            </div>
            <div className="flex gap-2 overflow-hidden w-[60%] h-full pt-20 relative">
                <div className=" absolute top-[60%] left-0 z-20 w-screen">
                    <BlackLine title={'BIG SALE'}/>
                </div>
                <div className="w-[33.33%] h-full pb-30 pt-10">
                    <div className=" size-full relative">
                        <div className=" absolute top-[10px] left-[10px] bg-black z-10 rounded-md">
                            <p className="text-[8px] font-bold font-mono py-2 px-5 text-white">
                                FORMAL PANTS
                            </p>
                        </div>
                        <Image 
                            src={'/images/s1.jpg'}
                            fill
                            alt=""
                        />
                    </div>
                </div>
                <div className="w-[33.33%] h-full pt-30 pb-10">
                    <div className=" size-full relative">
                        <div className=" absolute top-[10px] left-[10px] bg-white z-10 rounded-md">
                            <p className="text-[8px] font-bold font-mono py-2 px-5 text-black">
                                CASUAL PANTS
                            </p>
                        </div>
                        <Image 
                            src={'/images/s2.jpg'}
                            fill
                            alt=""
                        />
                    </div>
                </div>
                <div className="w-[33.33%] h-full pb-30 pt-10">
                    <div className=" size-full relative">
                        <div className=" absolute top-[10px] left-[10px] bg-black z-10 rounded-md">
                            <p className="text-[8px] font-bold font-mono py-2 px-5 text-white">
                                SWEET PANTS
                            </p>
                        </div>
                        <Image 
                            src={'/images/s3.jpg'}
                            fill
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}