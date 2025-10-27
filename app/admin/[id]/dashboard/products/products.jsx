'use client'
import { useEffect, useState, useMemo } from "react";
import NavDashboard from "../nav";
import Image from "next/image";
import Loading from '../../../../componands/loadingCompnand/loading'
import Toest from '../../../../componands/toestMsg/toest'
import DeleteDetailsAdd from "./Delete-&-Details-&-Add";

export default function Products({ openMenu , michroma }) {
    const [dataList, setDataList] = useState("all");
    const [allData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [msg, setMsg] = useState(null);
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const [productDetails, setProductDetails] = useState({
        state: false,
        data: {},
        page: ''
    });

    useEffect(() => {
        setIsLoading(true);
        fetch(`${baseUrl}/api/data/products`)
        .then((res) => res.json())
        .then((res) => {
            setAllData(res);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setIsLoading(false);
        });
    }, []);

    const filteredData = useMemo(() => {
        if (dataList === "all") return allData;
        return allData.filter((el) => el.category === dataList);
    }, [allData, dataList]);

    useEffect(() => {
        if (msg) {
            const timer = setTimeout(() => setMsg(null), 3000)
            return () => clearTimeout(timer)
        }
    }, [msg])

    return (
        <>
        <div className="w-full relative z-10">
            <NavDashboard result={"products"} dataList={dataList} setDataList={setDataList} />
            <div className="w-full flex flex-wrap justify-center items-center">
                {filteredData.map((item , index) => (
                    <div key={index} role="button" onClick={() => setProductDetails({ state: true, data: item , page : 'details&add' })} className={`${openMenu ? "w-[25%]" : "w-[20%]"} cursor-pointer list p-5 h-[350px]`}>
                        <div className="size-full">
                            <div className="relative w-full overflow-hidden h-[85%]">
                                <Image
                                    src={item.MainImage}
                                    alt={item.name}
                                    fill
                                    className="hover:scale-105 transition-all object-cover"
                                />
                            </div>
                            <div className="w-full uppercase text-[10px] p-2 font-bold font-mono h-[15%]">
                                <div className="flex justify-between items-center w-full">
                                    <h1>{item.name}</h1>
                                </div>
                                <div className="flex gap-2">
                                    <span>{item.price} $</span>
                                    <span className="line-through text-red-500">
                                        {item.originalPrice} $
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isLoading && <Loading />}
        </div>

        <DeleteDetailsAdd
            productDetails={productDetails}
            setProductDetails={setProductDetails} 
            setMsg={setMsg} 
            setAllData={setAllData}
            michroma={michroma}
            setIsLoading={setIsLoading}
        />

        <div className="fixed z-[1000] bottom-[30px] right-[30px]">
            <button
                className="cursor-pointer text-white bg-black text-[10px] font-bold font-mono uppercase px-10 py-2"
                onClick={() => {
                    setProductDetails({
                        state : true,
                        data: {},
                        page: 'add'
                    })
                }}
            >
                add new product
            </button>
        </div>

        <Toest msg={msg} />
        </>
    );
}
