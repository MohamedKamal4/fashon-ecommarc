'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
import { deleteUser } from "./deleteUser"
import { blockUser } from "./blockUser"
import Toest from "../../../../componands/toestMsg/toest"
import Loading from "../../../../componands/loadingCompnand/loading"
import NavDashboard from "../nav"
import { changeUserState } from "./changeUserState"

export default function Users() {
  const [users, setUsers] = useState([])
  const [allUsers, setAllUsers] = useState([]) 
  const [results, setResults] = useState("all")
  const [msg, setMsg] = useState(null)
  const [searchUserName, setSearchUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const [openDetails , setOpenDetails] = useState({
    state : false ,
    orderId : ''
  })
  const [openList, setOpenList] = useState({
    userId: "",
    favoriteList: false,
    orders: false,
  })



  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("/api/data/users")
        const data = await res.json()
        const filtered = data.filter((u) => u.username !== "admin")
        setAllUsers(filtered)
        setUsers(filtered)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    getUsers()
  }, [])

  useEffect(() => {
    if (results === "all") {
      setUsers(allUsers)
    } else {
      setUsers(allUsers.filter((u) => u.userState === results))
    }
  }, [results, allUsers])

  const onSubmition = () => {
    if (searchUserName.trim() === "") {
      setUsers(allUsers)
    } else {
      setUsers(allUsers.filter((u) => u.username === searchUserName))
    }
  }

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [msg])

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

  const UserState = ({ state }) => (
    <div className="absolute flex items-center gap-3 top-[20px] right-[20px]">
      <span>{state === "active" ? "active user" : "blocked user"}</span>
      <span
        className={`w-[5px] rounded-full h-[5px] ${
          state === "active" ? "bg-green-600" : "bg-red-600"
        }`}
      ></span>
    </div>
  )

  const lists = [
    { listName: "orders list", state: "orders" },
    { listName: "favorite List", state: "favoriteList" },
  ]

  const listContent = (user, state) => {
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
            <div key={item.id} className="px-5 p-2 w-[25%] h-[300px]">
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
                                <button className={ ` ${item.status !== 'pending' ? 'w-full' : 'w-[50%]'} py-2 cursor-pointer bg-red-600 text-[10px] font-bold font-mono uppercase text-white`}>delete</button>
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

  return (
    <div className="size-full flex flex-col gap-10">
      <NavDashboard
        result={"users"}
        setResults={setResults}
        results={results}
        searchUserName={searchUserName}
        setSearchUserName={setSearchUserName}
        onSubmition={onSubmition}
      />

      {users.map((user) => (
        <div
          key={user.id}
          className="w-full relative text-[10px] font-bold font-mono uppercase flex flex-col p-5 bg-gray-100"
        >
          <div className="h-[200px] w-full flex">
            <div className="relative w-[30%] h-full">
              <Image
                src={user.image}
                fill
                alt=""
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="w-[70%] p-5 flex flex-col justify-between">
              <div className="w-full text-[12px] flex flex-col gap-2">
                <h1>name : {user.name}</h1>
                <h2>user : {user.username}</h2>
                <h3>email : {user.email}</h3>
              </div>
              <div className="w-full flex flex-col gap-2">
                <button
                  onClick={() => deleteUser(user, setMsg, setIsLoading, setUsers , baseUrl)}
                  className="w-[50%] cursor-pointer uppercase py-2 bg-red-600 text-white"
                >
                  delete user
                </button>
                <button
                  onClick={() =>
                    blockUser(user, setIsLoading, setMsg, setUsers , baseUrl)
                  }
                  className="w-[50%] cursor-pointer uppercase py-2 bg-black text-white"
                >
                  {user.userState === "active" ? "block user" : "unblock user"}
                </button>
              </div>
            </div>
          </div>

          <UserState state={user.userState} />

          {lists.map((el) => (
            <div key={el.state} className="w-full px-5 bg-white mt-3">
              <button
                onClick={() =>
                  setOpenList((prev) => ({
                    userId: user.id,
                    [el.state]: prev.userId !== user.id || !prev[el.state],
                    [el.state === "favoriteList" ? "orders" : "favoriteList"]:
                      false,
                  }))
                }
                className="w-full flex items-center justify-between py-2 cursor-pointer uppercase"
              >
                {el.listName} [{user[el.state].length}]
                {openList.userId === user.id && openList[el.state] ? (
                  <IoMdArrowDropup />
                ) : (
                  <IoMdArrowDropdown />
                )}
              </button>
              {openList.userId === user.id && openList[el.state] && (
                <div>{listContent(user, el.state)}</div>
              )}
            </div>
          ))}
        </div>
      ))}

      {users.length === 0 && !isLoading && (
        <div className="w-full h-screen flex justify-center items-center text-[10px] font-bold font-mono uppercase">
          <h6>no users found</h6>
        </div>
      )}

      {isLoading && <Loading />}
      <Toest msg={msg} />
    </div>
  )
}
