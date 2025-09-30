import SlideBigSale from "./slide"


export default async function BigSale(){
    const res = await fetch('http://localhost:5000/sale')
    const data = await res.json()

    return(
        <>
            <SlideBigSale data={data}/>
        </>
    )
}