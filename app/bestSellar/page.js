'use client'
import Card from "../componands/cards/card";
import Head from "../componands/pagesHead/head";
import BlackLine from "../componands/homePageComponands/more/blackLine";
import { useEffect, useState } from "react";
export const revalidate = 2592000;

export default function BestSellar() {
  const [data , setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/data/bestSellers` , {
        next: { revalidate: 2592000 },
      })
      const data = await res.json() 
      setData(data)
    }
    fetchData()
  },[])

  return (
    <>
      <Head pageName="bestSellar" />
      <section>
        <BlackLine title="best Sellar" />
        <div className="container m-auto">
          {data.length > 0 ? (
            <Card data={data} solded={true} />
          ) : (
            <p className="text-center text-gray-500 py-10">
              No best sellers available at the moment.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
