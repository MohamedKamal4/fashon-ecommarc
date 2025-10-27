'use client'
import { useEffect, useState } from "react";
import NavDashboard from "../nav";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import Image from "next/image";
import { deleteOrder } from "./deleteOrderFromMasterOrders";
import { changeUserState } from "./changeOrdersUserState";
import Toest from "../../../../componands/toestMsg/toest";
import Loading from "../../../../componands/loadingCompnand/loading";

export default function Orders(){
    const [ordersResults , setOrdersResults] = useState('all orders')
    const [allOrders , setAllOrders] = useState([])
    const [data , setData ] = useState([])
    const [msg, setMsg] = useState(null)
    const [searchOrderUserName, setSearchOrderUserName] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const [openDetails , setOpenDetails] = useState({
        state : false ,
        orderId : ''
    })
    useEffect(() => {
        fetch('http://localhost:3000/api/data/orders')
        .then((res) => res.json())
        .then((res) => {
            setAllOrders(res)
            setIsLoading(false)
            setData(res)
        })
    },[ordersResults])

    useEffect(() => {
        if(ordersResults === 'all orders'){
            setAllOrders(data)
        }else if(ordersResults === 'pending orders'){
            setAllOrders(data.filter((el) => el.status === 'pending'))
        }else{
            setAllOrders(data.filter((el) => el.status === 'completed'))
        }
    },[ordersResults])

    const onSubmitionOrserSearch = () => {
        if (searchOrderUserName.trim() === "") {
        setAllOrders(data)
        } else {
        setAllOrders(data.filter((u) => u.customer.username === searchOrderUserName))
        }
    }

    const formatDate = (iso) =>
        iso
        ? new Date(iso).toLocaleString("en-US", {
            timeZone: "Africa/Cairo",
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })
        : "—"

        useEffect(() => {
            if (msg) {
              const timer = setTimeout(() => setMsg(null), 3000)
              return () => clearTimeout(timer)
            }
          }, [msg])

    return(
        <div className="size-full overflow-scroll text-[10px] font-bold font-mono uppercase ">
            <NavDashboard result={"orders"} ordersResults={ordersResults} setOrdersResults={setOrdersResults} allOrders={allOrders} searchOrderUserName={searchOrderUserName} setSearchOrderUserName={setSearchOrderUserName} onSubmitionOrserSearch={onSubmitionOrserSearch} />
            <div className="w-full flex flex-col gap-5 mt-5">
                {allOrders.map((item , index) => {
                    return(
                        <div key={index} className={`w-full bg-gray-100 p-5`}>
                            <div className=" flex w-full h-[250px]">
                                <div className="w-[20%] relative flex flex-wrap h-full">
                                    {item.items.slice(0, 1).map((i, idx) => (
                                    <div
                                        key={idx}
                                        className={`${
                                        item.items.length === 1 ? "size-full" : "w-[50%] h-[50%]"
                                        }`}
                                    >
                                        <Image
                                            src={i.MainImage}
                                            fill
                                            alt=""
                                            loading="lazy"
                                            className="object-cover"
                                        />
                                    </div>
                                    ))}
                                    {item.items.length > 1 && (
                                        <div className="absolute top-0 left-0 size-full flex justify-center items-center bg-black/50 text-white text-xs z-50">
                                            + {item.items.length - 1}
                                        </div>
                                    )}
                                </div>
                                <div className="w-[80%] h-full flex">
                                    <div className="flex w-[50%] flex-col gap-2 h-full px-10 py-5 text-[12px]">
                                    <div className="text-black/60 text-[8px] pb-5">
                                        {formatDate(item.createdAt || item.updatedAt)}
                                    </div>
                                    <h1>name : {item.customer?.name}</h1>
                                    <h2>user name : @{item.customer?.username}</h2>
                                    <h3>email : {item.customer?.email}</h3>
                                    <h4>address : {item.address}</h4>
                                    <h5>number phone : {item.numberPhone}</h5>
                                    </div>
                                    <div className="w-[50%] h-full p-5 flex flex-col justify-between">
                                    <div className="w-full h-[50%] flex flex-col justify-between">
                                        <span>total : {item.total.toFixed(2)} $</span>
                                        <span>quantity : {item.quantity} pcs</span>
                                        <span>order state : {item.status}</span>
                                        <span>payment : {item.paymentInfo.paymentStatus}</span>
                                    </div>
                                    <div className="w-full h-[50%] flex flex-col justify-end gap-2">
                                        <div className="flex gap-2">
                                            <button onClick={() => {
                                                deleteOrder(item.customer, setMsg, setIsLoading, setAllOrders , baseUrl , item.id)
                                            }} className={ ` ${item.status !== 'pending' ? 'w-full' : 'w-[50%]'} py-2 cursor-pointer bg-red-600 text-[10px] font-bold font-mono uppercase text-white`}>delete</button>
                                            {item.status === 'pending' &&
                                                <button onClick={() => {
                                                    console.log(allOrders)
                                                    changeUserState(item.customer , setIsLoading , setMsg , setAllOrders , baseUrl , item)
                                                }} className="w-[50%] py-2 cursor-pointer bg-black text-[10px] font-bold font-mono uppercase text-white">accept</button>
                                            }
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="w-full px-5 bg-white mt-3">
                                    <button
                                        onClick={() =>
                                        setOpenDetails((prev) => ({
                                            state: prev.orderId === item.id ? !prev.state : true,
                                            orderId: item.id,
                                        }))
                                        }
                                        className="w-full focus:outline-0 flex items-center justify-between py-2 cursor-pointer uppercase"
                                    >
                                        details [{item.items.length}]
                                        {openDetails.state && openDetails.orderId === item.id ? (
                                        <IoMdArrowDropup />
                                        ) : (
                                        <IoMdArrowDropdown />
                                        )}
                                    </button>
                                    {(openDetails.orderId === item.id && openDetails.state === true) && 
                                        <div className="w-full flex flex-wrap justify-center items-center py-5">
                                            {item.items.map((el , index) => {
                                                return(
                                                    <div key={index} className="w-[30%] h-[400px] p-3">
                                                        <div className="size-full ">
                                                            <div className="w-full relative h-[80%]">
                                                                <Image
                                                                    src={el.MainImage}
                                                                    alt=""
                                                                    fill
                                                                />
                                                            </div>
                                                            <div className="w-full h-[20%] py-2 flex flex-col">
                                                                <h4>{el.name}</h4>
                                                                <div className="flex gap-2">
                                                                    <span>{el.price} $</span>
                                                                    <span className="line-through text-red-600">
                                                                        {el.originalPrice} $
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <span>selected size : {el.size}</span>
                                                                    <span className=" w-[10px] h-[1px] bg-black"></span>
                                                                    <span>quantity : {el.quantity}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {allOrders.length === 0 && !isLoading && (
                <div className="w-full h-screen flex justify-center items-center text-[10px] font-bold font-mono uppercase">
                <h6>no orders yet</h6>
                </div>
            )}
            <Toest msg={msg} />
            {isLoading && <Loading />}
        </div>
    )
}