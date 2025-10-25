'use client';

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import 'aos/dist/aos.css';
import { HiOutlineMinus } from "react-icons/hi";
import { GoPlus } from "react-icons/go";
import Toest from "../../../componands/toestMsg/toest";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { removeItemFromOrder } from './removeItemFromOrder'
import { updateItem } from './updateItem'
import { useSelector } from "react-redux";

export default function OrderDetails({
  order,
  openDetails,
  setOpenDetails,
  formatDate,
  msg,
  baseUrl ,
  setLoading ,
  setOrders , 
  setMsg
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [productSize, setSize] = useState('');
  const [isChange , setIsChange] = useState(false);
  const [openList , setOpenList] = useState(false);
  const user = useSelector((state) => state.login.data);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize()
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (openDetails.status && order?.items?.length) {
      setItem(order.items[0]);
      setActiveIndex(0);
    }
  }, [openDetails.status, order]);

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity || 1);
      setSize(item.size);
    }
  }, [item]);

  useEffect(() => {
    if (!item) return;

    const hasQuantityChanged = quantity !== item.quantity;
    const hasSizeChanged = productSize !== item.size;

    setIsChange(hasQuantityChanged || hasSizeChanged);
  }, [quantity, productSize, item]);

  const newItemData = {
    ...item,
    quantity: quantity,
    price: item?.price * quantity,
    soldCount: item?.soldCount + quantity,
    size: productSize
  };


  return (
    <section
      className={`${
        openDetails.status ? "z-[15000] opacity-100" : "z-[-1] opacity-0"
      } flex fixed w-screen h-screen bg-white top-0 left-0`}
    >
      <div className="absolute top-[20px] xl:top-[50px] right-[20px] xl:right-[50px]">
        <button
          className="z-[5000] w-[50px] h-[50px] focus:outline-0 flex flex-col justify-around cursor-pointer relative"
          onClick={() => setOpenDetails({ status: false, data: {} })}
        >
          <span className="w-full h-[1px] transform translate-y-[5px] rotate-45 bg-black transition-all duration-300"></span>
          <span className="w-full h-[1px] transform -translate-y-[20px] -rotate-45 bg-black transition-all duration-300"></span>
        </button>
      </div>

      <div className="h-full w-full xl:w-[65%] text-[10px] font-bold font-mono uppercase">
        <div className="xl:ps-20 p-5 h-[20%]">
          <h1>name : {order.customer?.name}</h1>
          <h2>user name : @{order.customer?.username}</h2>
          <h3>email : {order.customer?.email}</h3>
          <h4>address : {order.address}</h4>
          <h5>number phone : {order.numberPhone}</h5>
        </div>

        <div className="w-full h-[30%] md:h-[40%] xl:pe-10">
          <Swiper
            slidesPerView={screenWidth < 1024 ? 1 : 3 }
            spaceBetween={50}
            centeredSlides
            modules={[Mousewheel]}
            mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
              setItem(order.items[swiper.activeIndex]);
              }}
            className="h-full"
          >
            {order.items?.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="size-full flex px-25 md:px-50 xl:px-8 justify-center items-center">
                  <div
                    className={`w-[100%] h-[250px] overflow-hidden flex items-center justify-center ${
                      activeIndex === idx ? "xl:scale-105" : "xl:scale-75 xl:opacity-70"
                    } transition-transform duration-300 relative`}
                  >
                    <Image
                      src={item.MainImage}
                      alt={item.name}
                      loading={idx === 0 ? "eager" : "lazy"}
                      fill
                      sizes="100vw"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="h-[50%] md:h-[40%] xl:ps-20 p-5 flex-col xl:flex-row flex">
          {openDetails.status && item && (
            <>
              <div className="w-full xl:w-[75%] py-5 flex flex-col gap-2 h-[70%] xl:h-full">
                <h1>{item.name}</h1>
                <p className="h-[30%] text-[8px] text-black/50">{item.discription}</p>
                <div className="w-full xl:w-[50%] flex justify-between items-center p-3 border-y border-black">
                  <span>{item.price} $</span>
                  <span className="w-[1px] h-[10px] bg-black"></span>
                  <span>{item.category}</span>
                  <span className="w-[1px] h-[10px] bg-black"></span>
                  <span>{item.currency}</span>
                </div>

                <div className="flex items-center justify-between xl:justify-start xl:gap-10 ">
                  <span>selected quantity : {openDetails.orderStatus !== 'pending' && item.quantity}</span>
                  {openDetails.orderStatus === 'pending' &&
                    <div className="w-[50%] xl:w-[25%] flex justify-between items-center">
                      <button
                        className="cursor-pointer p-2"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      >
                        <HiOutlineMinus size={15} />
                      </button>
                      <span className="p-2">{quantity}</span>
                      <button
                        className="cursor-pointer p-2"
                        onClick={() => setQuantity((q) => q + 1)}
                      >
                        <GoPlus size={15} />
                      </button>
                    </div>
                  }
                </div>

                <div className="w-full flex justify-between xl:justify-start xl:gap-10 items-end">
                  <span>selected size : {openDetails.orderStatus !== 'pending' && item.size}</span>
                  {openDetails.orderStatus === 'pending' &&
                    <div className="w-[50%] xl:w-[25%] relative">
                      <button 
                        onClick={() => setOpenList(!openList)} 
                        className="bg-white z-50 flex justify-between items-center text-[10px] font-bold font-mono pb-2 w-full cursor-pointer border-b-[1px] border-black"
                      >
                        {productSize}
                        {openList ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                      </button>
                      <ul className={`absolute ${openList ? 'top-[-165px]' : 'top-[-1500%] opacity-0'} bg-white border-[1px] border-black z-50 transition-transform left-0 w-full flex flex-col justify-center`}>
                        {item.sizes.map((btn, index) => (
                          <li key={index}>
                            <button 
                              onClick={() => {
                                setSize(btn);
                                setOpenList(false);
                              }} 
                              className="text-[10px] px-3 py-2 w-full cursor-pointer text-black font-bold font-mono"
                            >
                              {btn}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                </div>
              </div>

              {openDetails.orderStatus === 'pending' &&
                <div className="w-full xl:w-[25%] flex flex-col gap-2 items-center justify-end h-[30%] xl:h-full">
                  <button
                    onClick={() => {
                      updateItem(
                        newItemData,
                        order.id,
                        item.id,
                        setOpenDetails,
                        msg,
                        baseUrl ,
                        setLoading ,
                        user , 
                        setOrders , 
                        setMsg
                      );
                    }}
                    disabled={isChange ? false : true}
                    className="w-full py-2 uppercase cursor-pointer bg-white border border-black"
                  >
                    {isChange ?
                      'update'
                      :
                      'no changeing'
                    }
                  </button>
                  <button
                    onClick={() => {
                      removeItemFromOrder(order, order.id, item.id , baseUrl , setLoading , setOpenDetails , openDetails , user , setOrders , setMsg , msg );
                    }}
                    className="w-full py-2 uppercase cursor-pointer bg-red-700 text-white"
                  >
                    delete
                  </button>
                </div>
              }
            </>
          )}
        </div>
      </div>

      {openDetails.status && item && (
        <div className="w-[35%] hidden xl:flex h-full relative bigImg">
          <Image src={item.images[0]} alt="" fill sizes="40vw" />
        </div>
      )}
      <Toest msg={msg} />
    </section>
  );
}
