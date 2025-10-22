'use client'

import { useEffect, useState } from "react"
import BlackLine from "../componands/homePageComponands/more/blackLine";
import Head from "../componands/pagesHead/head";
import Card from '../componands/cards/card'

export default function BtnList({data , AllProducts}){
    const [newProducts , setNewProducts] = useState(AllProducts)
    const [productsName , setProductsName] = useState('all')
    const btns = [
        {
            value: 'all'
        },
        {
            value: 'jackets'
        },
        {
            value: 'pants'
        },
        {
            value: 'hoodies'
        },
    ]


    function handleProducts(productsName) {
        if(productsName === 'all'){
            setNewProducts(AllProducts)
        }else if (productsName === 'jackets') { 
            setNewProducts([...data.jackets])
        }else if (productsName === 'pants') { 
            setNewProducts([...data.pants])
        }else { 
            setNewProducts([...data.hoodies])
        }
    }

    return(
         <>
            <Head pageName="new" />
            <section>
                <BlackLine title="new" />
                <div className="container m-auto">
                    <div className="pt-30 md:pt-40 pb-10 sticky hover:bg-white w-full top-0 z-[1000]">
                        <ul className="flex gap-3 text-[12px] font-bold font-mono items-center justify-center md:justify-start">
                            {btns.map((btn) => {
                                return(
                                    <li key={btn.value}><button onClick={(() => {
                                        handleProducts(btn.value)
                                        setProductsName(btn.value)
                                    })} className={`${productsName === btn.value ? 'bg-black text-white' : ''} outline-0 border-0 uppercase cursor-pointer px-5 py-2`}>{btn.value}</button></li>
                                )
                            })

                            }
                        </ul>
                    </div>
                    <Card data={newProducts} newProducts={true} />
                </div>
            </section>
        </>
    )
}