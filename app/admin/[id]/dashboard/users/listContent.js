import Image from "next/image"
import { changeUserState } from "./changeUserState"
import { deleteOrder } from "./deleteOrder"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

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

export const listContent = (user, state , openDetails , setOpenDetails , openMenu) => {
    const items = user[state]
    const isFavorites = state === "favoriteList"

    if (!items?.length) {
      return (
        <div className="w-full h-[200px] flex justify-center items-center">
          <h6>no items yet</h6>
        </div>
      )
    }

    return (
      <div
        className={`mt-2 px-5 max-h-screen ${
          isFavorites ? "flex flex-wrap" : "flex flex-col gap-5"
        } overflow-scroll w-full`}
      >
        {items.map((item, index) =>
          isFavorites ? (
            <div key={item.id} className={`px-5 p-2 h-[400px] ${openMenu ? 'w-[33.33%]' : 'w-[25%]'}`}>
              <div className="w-full relative h-[80%]">
                <Image
                  src={item.MainImage}
                  fill
                  alt=""
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="h-[20%] py-2 w-full">
                <h4>{item.name}</h4>
                <div className="flex gap-2">
                  <span>{item.price} $</span>
                  <span className="line-through text-red-600">
                    {item.originalPrice} $
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div key={index} className={`w-full bg-gray-100 p-5`}>
                <div className=" flex w-full h-[200px]">
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
                            {formatDate(item.date || item.updatedAt)}
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
                                  deleteOrder(user, setMsg, setIsLoading, setUsers , baseUrl , item.id)
                                }} className={ ` ${item.status !== 'pending' ? 'w-full' : 'w-[50%]'} py-2 cursor-pointer bg-red-600 text-[10px] font-bold font-mono uppercase text-white`}>delete</button>
                                {item.status === 'pending' &&
                                    <button onClick={() => {
                                        changeUserState(user , setIsLoading , setMsg , setUsers , baseUrl , item)
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
                                        <div key={index} className="w-[30%] h-[370px] p-3">
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
        )}
      </div>
    )
  }