import Image from "next/image";

export default function SlideThree(){

    return(
        <div className=" size-full flex relative">
            <Image 
                src={'/images/win1.jpg'}
                fill
                alt=""
                className="grayscale-100"
            />
            <div className="size-full bg-black/50 backdrop-blur-xs relative flex justify-start items-center">
                <div className=" text-white text-[10px] ps-20 w-[50%] font-bold font-mono flex flex-col gap-2 ">
                    <h1 className=" font-extrabold text-[15px]">WINTER IS COMING BE REDY WITH OUR COLLECTIONS</h1>
                    <p> The <span className=" font-extrabold">BOLD & WORTH </span>Winter 2026 Collection is where modern design meets timeless elegance.
                    This season, we’ve taken inspiration from the raw beauty of snowy peaks and the calm of winter nights, bringing you pieces that are warm, versatile, and unapologetically bold.

                    From oversized coats and tailored wool jackets to premium knitwear and statement accessories, every piece is crafted to keep you comfortable without compromising on style.
                    Neutral tones blend with deep, dramatic colors for a sophisticated winter palette — perfect for layering and expressing your individuality.

                    This is more than just a collection; it’s an invitation to own the season with confidence, elegance, and a touch of fearless attitude.</p>
                </div>
                <span className="text-white text-[10px] font-bold font-mono absolute bottom-[50px] right-[50px]">"Step into the cold season with confidence."</span>
            </div>
        </div>
    )
}