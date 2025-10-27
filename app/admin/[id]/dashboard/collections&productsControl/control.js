'use client'

import { useEffect, useState } from "react"
import { RequestData } from "./requestData"

export default function Control({ product , setScreenIsLoading , setScreenMsg , apiData , setApiData }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const [isIn, setIsIn] = useState({
    sale: false,
    bestSellers: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      const { saleData, bestSellerData } = await RequestData()

      const saleIds = saleData?.map(item => item.id) || []
      const bestSellerIds = bestSellerData?.map(item => item.id) || []

      setIsIn({
        sale: saleIds.includes(product.id),
        bestSellers: bestSellerIds.includes(product.id),
      })
    }

    fetchData()
  }, [product.id])


  const toggleCollection = async (col) => {
      try {
          setScreenIsLoading(true)

          const method = isIn[col] ? "DELETE" : "POST"

          const res = await fetch(`${baseUrl}/api/data/${col}`, {
              method,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(product),
          })

          if(!res.ok){
              setScreenMsg(<p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
                  error 
              </p>)
              return
          }
          setScreenIsLoading(false)

          {isIn[col] ?
            setApiData({...apiData , [col] : apiData[col].filter((el) => el.id !== product.id) })
            :
            setApiData({...apiData,[col]: [...apiData[col], product],});
          }

          setIsIn(prev => ({ ...prev, [col]: !prev[col] }))
          if(method === "POST"){
              setScreenMsg(<p className="px-10 py-3 text-[10px] font-bold font-mono bg-green-600 text-white uppercase">
                  successfully add product 
              </p>)
          }else{
              setScreenMsg(<p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
                  successfully remove product 
              </p>)
          }

          } catch (error) {
          console.error("Error updating collection:", error)
          setScreenMsg(<p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
              failed add product
          </p>)
          setScreenIsLoading(false)
      }
  }

  const collections = ["sale", "bestSellers"]

  return (
    <div className="py-5 flex w-full items-center ">
      <h6>collections :</h6>
      {collections.map((col, index) => (
        <button
        key={index}
        onClick={() => {
            toggleCollection(col)    
        }}
          className="flex items-center cursor-pointer gap-2 py-2 px-5 uppercase font-extrabold"
        >
          {col}
          <span className="w-[8px] mb-[2px] rounded-full p-[1px] h-[8px] border border-black flex justify-center items-center">
            {isIn[col] && (
              <span className="size-full rounded-full bg-black"></span>
            )}
          </span>
        </button>
      ))}
    </div>
  )
}
