import Image from "next/image";

export default function SlideFour(){

    return(
        <div className=" size-full flex">
            <div className="size-full relative">
                <Image 
                    src={'/images/bg.jpg'}
                    fill
                    alt=""
                    className=" grayscale-100"
                />
            </div>
        </div>
    )
}