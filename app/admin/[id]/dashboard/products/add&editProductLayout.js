import Image from "next/image"
import { EditProduct } from "./editProduct"
import { addProducts } from "./addProducts"

export function AddProduct(
    michroma ,
    formData ,
    setFormData ,
    image ,
    setImage ,
    productDetails ,
    setScreenIsLoading ,
    setScreenMsg ,
    setAllData ,
    newSizes ,
    isEdit ,
    setProductDetails ,
    setNewSizes 
) {
    const sizes = ["L", "M", "S", "XL", "XXL", "30", "32", "34", "36", "38", "40", '42']
    const category = ['pants', 'shirts', 'tshirts', 'jackets', 'hoodies', 'shoes']
    const handleNewSizes = (btn) => {
        setNewSizes((prev) =>
            prev.includes(btn) ? prev.filter((el) => el !== btn) : [...prev, btn]
        );
    };

    const isValid = () => {
        const original = {
            name: productDetails.data.name || '',
            discription: productDetails.data.discription || '',
            price: productDetails.data.price || 0,
            originalPrice: productDetails.data.originalPrice || 0,
            quantity: productDetails.data.quantity || 0,
            sizes: productDetails.data.sizes || [],
            category: productDetails.data.category || '',
            images: {
                first: productDetails.data.images?.[0] || '',
                second: productDetails.data.images?.[1] || ''
            },
            MainImage: productDetails.data.MainImage || ''
        }

        const filteredForm = Object.fromEntries(
            Object.entries(formData).filter(([key, v]) => {
            if (Array.isArray(v)) return v.length > 0
            if (typeof v === 'object' && v !== null) {
                return Object.values(v).some((val) => val !== '')
            }
            return v !== '' && v !== 0
            })
        )

        const merged = {
            ...original,
            ...filteredForm,
            images: {
            ...original.images,
            ...(filteredForm.images || {})
            }
        }

        return JSON.stringify(original) !== JSON.stringify(merged)
    }

    return(
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
                        <div className={`${isValid() ? 'w-[70%]' : 'w-[100%]'} flex flex-col gap-2`}>
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
                                onBlur={() =>  {if (formData.images.second) setImage( formData.images.second)}}
                                value={formData.images.second}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    images: { ...formData.images, second: e.target.value }
                                })}
                                placeholder="second more images link"
                                className="border-[1px] h-[33%] placeholder:uppercase placeholder:text-black border-black py-2 text-[10px] w-full text-center focus:outline-0 placeholder:text-[8px] tracking-wide"
                            />
                        </div>

                        <div className={`${isValid() ? 'flex' : 'hidden'} w-[30%] items-end`}>
                            {(isEdit && isValid()) &&
                                <button
                                    type="button"
                                        onClick={() => {
                                            EditProduct(productDetails.data , formData , setScreenIsLoading , setScreenMsg , setAllData , newSizes)
                                        }}
                                    className="w-full h-full cursor-pointer py-2 bg-black text-white text-[10px] font-bold font-mono uppercase"
                                >
                                    add new data
                                </button>
                            }

                            {!isEdit &&
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!formData.name || !formData.MainImage || !formData.category) {
                                            setScreenMsg("Please fill all required fields")
                                            return
                                        }
                                        addProducts(formData, setScreenMsg, setAllData, setProductDetails , setScreenIsLoading)
                                    }}
                                    className="w-full h-full cursor-pointer py-2 bg-black text-white text-[10px] font-bold font-mono uppercase"
                                >
                                    add product
                                </button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}