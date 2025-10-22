'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiOutlineMinus } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeProduct, clearCart } from "../redux/slices/addProduct"; 

export default function ShoppingBag() {
    const cart = useSelector((state) => state.addProduct.cart);
    const dispatch = useDispatch();
    const [isClient, setIsClient] = useState(false);
    

    useEffect(() => {
        setIsClient(true);
    }, []);

    function handleCountItem(logic, itemId, itemSize) {
        const item = cart.find((el) => el.id === itemId && el.size === itemSize);
        if (!item) return;

        if (logic === "plus") {
            dispatch(updateQuantity({ id: itemId, size: itemSize, quantity: item.quantity + 1 }));
        } else if (logic === "minus") {
            if (item.quantity > 1) {
                dispatch(updateQuantity({ id: itemId, size: itemSize, quantity: item.quantity - 1 }));
            }
        }
    }

    if (!isClient) return null;

    
    const total = cart.reduce((acc, el) => acc + el.price * el.quantity, 0);

    return (
        <section>
            <div className="container m-auto pt-30">
                {cart.length > 0 ? (
                    <>
                        <div className="w-full mb-20 md:mb-0 flex flex-col gap-5 md:gap-0 xl:flex-row flex-wrap relative">
                            {cart.map((el, index) => (
                                <div key={index} className=" w-full xl:w-[50%] flex-col flex md:flex-row md:p-10 my-5 h-[700px] md:h-[500px] xl:h-[400px]">
                                    <div className="w-full md:w-[50%] py-5 px-10 md:px-5 h-[60%] md:h-full">
                                        <div className="size-full relative">
                                            <Image src={el.MainImage} fill alt={el.name} sizes="50vw" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center px-10 md:px-0 gap-4 w-full md:w-[50%] h-[40%] md:h-full uppercase">
                                        <h1 className="text-sm md:text-2xl">{el.name}</h1>

                                        <div className="w-full pb-5 border-b-[1px] border-black flex gap-5 items-center text-[10px] font-bold font-mono">
                                            <span className="line-through text-red-600">{el.originalPrice} $</span>
                                            <span className="h-[1px] w-[10px] bg-black"></span>
                                            <span>{(el.price * el.quantity).toFixed(0)} $</span>
                                        </div>

                                        <p className="text-[8px] text-black/50">{el.discription}</p>

                                        <div className="flex gap-5 text-[10px] font-bold font-mono items-center">
                                            <span>{el.category}</span>
                                            <span className="h-[20px] w-[1px] bg-black"></span>
                                            <span>{el.currency}</span>
                                            <span className="h-[20px] w-[1px] bg-black"></span>
                                            <span>
                                                selected size [{el.size}]{" "}
                                                <Link className="underline" href={`/details/${el.category}/${el.id}`}>
                                                    EDIT
                                                </Link>
                                            </span>
                                        </div>

                                        <div className="flex text-[10px] mt-5 font-bold font-mono items-center gap-5">
                                            <div className="w-[50%]">
                                                <button
                                                    className="cursor-pointer bg-black text-white py-2 w-full"
                                                    onClick={() => dispatch(removeProduct({ id: el.id, size: el.size }))}
                                                >
                                                    REMOVE
                                                </button>
                                            </div>
                                            <div className="w-[50%] flex justify-between items-center">
                                                <button
                                                    className="cursor-pointer p-2"
                                                    onClick={() => handleCountItem("minus", el.id, el.size)}
                                                >
                                                    <HiOutlineMinus size={15} />
                                                </button>
                                                <span className="p-2">{el.quantity}</span>
                                                <button
                                                    className="cursor-pointer p-2"
                                                    onClick={() => handleCountItem("plus", el.id, el.size)}
                                                >
                                                    <GoPlus size={15} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full gap-2 md:gap-5 fixed bottom-0 right-0 flex justify-between items-center p-5 bg-white">
                            <div className="w-[30%] xl:w-[70%]">
                                <Link href={'/checkout/user'}>
                                    <button className="py-2 w-full cursor-pointer uppercase bg-black text-white text-[8px] md:text-[10px] font-bold font-mono">
                                        check out
                                    </button>
                                </Link>
                            </div>
                            <div className="w-[40%] xl:w-[20%] bg-black text-white py-2 uppercase text-[8px] md:text-[10px] flex justify-center items-center gap-2 md:gap-5 font-bold font-mono">
                                <div className="hidden md:flex justify-center items-center gap-2">
                                    <span>{cart.length}</span>
                                    <span>pices</span>
                                </div>
                                <span className=" w-[1px] hidden md:flex h-[10px] bg-white"></span>
                                <div className="flex justify-center items-center gap-2">
                                    <p>total : </p>
                                    <span>{`[ ${total.toFixed(2)} $ ]`} </span>
                                </div>
                            </div>
                            <div className="w-[30%] xl:w-[10%]">
                                <button
                                    onClick={() => dispatch(clearCart())}
                                    className="py-2 w-full cursor-pointer px-2 md:px-5 text-[8px] md:text-[10px] font-bold font-mono bg-red-600 text-white"
                                >
                                    CLEAR YOUR BAG
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="h-screen w-full flex justify-center items-center text-[10px] font-bold font-mono">
                        <h1>YOUR BAG IS EMPTY</h1>
                    </div>
                )}
            </div>
        </section>
    );
}
