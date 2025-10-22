'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchWindow({ openSearch, setOpenSearch }) {
    const [inputSearch, setInputSearch] = useState('');
    const router = useRouter();

    return (
        <div
            className={`flex bg-white justify-center items-center fixed inset-0 w-full min-h-[100dvh] transition-all duration-300 ${
                openSearch ? 'opacity-100 z-[500]' : 'opacity-0 z-0 -top-[200%]'
            }`}
        >
            <div className="w-[85%] sm:w-[60%] md:w-[40%] border-b border-black">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setOpenSearch(false);
                        if (inputSearch.trim()) {
                            router.push(`/search/${inputSearch}`);
                        }
                    }}
                >
                    <input
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                        type="text"
                        placeholder="WHAT ARE YOU LOOKING FOR"
                        className="py-3 text-sm w-full text-center focus:outline-none placeholder:text-[10px] tracking-wide placeholder:text-black"
                    />
                </form>
            </div>
        </div>
    );
}
