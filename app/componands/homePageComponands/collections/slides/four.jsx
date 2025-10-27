import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
export default function SlideFour(){
    
    const images = [
        {
            src: '/images/s1.jpg' ,
            name : 'FORMAL PANTS'
        },
        {
            src: '/images/s2.jpg' ,
            name : 'CASUAL PANTS'
        },
        {
            src: '/images/s3.jpg' ,
            name : 'SWEET PANTS'
        }
    ]

    return(
        <div className=" container flex flex-col justify-center items-center m-auto h-screen">
            <div className="flex overflow-hidden w-[85%] h-[35%] xl:w-[60%] xl:h-[60%] relative">
                    {images.map((img , index) => {
                        return(
                            <div key={index} className="w-[33.33%] h-full">
                                <div className=" size-full relative">
                                    <div className=" absolute top-0 left-0 bg-black z-10 w-full flex justify-center items-center">
                                        <p className="text-[8px] uppercase font-bold font-mono py-2 px-2 md:px-5 text-white">
                                            {img.name}
                                        </p>
                                    </div>
                                    <Image 
                                        src={img.src}
                                        alt=""
                                        fill
                                        sizes="33.33vw"
                                    />
                                </div>
                            </div>
                        )
                    })}
                <Link href={'/collections/pants'} >
                    <div className=" absolute size-full top-0 left-0 bg-black/50 flex justify-center items-center">
                        <h2 className="font-bold uppercase text-[20px] xl:text-[100px] text-white">PANTS</h2>
                    </div>
                </Link> 
            </div>
            <div className="font-mono w-[85%] xl:w-[60%] flex flex-col gap-3 justify-center h-[20%] text-black">
                <p className="md:text-[8px] text-[5px]">Step out in confidence with our latest jacket collection — where fashion meets functionality. Each jacket is crafted with premium fabrics to keep you warm and stylish through every season. From classic cuts to bold, modern designs, this collection offers the perfect layering piece for any occasion. Whether you’re heading to the office, exploring the city, or enjoying a casual night out, our jackets are designed to elevate your look and keep you comfortable all day long.</p>
                <Link className="justify-start flex gap-2 md:text-[8px] text-[5px] font-mono font-bold items-center" href={'/collections/pants'}>
                    DISCOVER <MdArrowOutward />
                </Link>
            </div>
        </div>
    )
}