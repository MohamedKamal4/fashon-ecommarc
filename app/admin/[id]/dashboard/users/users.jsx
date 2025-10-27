'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
import { deleteUser } from "./deleteUser"
import { blockUser } from "./blockUser"
import Toest from "../../../../componands/toestMsg/toest"
import Loading from "../../../../componands/loadingCompnand/loading"
import NavDashboard from "../nav"
import { listContent } from './listContent'

export default function Users({ openMenu }) {
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
    fetch("/api/data/users")
    .then((res) => res.json())
    .then((data) => {
      const filtered = data.filter((u) => u.username !== "admin")
      setAllUsers(filtered)
      setUsers(filtered)
      setIsLoading(false)
    })
    .catch((err) => {
      console.error(err)
    })
  }, [results])

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

  return (
    <div className="size-full flex flex-col gap-10">
      <NavDashboard
        result={"users"}
        setResults={setResults}
        results={results}
        searchUserName={searchUserName}
        setSearchUserName={setSearchUserName}
        onSubmition={onSubmition}
        users={users}
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
                <div>{listContent(user, el.state , openDetails , setOpenDetails , openMenu)}</div>
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
