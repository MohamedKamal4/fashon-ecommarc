'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductsGrid from "../../../componands/cards/card";
import BlackLine from "../../../componands/homePageComponands/more/blackLine";
import Head from "../../../componands/pagesHead/head";
import { clearFavoriteList } from "../../../redux/slices/favoriteList";

export default function FavoriteList(){
    const favoriteList = useSelector((state) => state.favoriteList.favoriteList);
    const [isclient , setisclient] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setisclient(true)
    },[])

    if(!isclient) return null

    return(
           <>
                <Head pageName={'favoriteList'} />
                <section>
                    <BlackLine title={'favorite List'} />
                    <div className=" container m-auto relative">
                        {favoriteList.length > 0 ?
                            <>
                                <ProductsGrid data={favoriteList} />
                                <div className=" fixed bottom-[20px] z-50 right-[20px]">
                                    <button onClick={(() => {
                                        dispatch(clearFavoriteList())
                                    })} className="py-2 cursor-pointer px-5 text-[10px] font-bold font-mono bg-black text-white">CLEAR FAVORITE LIST</button>
                                </div>
                            </>
                            :
                            <div className="h-screen w-full flex justify-center items-center text-[10px] font-bold font-mono">
                                <h1>
                                    YOUR FAVORITE LIST IS EMTY
                                </h1>
                            </div>
                        }
                    </div>
                </section>
           </>
    )
}