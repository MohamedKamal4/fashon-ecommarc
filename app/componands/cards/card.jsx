'use client'

import Image from "next/image";
import { useEffect , useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useSelector , useDispatch } from "react-redux";
import { GoPlus } from "react-icons/go";
import { addProduct, removeProduct } from "../../redux/slices/addProduct";
import { IoIosClose } from "react-icons/io";
import FavBtn from "../favBtn/btn";
import Toest from "../toestMsg/toest";

export default function ProductsGrid({ data , collections , solded , sale , newProducts }) {
  const [activeProduct, setActiveProduct] = useState(null);
  const [msg , setMsg] = useState(null)   
  const [isClient , setIsClient] = useState(false)   
  const isAuth = useSelector((state) => state.login.isAuthenticated);
  const cart = useSelector((state) => state.addProduct.cart);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setIsClient(true)
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);


  function handleAddProduct(product, size) {
    const find = cart.some((el) => el.id === product.id && el.size === size);
    if (!find) {
      dispatch(addProduct({ size, ...product }));
      setMsg(<p className=" px-10 py-3 text-[10px] font-bold font-mono bg-green-600 text-white uppercase">ADDED PRODUCT</p>)

    } else {
      dispatch(removeProduct({ id: product.id, size }));
      setMsg(<p className=" px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">REMOVED PRODUCT</p>)
    }
  }

  function toggleSizeList(productId) {
    setActiveProduct(activeProduct === productId ? null : productId);
  }

  useEffect(() => {
      if (msg) {
          const timer = setTimeout(() => setMsg(null), 3000)
          return () => clearTimeout(timer)
      }
  }, [msg])


  if(!isClient) return null


  return (
    <div className="w-full flex flex-wrap justify-center relative z-40 bg-white">
        <div className="w-full mt-10 flex justify-center flex-wrap">
          {data.map((el) => (
            <div data-aos='zoom-in' className="w-[25%] h-[500px] p-5" key={el.id}>
              <div className="w-full overflow-hidden h-[80%] relative">
                <Link href={`/details/${collections || el.category}/${el.id}`}>
                  <div className="size-full relative">
                    <Image src={el.MainImage} fill alt={el.name} sizes="25vw" loading="lazy" />
                  </div>
                </Link>
                <div className="absolute bottom-2 left-2">
                  <button
                    onClick={() => toggleSizeList(el.id)}
                    className="z-20 relative p-1 cursor-pointer bg-white"
                  >
                    <GoPlus className={`${activeProduct === el.id ? 'rotate-45' : ''}`} />
                  </button>
                </div>

                {solded &&
                  <div className=" bg-black absolute top-[10px] right-[10px]">
                      <p className="px-3 py-1 text-[10px] font-bold font-mono uppercase text-white">{el.soldCount} solded</p>
                  </div>
                }

                {newProducts &&
                  <div className=" bg-black absolute top-[10px] right-[10px]">
                      <p className="px-3 py-1 text-[10px] font-bold font-mono uppercase text-white">winter collections 26</p>
                  </div>
                }

                {sale && (
                  <div className="bg-black absolute top-[10px] right-[10px]">
                    <p className="px-3 py-1 text-[10px] font-bold font-mono uppercase text-white">
                      {`${(((el.originalPrice - el.price) / el.originalPrice) * 100).toFixed(0)}% OFF`}
                    </p>
                  </div>
                )}


                {activeProduct === el.id && (
                  <div className="absolute left-0 top-0 transition-all duration-500 bg-white/70 backdrop-blur-sm z-10 h-full w-full flex justify-center items-center">
                    <ul className="flex size-full justify-center items-center flex-col gap-2">
                      {el.sizes.map((size, index) => (
                        <li key={index} className="w-full flex justify-center items-center">
                          <button
                            onClick={() => handleAddProduct(el, size)}
                            className={`cursor-pointer w-full relative py-3 text-xs font-bold font-mono  
                              `}
                          >
                            {size}

                            {cart.some((item) => item.id === el.id && item.size === size) &&
                              <span className=" absolute top-0 right-0 h-full flex justify-center items-center pe-5">
                                <IoIosClose size={20} />
                              </span>
                            }
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="w-full uppercase text-[10px] px-2 py-5 font-bold font-mono h-[20%]">
                <div className="flex justify-between items-center w-full">
                  <h1>{el.name}</h1>
                  {isAuth && (
                    <FavBtn element={el} setMsg={setMsg} />
                  )}
                </div>
                <div className="flex gap-2">
                  <span>{el.price} $</span>
                  <span className="line-through text-red-500">{el.originalPrice} $</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Toest msg={msg} />
    </div>
  );
}
