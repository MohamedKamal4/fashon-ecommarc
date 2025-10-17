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

export default function OrderDetails({
  order,
  openDetails,
  setOpenDetails,
  formatDate,
  removeItemFromOrder,
  msg
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (openDetails.status && order?.items?.length) {
      setItem(order.items[0]);
      setActiveIndex(0);
    }
  }, [openDetails.status, order]);

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity || 1);
    }
  }, [item]);

  const handleRemove = useCallback(() => {
    if (!order || !item) return;
    removeItemFromOrder(order, order.id, item.id);
  }, [order, item, removeItemFromOrder]);

  return (
    <section
      className={`${
        openDetails.status ? "z-[15000] opacity-100" : "z-[-1] opacity-0"
      } flex fixed w-screen h-screen bg-white top-0 left-0`}
    >
      <div className="absolute top-[50px] right-[50px]">
        <button
          className="z-[5000] w-[50px] h-[50px] focus:outline-0 flex flex-col justify-around cursor-pointer relative"
          onClick={() => setOpenDetails({ status: false, data: {} })}
        >
          <span className="w-full h-[1px] transform translate-y-[5px] rotate-45 bg-black transition-all duration-300"></span>
          <span className="w-full h-[1px] transform -translate-y-[20px] -rotate-45 bg-black transition-all duration-300"></span>
        </button>
      </div>

      <div className="h-full w-[65%] text-[10px] font-bold font-mono uppercase">
        <div className="ps-20 p-5 h-[20%]">
          <div className="text-black/60 pb-5">{formatDate(order.createdAt)}</div>
          <h1>name : {order.customer?.name}</h1>
          <h2>user name : @{order.customer?.username}</h2>
          <h3>email : {order.customer?.email}</h3>
          <h4>address : {order.address}</h4>
          <h5>number phone : {order.numberPhone}</h5>
        </div>

        <div className="w-full h-[40%] pe-10">
          <Swiper
            slidesPerView={3}
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
              <SwiperSlide key={item.id}>
                <div className="size-full flex px-8 justify-center items-center">
                  <div
                    className={`w-[100%] h-[250px] overflow-hidden flex items-center justify-center ${
                      activeIndex === idx ? "scale-105" : "scale-75 opacity-70"
                    } transition-transform duration-300 relative`}
                  >
                    <Image
                      src={item.MainImage}
                      alt={item.name}
                      loading={idx === 0 ? "eager" : "lazy"}
                      fill
                      sizes="20vw"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="h-[40%] ps-20 p-5 flex">
          {openDetails.status && item && (
            <>
              <div className="w-[75%] py-5 flex flex-col gap-2 h-full">
                <h1>{item.name}</h1>
                <p className="h-[30%] text-[8px] text-black/50">{item.discription}</p>
                <div className="w-[50%] flex justify-between items-center p-3 border-y border-black">
                  <span>{(item.price * quantity).toFixed(2)} $</span>
                  <span className="w-[1px] h-[10px] bg-black"></span>
                  <span>{item.category}</span>
                  <span className="w-[1px] h-[10px] bg-black"></span>
                  <span>{item.currency}</span>
                </div>

                <div className="flex items-center gap-5">
                  <span>selected quantity :</span>
                  <div className="w-[25%] flex justify-between items-center">
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
                </div>
                <span>selected size : {item.size}</span>
              </div>

              <div className="w-[25%] flex items-end h-full">
                <button
                  onClick={handleRemove}
                  className="w-full py-2 uppercase cursor-pointer bg-red-700 text-white"
                >
                  delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {openDetails.status && item && (
        <div className="w-[35%] h-full opacity-50 relative bigImg">
          <Image src={item.images[0]} alt="" fill sizes="40vw" />
        </div>
      )}
        <Toest msg={msg} />
    </section>
  );
}
