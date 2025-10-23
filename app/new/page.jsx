'use client'
import { useEffect, useState } from "react";
import BtnList from "./btnList";

export default function New() {
    const [data , setData] = useState([])
    const [AllProducts , setAllProducts] = useState([])
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    useEffect(() => {
        fetch(`${baseUrl}/api/data/collections`)
        .then((res) => res.json)
        .then((res) => {
          setData(res)
          setAllProducts([...res.pants , ...res.jackets , ...res.hoodies])
        })
    },[])

  return <BtnList data={data} AllProducts={AllProducts} />
}
