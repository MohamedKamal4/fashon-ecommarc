'use client'
import Card from '../componands/cards/card'
import Head from '../componands/pagesHead/head'
import BlackLine from '../componands/homePageComponands/more/blackLine'
import { useEffect, useState } from 'react';

export default function SalePage() {
    const [data , setData] = useState([])
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    useEffect(() => {
        fetch(`${baseUrl}/api/data/sale`)
        .then((res) => res.json())
        .then((res) => {
            setData(res)
        })
    },[])
    return (
        <>
            <Head pageName={'sale'} />
            <section>
                <BlackLine title={'Sale'} />
                <div className="container m-auto relative">
                    <Card data={data} sale={true} />
                </div>
            </section>
        </>
    );
}
