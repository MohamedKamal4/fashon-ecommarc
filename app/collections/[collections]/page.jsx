'use client'

import { useParams } from "next/navigation"
import HeadCollectionPage from "./head"
import { useEffect, useState } from "react"
import Card from "../../componands/cards/card"

export default function CollectionPage(){
    const {collections} = useParams()
    const [data , setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/collections')
        .then((res) => res.json())
        .then((res) => {
            setData(res[collections])
        })
    },[])
    

    return(
       <section>
            <div className=" container m-auto relative ">
                <HeadCollectionPage collections={collections} />
                {collections === 'pants' || collections === 'shoes' ?
                    <div className="pb-5 pt-35 sticky top-0 hover:bg-white left-0 z-50">
                        <ul className="border-b-[1px] border-black/50 flex items-center text-[11px] font-bold font-mono">
                            <li><button className="px-5 cursor-pointer py-5">ALL</button></li>
                            <li><button className="px-5 cursor-pointer py-5">CASUAL</button></li>
                            <li><button className="px-5 cursor-pointer py-5">FORMAL</button></li>
                            {collections === 'pants' &&
                                <li><button className="px-5 cursor-pointer py-5">SPORTS</button></li>
                            }
                        </ul>
                    </div>
                    :
                    null
                }

                <Card data={data} collections={collections} />
            </div>
       </section>
    )
}