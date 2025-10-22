'use client'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation";
import MenuDashboard from "./menu";
import { Michroma } from 'next/font/google'
import Products from "./products/products";
import Users from "./users/users";
const michroma = Michroma({
  subsets: ['latin'], 
  weight: '400',      
})

export default function DashboardAdmin(){
    const router = useRouter()
    const user = useSelector((stata) => stata.login.data)
    const isAuth = useSelector((state) => state.login.isAuthenticated)
    const [openMenu , setOpenMenu] = useState(true) 
    const [results , setResults] = useState('products')

    useEffect(() => {
        if (!isAuth || user?.username !== 'admin') router.replace('/');
    }, [isAuth, user?.username , router]);

    return(
        <section className=" overflow-hidden relative flex justify-end ">
            <MenuDashboard openMenu={openMenu} setOpenMenu={setOpenMenu} michroma={michroma} results={results} setResults={setResults} />
            <div className={`${openMenu ? 'w-[80%]' : 'w-[100%]'} list p-10`}>
                <div className=" container m-auto flex min-h-screen">
                    {results === 'products' &&
                        <Products openMenu={openMenu} michroma={michroma} />
                    }
                    {results === 'users' &&
                        <Users />
                    }
                </div>
            </div>
        </section>
    )
}