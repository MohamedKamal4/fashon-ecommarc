import BtnList from "./btnList";
export const revalidate = 2592000;

export default async function New(){

    const res = await fetch('http://localhost:3000/api/data/collections' , {
        next: { revalidate: 2592000 },
    })

    if (!res.ok) throw new Error("Failed to fetch best sellers");

    const data = await res.json()
    
    const AllProducts = [...data.jackets , ...data.hoodies , ...data.pants]


    return(
       <>
        <BtnList data={data} AllProducts={AllProducts} />
       </>
    )
}