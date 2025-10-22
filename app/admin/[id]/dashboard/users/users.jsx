'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

export default function Users(){
    const [users , setUsers] = useState([])
    const [openList , setOpenList] = useState({
        userId: '',
        favoriteList: false,
        orders: false
    })

    useEffect(() => {
        fetch('/api/data/users')
        .then((res) => res.json())
        .then((res) => {
            const filtredUsers = res.filter((user) => user.username !== 'admin')
            setUsers(filtredUsers)
        })
    },[])

    const listContent = (user) => {
        return(
            user.length > 0 ?
                <div className={`mt-2 px-5 h-screen flex flex-wrap items-center justify-center overflow-scroll w-full`}>
                    {user.map((item) => {
                        return(
                            <div key={item.id} className="px-5 p-2 w-[25%] h-[50%]">
                                <div className="w-full relative h-[80%]">
                                    <Image 
                                        src={item.MainImage}
                                        fill
                                        alt=''
                                    />
                                </div>
                                <div className="h-[20%] py-2 w-full">
                                    <h4>{item.name}</h4>
                                    <div className="flex gap-2">
                                        <span>{item.price} $</span>
                                        <span className="line-through text-red-500">{item.originalPrice} $</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                    :
                <div className="w-full h-[200px] flex justify-center items-center">
                    <h6>no items yet</h6>
                </div>
        )
    }


    return(
        <div className="size-full flex flex-col gap-10">
            {users.map((user) => {
                return(
                    <div key={user.id} className="w-full relative text-[10px] font-bold font-mono uppercase flex flex-col p-5 bg-gray-100">
                        <div className="h-[200px] w-full flex">
                            <div className=" relative w-[30%] h-full">
                                <Image
                                    src={user.image}
                                    fill
                                    alt=""
                                />
                            </div>
                            <div className="w-[70%] p-5 flex flex-col justify-between">
                                <div className="w-full text-[12px] flex flex-col gap-2">
                                    <h1>name : {user.name}</h1>
                                    <h2>user : {user.username}</h2>
                                    <h3>email : {user.email}</h3>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <button className="w-[50%] cursor-pointer uppercase py-2 bg-red-600 text-white">delete user</button>
                                    <button className="w-[50%] cursor-pointer uppercase py-2 bg-black text-white">block user</button>
                                </div>
                            </div>
                        </div>
                        <div className=" absolute flex items-center gap-3 top-[20px] right-[20px]">
                            <span>active user</span>
                            <span className="w-[5px] rounded-full h-[5px] bg-green-600"></span>
                        </div>
                        <div className="w-full px-5 bg-white mt-3">
                            <div className="w-full">
                                <button
                                onClick={() => {
                                    setOpenList({oreders: false , userId: user.id , favoriteList : !openList.favoriteList})
                                }}
                                className="w-full flex items-center justify-between py-2 cursor-pointer uppercase">
                                    favorite list {`[ ${user.favoriteList.length} ]`}
                                    {(openList.userId === user.id && openList.favoriteList) ?
                                        <IoMdArrowDropup />
                                        :
                                        <IoMdArrowDropdown />
                                    }
                                </button>
                                <div className={`${(openList.userId === user.id && openList.favoriteList) ? '' : 'hidden'} w-full`}>
                                    {listContent(user.favoriteList)}
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-5 mt-3 bg-white">
                            <div className="w-full">
                                <button
                                onClick={() => {
                                    setOpenList({favoriteList: false , userId: user.id ,  orders : !openList.orders})
                                }}
                                className="w-full flex items-center justify-between py-2 cursor-pointer uppercase">
                                    orders {`[ ${user.orders.length} ]`}
                                    {(openList.userId === user.id && openList.orders) ?
                                        <IoMdArrowDropup />
                                        :
                                        <IoMdArrowDropdown />
                                    }
                                </button>
                                <div className={`${(openList.userId === user.id && openList.orders) ? '' : 'hidden'} w-full`}>
                                    {user.orders.length > 0 ?
                                        <div className={`mt-2 h-screen overflow-scroll w-full`}>
                                        </div>
                                            :
                                        <div className="w-full h-[200px] flex justify-center items-center">
                                            <h6>no items yet</h6>
                                        </div>
                                    }
                                </div>
                            </div>                  
                        </div>
                    </div>
                )
            })}
        </div>
    )
}