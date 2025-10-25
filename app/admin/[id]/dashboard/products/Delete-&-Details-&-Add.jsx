'use client'
import Image from "next/image"
import { deleteProducts } from './deleteProducts'
import { addProducts } from './addProducts'
import { useEffect, useState } from "react"

export default function DeleteDetailsAdd({
    productDetails,
    setProductDetails,
    setMsg,
    setAllData,
    michroma ,
    setIsLoading
}) {

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
    const [image, setImage] = useState(null)
    const [newSizes, setNewSizes] = useState([])

    const sizes = ["L", "M", "S", "XL", "XXL", "30", "32", "34", "36", "38", "40", '42']
    const category = ['pants', 'shirts', 'tshirts', 'jackets', 'hoodies', 'shoes']

    const handleNewSizes = (btn) => {
        setNewSizes((prev) =>
            prev.includes(btn) ? prev.filter((el) => el !== btn) : [...prev, btn]
        );
    };

    useEffect(() => {
        setFormData(prev => ({ ...prev, sizes: newSizes }))
    }, [newSizes])

    const detailsAndAdd = () => (
        <div className="w-full h-full relative flex">
            <div className="w-[60%] h-full">
                {productDetails.data?.images && (
                    <div className="w-full flex h-screen bg-gray-50">
                        {productDetails.data.images.map((img , index) => {
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
                            <button
                                onClick={() => {
                                    deleteProducts(productDetails, setProductDetails, setMsg, setAllData , setIsLoading)
                                }}
                                className="w-full bg-red-600 cursor-pointer text-white uppercase px-10 py-2"
                            >
                                delete product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const addProduct = () => (
        <div className="w-full h-full flex">
            <div className="w-[30%] h-full">
                {image ? (
                    <div className="w-full h-full relative">
                        <Image
                        src={image}
                        alt="Main Image"
                        fill
                        className="object-cover"
                        />
                    </div>
                    ) : (
                    <div className="w-full h-full bg-black flex justify-center items-center">
                        <h1 className={`uppercase text-white font-bold text-xl md:text-5xl ${michroma.className}`}>
                        Bold & <br /> Worth
                        </h1>
                    </div>
                )}

            </div>

            <div className="w-[70%] px-10 pt-30 pb-20 h-full">
                <form className="h-full flex flex-col gap-2">
                    <input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="product name"
                        className="border-[1px] h-[8%] placeholder:uppercase placeholder:text-black border-black py-2 text-[10px] w-full text-center focus:outline-0 placeholder:text-[8px] tracking-wide"
                    />

                    <textarea
                        value={formData.discription}
                        onChange={(e) => setFormData({ ...formData, discription: e.target.value })}
                        placeholder="product discription"
                        className="h-[8%] border-[1px] placeholder:uppercase placeholder:text-black border-black py-2 text-[10px] w-full text-center focus:outline-0 placeholder:text-[8px] tracking-wide"
                    />

                    <div className="w-full h-[250px] gap-2 flex">
                        <div className="w-[70%] h-full flex gap-2 flex-col">
                            <div className="w-full flex gap-2 h-[15%]">
                                <input
                                    value={formData.originalPrice}
                                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                                    placeholder="original price"
                                    className="border-[1px] placeholder:uppercase placeholder:text-black border-black py-2 text-[10px] w-[50%] text-center focus:outline-0 placeholder:text-[8px] tracking-wide"
                                />
                                <input
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                    placeholder="price"
                                    className="border-[1px] placeholder:uppercase placeholder:text-black border-black py-2 text-[10px] w-[50%] text-center focus:outline-0 placeholder:text-[8px] tracking-wide"
                                />
                            </div>

                            <div className="w-full h-[85%] border border-black flex flex-wrap">
                                {sizes.map((btn, index) => (
                                    <div className="w-[33.33%] p-2" key={index}>
                                        <button
                                            onClick={() => handleNewSizes(btn)}
                                            type="button"
                                            className={`${newSizes.includes(btn) ? 'bg-black text-white' : ''} cursor-pointer w-full h-full text-[10px] font-bold font-mono uppercase border border-black`}
                                        >
                                            {btn}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-[30%]">
                            <input
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                                placeholder="quantity"
                                className="border-[1px] placeholder:uppercase h-[15%] placeholder:text-black border-black py-2 text-[10px] w-full text-center focus:outline-0 placeholder:text-[8px] tracking-wide"
                            />
                            <div className="w-full h-[85%]">
                                <ul className="w-full h-full flex items-center flex-col justify-between border border-black">
                                    {category.map((el, index) => (
                                        <li className="w-full" key={index}>
                                            <button
                                                onClick={() =>
                                                    setFormData({
                                                        ...formData,
                                                        category: formData.category === el ? '' : el
                                                    })
                                                }
                                                type="button"
                                                className={`w-full cursor-pointer p-2 text-[10px] font-bold font-mono uppercase ${formData.category === el ? 'bg-black text-white' : ''}`}
                                            >
                                                {el}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex gap-2">
                        <div className="w-[70%] flex flex-col gap-2">
                            <input
                                onBlur={() => {if (formData.MainImage) setImage(formData.MainImage)}}
                                value={formData.MainImage}
                                onChange={(e) => setFormData({ ...formData, MainImage: e.target.value })}
                                placeholder="main image link"
                                className="border-[1px] h-[33%] placeholder:uppercase placeholder:text-black border-black py-2 text-[10px] w-full text-center focus:outline-0 placeholder:text-[8px] tracking-wide"
                            />
                            <input
                                onBlur={() => {if (formData.images.first) setImage(formData.images.first)}}
                                value={formData.images.first}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    images: { ...formData.images, first: e.target.value }
                                })}
                                placeholder="first more images link"
                                className="border-[1px] h-[33%] placeholder:uppercase placeholder:text-black border-black py-2 text-[10px] w-full text-center focus:outline-0 placeholder:text-[8px] tracking-wide"
                            />
                            <input
                                onBlur={() =>   {if (formData.images.second) setImage(formData.images.second)}}
                                value={formData.images.second}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    images: { ...formData.images, second: e.target.value }
                                })}
                                placeholder="second more images link"
                                className="border-[1px] h-[33%] placeholder:uppercase placeholder:text-black border-black py-2 text-[10px] w-full text-center focus:outline-0 placeholder:text-[8px] tracking-wide"
                            />
                        </div>

                        <div className="w-[30%] flex items-end">
                            <button
                                type="button"
                                onClick={() => {
                                    if (!formData.name || !formData.MainImage || !formData.category) {
                                        setMsg("Please fill all required fields")
                                        return
                                    }
                                    addProducts(formData, setMsg, setAllData, setProductDetails , setIsLoading)
                                }}
                                className="w-full h-full cursor-pointer py-2 bg-black text-white text-[10px] font-bold font-mono uppercase"
                            >
                                add product
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

    return (
        <div className={`fixed ${productDetails.state ? "opacity-100 z-[2000]" : "opacity-0 z-[-1]"} flex top-0 left-0 bg-white h-screen w-full`}>
            {productDetails.data !== 'add' && detailsAndAdd()}
            {productDetails.data === 'add' && addProduct()}

            <div className="absolute top-[30px] right-[30px]">
                <button
                    className="z-[5000] cursor-pointer w-[50px] h-[50px] flex flex-col justify-around relative"
                    onClick={() => {
                        setProductDetails({ data: {} , state: false })
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
        </div>
    )
}
