import Image from "next/image"
import { deleteProducts } from './deleteProducts'
import Control from '../collections&productsControl/control'


export function detailsAndAdd (
    productDetails ,
    setScreenIsLoading ,
    setScreenMsg ,
    setProductDetails ,
    setAllData ,
    handleEditProductBtn
) {
    return(
        <div className="w-full h-full relative flex">
            <div className="w-[60%] h-full">
                {productDetails.data?.images && (
                    <div className="w-full flex h-screen bg-gray-50">
                        {productDetails.data.images?.map((img , index) => {
                            return(
                                <div key={index} className="relative w-[50%] h-full">
                                    <Image
                                        src={img}
                                        alt="Main Image"
                                        fill
                                        sizes="50vw"
                                        className="object-cover"
                                    />
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
    
            <div className="w-[40%] text-[10px] font-bold font-mono uppercase h-full pt-20 px-5">
                <div className="w-full h-[50%] flex">
                    <div className=" w-[50%] h-full">
                        <div className="w-full h-full relative">
                            {(productDetails.data.MainImage) &&
                                <Image
                                    src={
                                        productDetails.data?.MainImage
                                    }
                                    alt="Main Image"
                                    fill
                                    sizes="40vw"
                                    className="object-cover"
                                />
                            }
                        </div>
                    </div>
                    <div className="w-[50%] flex flex-col justify-center ps-10 gap-2 h-full">
                        <span>quantity : {productDetails.data.quantity}</span>
                        <span>price : {productDetails.data.price} $</span>
                        <span className="text-red-600 line-through">
                            originalPrice : {productDetails.data.originalPrice} $
                        </span>
                        <span>currency : {productDetails.data.currency}</span>
                        <span>soldCount : {productDetails.data.soldCount}</span>
    
                        <div className="flex items-center gap-3">
                            <span>sizes :</span>
                            <ul className="flex items-center gap-2">
                                {productDetails.data.sizes?.map((el, i) => (
                                    <li key={i}>{el}</li>
                                ))}
                            </ul>
                        </div>
    
                        <span>inStock : {productDetails.data.inStock ? "yes" : "no"}</span>
                        <span>category : {productDetails.data.category}</span>
                    </div>
                </div>
    
                <div className="py-10 w-full flex flex-col h-[50%]">
                    <div className="w-full flex justify-end flex-col gap-3 h-full">
                        <h1>name : {productDetails.data.name}</h1>
                        <p>description : {productDetails.data.discription}</p>
                    </div>
                    <div className="w-full h-full flex items-end justify-end">
                        <div className="pb-10 w-full">
                            <Control product={productDetails.data} setScreenIsLoading={setScreenIsLoading} setScreenMsg={setScreenMsg} collectionsState={false} />
                            <button
                                onClick={() => {
                                    deleteProducts(productDetails, setProductDetails, setScreenMsg, setAllData , setScreenIsLoading)
                                }}
                                className="w-full bg-red-600 cursor-pointer text-white uppercase px-10 py-2"
                            >
                                delete product
                            </button>
                            <button
                                onClick={() => {
                                    handleEditProductBtn(productDetails.data)
                                }}
                                className="w-full mt-2 bg-black cursor-pointer text-white uppercase px-10 py-2"
                            >
                                edit product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}