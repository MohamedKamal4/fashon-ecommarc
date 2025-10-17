'use client'
import Image from "next/image"
import { useEffect, useState } from "react"
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { Caveat } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../../redux/slices/addProduct";
import FavBtn from "../../../componands/favBtn/btn";
import Toest from "../../../componands/toestMsg/toest";

const dancingScript = Caveat ({
  subsets: ["latin"],
  weight: ["400"],
});

export default function ProductDetails({data , productCategoryName}){
    const [sizes , setSizes] = useState('SIZE')
    const [openList , setOpenList] = useState(false)
    const cart = useSelector((state) => state.addProduct.cart)
    const [msg , setMsg] = useState(null)
    const isAuth = useSelector((state) => state.login.isAuthenticated);
    const [isClient , setIsClient] = useState(false)
    const dispatch = useDispatch() 
    const phrases = [
        "Style is not just about the clothes you wear; it’s the confidence you carry with every step, proving that true elegance begins from within.",
        "Every outfit you choose is a reflection of your identity, a silent statement that tells the world who you are without a single word.",
        "A well-dressed man doesn’t just follow trends; he creates a timeless presence that people remember long after he’s gone.",
        "Fashion is more than fabric stitched together; it is the art of shaping first impressions and leaving a lasting mark.",
        "Your wardrobe is your personal gallery, each piece chosen with purpose to express character, confidence, and ambition.",
        "Clothing is not about covering the body—it’s about revealing the personality, values, and elegance of the man wearing it.",
        "True style is not measured by price tags, but by how effortlessly your outfit aligns with your energy and individuality.",
        "Confidence grows when you know you look sharp; the right suit, jacket, or shirt can turn ordinary moments into extraordinary ones.",
        "Every detail in your outfit, from shoes to accessories, builds a complete story that defines your unique version of masculinity.",
        "Dressing well is a daily reminder that you respect yourself and value the way the world perceives you."
    ];
    const getRandomPhrase = () => phrases[Math.floor(Math.random() * phrases.length)];
    const [quote, setQuote] = useState(getRandomPhrase());
    
    function handleAddProduct(product, size) {
        if(size === 'SIZE') {
            return setMsg(<p className=" px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">please chosse size</p>)
        } 
        const find = cart.some((el) => el.id === product.id && el.size === size);
        if (!find) {
            dispatch(addProduct({ size, ...product }));
            setMsg(<p className=" px-10 py-3 text-[10px] font-bold font-mono bg-green-600 text-white uppercase">ADDED PRODUCT</p>)
        } else {
            dispatch(removeProduct({ id: product.id, size }));
            setMsg(<p className=" px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">REMOVED PRODUCT</p>)
        }
    }
    
    
    useEffect(() => {
        if (msg) {
            const timer = setTimeout(() => setMsg(null), 3000)
            return () => clearTimeout(timer)
        }
    }, [msg])

    useEffect(() => {
        setIsClient(true)
    }, [])
    

    if(!isClient) return null


    return(
        <section className=" relative">
            <div className=" container m-auto">
                {data &&
                    data.images.map((img , index) => {
                        return(
                            <div key={index} className={`w-full flex ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                                <div className=" w-[50%]">
                                    <Image 
                                        src={img}
                                        alt=""
                                        width={800}
                                        height={1280}
                                        priority
                                    />
                                </div>
                                <div className="flex pt-50 w-[50%]">
                                    {index % 2 === 0 ? 
                                        <div className="w-full flex flex-col gap-10 px-20">
                                            <div className="py-5 border-b-[1px] border-black flex flex-col gap-3">
                                                <div className=" w-full flex justify-between items-center">
                                                    {productCategoryName === 'tshirts' ?
                                                        <span className=" text-[10px] tracking-[2px] font-bold font-mono">SALE</span>
                                                        :
                                                        productCategoryName === 'jackets' || productCategoryName === 'hoodies' ?
                                                            <span className=" text-[10px] tracking-[2px] font-bold font-mono">WINTER 2026</span>
                                                            :
                                                            <span className=" text-[10px] tracking-[2px] font-bold font-mono">NEW</span>
                                                    }
                                                    <div>
                                                        {isAuth &&
                                                            <FavBtn element={data} setMsg={setMsg} />
                                                        }
                                                    </div>
                                                </div>
                                                <h1 className=" uppercase text-xl font-bold font-mono">
                                                    {data.name}
                                                </h1>
                                                <div className="text-[10px] font-bold font-mono flex items-center gap-5">
                                                    <span className=" line-through text-red-600"> {data.originalPrice} $</span>
                                                    <span>-</span>
                                                    <span> {data.price} $</span>
                                                </div>
                                            </div>
                                            <div className="text-[10px] font-bold font-mono flex justify-between items-center gap-5">
                                                <span> {data.currency} </span>
                                                <span className=" w-[1px] h-[20px] bg-black"></span>
                                                <span> {data.soldCount} SOLDED </span>
                                                <span className=" w-[1px] h-[20px] bg-black"></span>
                                                <div className="w-[25%] relative">
                                                    <button onClick={() => {
                                                        setOpenList(!openList)
                                                    }} className="bg-white z-50 flex justify-between items-center text-[10px] font-bold font-mono pb-2 w-full cursor-pointer border-b-[1px] border-black">
                                                        {sizes}
                                                        {openList ?
                                                            <IoMdArrowDropup />
                                                            :
                                                            <IoMdArrowDropdown />
                                                        }
                                                    </button>

                                                    <ul className={` absolute ${openList ? 'top-[30px]' : 'top-[-1500%] opacity-0'}  bg-white border-[1px] border-black z-50 transition-transform left-0 w-full flex flex-col justify-center`}>
                                                        {data.sizes.map((btn , index) => {
                                                            return(
                                                                <li key={index}>
                                                                    <button onClick={(() => {
                                                                        setSizes(btn)
                                                                        setOpenList(false)
                                                                    })} className="text-[10px] px-3 py-2 w-full cursor-pointer text-black font-bold font-mono">{btn}</button>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className=" flex w-full items-end gap-5">
                                                <button onClick={(() => {
                                                    handleAddProduct(data , sizes)
                                                })} className=" text-[10px] cursor-pointer w-[100%] py-2 bg-black text-white">
                                                    {cart.some((item) => item.id === data.id && item.size === sizes) ?
                                                        'REMOVE'
                                                        :
                                                        'ADD'
                                                    }
                                                </button>
                                            </div>
                                            <div className=" text-[10px] text-black/60 font-bold font-mono">
                                                <p className="pb-5">{data.discription}</p>
                                                <p className="py-1">Product Measurements</p>
                                                <p className="py-1">Composition & care</p>
                                                <p className="py-1">Check in-store availability</p>
                                                <p className="py-1">SHIPPING, EXCHANGES AND RETURNS</p>
                                            </div>
                                        </div>
                                        :
                                        <div className="size-full flex flex-col pb-20 justify-between">
                                            <div className="w-full px-50 h-[50%]">
                                                <div className="size-full relative">
                                                    <Image 
                                                        src={data.MainImage}
                                                        alt=""
                                                        fill
                                                        sizes="50vw"
                                                    />
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <p className={` text-[25px] font-bold ${dancingScript.className}`}>
                                                    {quote}
                                                </p>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Toest msg={msg} />
        </section>
    )
}