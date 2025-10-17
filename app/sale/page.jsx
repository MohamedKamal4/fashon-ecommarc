import Card from '../componands/cards/card'
import Head from '../componands/pagesHead/head'
import BlackLine from '../componands/homePageComponands/more/blackLine'
export const revalidate = 2592000; 

export default async function SalePage(){
    
    const res = await fetch('http://localhost:3000/api/data/sale' , {
        next: { revalidate: 2592000 },
    })
    
    if (!res.ok) throw new Error("Failed to fetch best sellers");

    const data = await res.json()

    return(
        <>
            <Head pageName={'sale'} />
            <section>
                <BlackLine title={'Sale'} />
                <div className=" container m-auto relative">
                    <Card data={data} sale={true} />                   
                </div>
            </section>
        </>
    )
}