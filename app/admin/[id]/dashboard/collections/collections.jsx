'use client'

import { useEffect, useState } from "react"
import { RequestData } from "./requestData"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
import Image from "next/image"
import Toest from "../../../../componands/toestMsg/toest"
import Loading from "../../../../componands/loadingCompnand/loading"
import Control from "../collections&productsControl/control"

export default function Collections({openMenu}){
    const [openList , setOpenList] = useState({
        sale : false ,
        bestSellers : false
    })
    const [screenMsg , setScreenMsg] = useState(null)
    const [screenIsLoading , setScreenIsLoading] = useState(false)
    const [apiData , setApiData] = useState({
        sale : [],
        bestSellers : []
    })
    
    useEffect(() => {
        const fetchData = async () => {
          const { saleData, bestSellerData } = await RequestData()
          setApiData({
            sale : saleData,
            bestSellers : bestSellerData
          })
        }
        fetchData()
    }, [])
    

    const collections = [
        'sale' ,
        'bestSellers'
    ]

    const content = (col) => (
        apiData[col].map((el , index) => {
            return(
                <div key={index} className={`${openMenu ? 'w-[33%]' : 'w-[25%]'} h-[500px] px-5 py-2`}>
                    <div className="size-full">
                        <div className="w-full h-[80%] relative">
                            <Image
                                src={el.MainImage}
                                alt=""
                                fill
                            />
                        </div>
                        <div className="w-full text-black h-[20%] py-2 flex flex-col">
                            <h4>{el.name}</h4>
                            <div className="flex gap-2">
                                <span>{el.price} $</span>
                                <span className="line-through text-red-600">
                                    {el.originalPrice} $
                                </span>
                            </div>
                            <Control product={el} setScreenIsLoading={setScreenIsLoading} setScreenMsg={setScreenMsg} apiData={apiData} setApiData={setApiData} />
                        </div>
                    </div>
                </div>
            )
        })
    )

    useEffect(() => {
        if (screenMsg) {
            const timer = setTimeout(() => setScreenMsg(null), 3000)
            return () => clearTimeout(timer)
        }
    }, [screenMsg])

    return(
        <>
            <div className="size-full flex flex-col gap-5">
                {collections.map((col , index) => {
                    return(
                        <div key={index} className="w-full p-5 text-white text-[10px] font-bold font-mono uppercase  bg-black">
                            <div className="w-full h-[300px] flex justify-center items-center">
                                <h1>{col}</h1>
                            </div>
                            <div className="w-full">
                                <button
                                onClick={() => {
                                    if(col === 'sale'){
                                        setOpenList({
                                            sale : !openList.sale ,
                                            bestSellers : false
                                        })
                                    }else{
                                        setOpenList({
                                            sale : false ,
                                            bestSellers : !openList.bestSellers
                                        })
                                    }
                                }}
                                className=" uppercase bg-white text-black px-5 cursor-pointer w-full py-2 flex justify-between items-center">
                                    details
                                    {openList[col] ?
                                        <IoMdArrowDropup />
                                        :
                                        <IoMdArrowDropdown />
                                    }
                                </button>
                            </div>
                            <div className={`${openList[col] ? 'flex flex-wrap' : 'hidden'} bg-white w-full p-5`}>
                                {content(col)}
                            </div>
                        </div>
                    )
                })}
                {screenIsLoading && <Loading />}
            </div>
            <Toest msg={screenMsg} />
        </>
    )
}