'use client'
import { useEffect, useState } from "react"
import Toest from "../../../../componands/toestMsg/toest"
import { detailsAndAdd } from './deleteProductLayout'
import { AddProduct } from './add&editProductLayout'
import Loading from '../../../../componands/loadingCompnand/loading' 
export default function DeleteDetailsAdd({
    productDetails,
    setProductDetails,
    setAllData,
    michroma 
}) {
    const [screenMsg , setScreenMsg] = useState(null)
    const [screenIsLoading , setScreenIsLoading] = useState(false)
    const [newSizes, setNewSizes] = useState([])
    const [isEdit , setIsEdit] = useState(false)
    const [image, setImage] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        discription: '',
        price: 0,
        originalPrice: 0,
        quantity: 0,
        sizes: [],
        category: '',
        images: {
            first: '',
            second: ''
        },
        MainImage: ''
    })

    useEffect(() => {
        if (screenMsg) {
            const timer = setTimeout(() => setScreenMsg(null), 3000)
            return () => clearTimeout(timer)
        }
    }, [screenMsg])

    
    useEffect(() => {
        setFormData(prev => ({ ...prev, sizes: newSizes }))
    }, [newSizes])

    function handleEditProductBtn(product){
        setIsEdit(true)
        setFormData({
            name: product.name,
            discription: product.discription ,
            price: product.price,
            originalPrice: product.originalPrice,
            quantity: product.quantity,
            sizes: product.sizes,
            category: product.category,
            images:{
                first: product.images[0],
                second: product.images[1]
            },
            MainImage: product.MainImage
        })
        setNewSizes(product.sizes)
        setImage(product.MainImage)
        setProductDetails({ page: 'add' , state: true , data: product })
    }

    return (
        <>
            <div className={`fixed ${productDetails.state ? "opacity-100 z-[2000]" : "opacity-0 z-[-1]"} flex top-0 left-0 bg-white h-screen w-full`}>
                {productDetails.page === 'details&add' && detailsAndAdd( productDetails , setScreenIsLoading , setScreenMsg , setProductDetails , setAllData , handleEditProductBtn)}
                {productDetails.page === 'add' && AddProduct(michroma , formData , setFormData , image , setImage , productDetails , setScreenIsLoading , setScreenMsg , setAllData , newSizes , isEdit , setProductDetails , setNewSizes)}

                <div className="absolute top-[30px] right-[30px]">
                    <button
                        className="z-[5000] cursor-pointer w-[50px] h-[50px] flex flex-col justify-around relative"
                        onClick={() => {
                            setProductDetails({ data: {} , state: false , page: '' })
                            setIsEdit(false)
                            setFormData({
                                name: '',
                                discription: '',
                                price: 0,
                                originalPrice: 0,
                                quantity: 0,
                                sizes: [],
                                category: '',
                                images: {
                                    first: '',
                                    second: ''
                                },
                                MainImage: ''
                            })
                        }}
                    >
                        <span className="w-full h-[1px] translate-y-[5px] rotate-45 bg-black"></span>
                        <span className="w-full h-[1px] -translate-y-[20px] -rotate-45 bg-black"></span>
                    </button>
                </div>
                {screenIsLoading && 
                    <div className=" absolute top-0 left-0 z-[5000] bg-amber-500 size-full">
                        <Loading />
                    </div>
                }
                <Toest msg={screenMsg} />
            </div>
        </>
    )
}
