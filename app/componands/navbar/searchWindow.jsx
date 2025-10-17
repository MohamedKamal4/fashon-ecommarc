'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchWindow({openSearch , setOpenSearch}){
    const [inputSearch , setInputSearch] = useState('')
    const router = useRouter()

    return(
        <div className={`flex bg-white justify-center items-center fixed left-0 w-screen min-h-screen transition-transform ${openSearch ? 'opacity-100 z-[500] top-0' : ' opacity-0 z-0 top-[-200%]'} `}>
            <div className=" w-[40%] border-b-[1px] border-black">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setOpenSearch(false)
                        if (inputSearch.trim()) {
                            router.push(`/search/${inputSearch}`);
                        }
                    }}
                    >
                    <input
                        value={inputSearch}
                        type="text"
                        onChange={(e) => setInputSearch(e.target.value)}
                        placeholder="WHAT ARE YOU LOOCKING FOR" className="py-2 text-[10px] w-full text-center focus:outline-0 placeholder:text-[10px] tracking-wide placeholder:text-black" />
                </form>
            </div>
        </div>
    )
}