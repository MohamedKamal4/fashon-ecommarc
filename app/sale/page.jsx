'use client'
import Card from '../componands/cards/card'
import Head from '../componands/pagesHead/head'
import BlackLine from '../componands/homePageComponands/more/blackLine'
import { useEffect, useState } from 'react';

export default function SalePage() {
    const [data , setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
            const res = await fetch(`${baseUrl}/api/data/sale` , {
                next: { revalidate: 2592000 }
            });
            const data = await res.json();
            setData(data)
        }
        fetchData()
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
