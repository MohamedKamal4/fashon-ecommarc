import dynamic from "next/dynamic"
import { Suspense } from "react"
import Loading from '../../../componands/loadingCompnand/loading'
const ProductDetails = dynamic(() => import("./details"))
const SimilerData = dynamic(() => import("./similer"))

export default async function Details({ params }){
    const {id , productCategoryName} = await params
    const res = await fetch(`http://localhost:3000/api/data/collections`)
    const data = await res.json()

    return(
        <>
            <Suspense fallback={<Loading />}>
                <ProductDetails data={data[productCategoryName]} id={id} productCategoryName={productCategoryName} />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <SimilerData id={id} productCategoryName={productCategoryName} />
            </Suspense>
        </>
    )
}