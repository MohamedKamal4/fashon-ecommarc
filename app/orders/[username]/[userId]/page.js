'use client';

import { useEffect , useState , useMemo } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import OrderDeatails from "./orderDetails";
import Toest from "../../../componands/toestMsg/toest";
import { cancelOrder } from "./cancelOrder";
export default function OrdersProducts() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.login.data);
    const isAuth = useSelector((state) => state.login.isAuthenticated);
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        handleResize()
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [msg , setMsg] = useState({
        mainPageMsg: null ,
        orderDetailsMsg: null
    })
    const [openDetails , setOpenDetails] = useState({
        status: false,
        data : {},
        orderStatus: ''
    })

    useEffect(() => {
        if (!isAuth) router.replace('/');
    }, [isAuth, router]);

    useEffect(() => {
        if (msg) {
            const timer = setTimeout(() => setMsg({
                mainPageMsg: null ,
                orderDetailsMsg: null
            }), 3000)
            return () => clearTimeout(timer)
        }
    }, [msg])

    useEffect(() => {
        if (!isAuth || !user?.id) return;
        fetch(`${baseUrl}/api/data/users/${user.id}/orders`)
        .then((res) => res.json())
        .then((res) => {
            setOrders(res);
            setLoading(false)
        })
    },[isAuth, user?.id , openDetails.data])


    function handleOpenDetails(order , orderStatus){
        setLoading(true)
        setTimeout(() => {
            setOpenDetails({ data : order , status : true , orderStatus: orderStatus})
            setLoading(false)
        },2000)
    }
    
    const formatDate = (isoString) => {
        if (!isoString) return "—";
        return new Date(isoString).toLocaleString("en-US", {
            timeZone: "Africa/Cairo",
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const sections = useMemo(() => [
        { status: "pending", label: "pending orders" },
        { status: "on shipping", label: "on shipping orders" },
        { status: "completed", label: "completed orders" },
    ], []);

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center uppercase text-[10px] font-bold font-mono">
                loading...
            </div>
        );
    }

    if (!orders.length || orders.message) {
        return (
            <div className="w-full h-screen flex justify-center items-center uppercase text-[10px] font-bold font-mono">
                no orders found
            </div>
        );
    }

    const bigScreen = () => {
        return(
            <>
                {
                    sections.map(({ status, label }) => {
                        const filtered = orders.filter((order) => order.status === status);
                        if (!filtered.length) return null;

                        return (
                        <div key={status} className="pt-20 flex flex-wrap border-t-2 border-black relative">
                            {filtered.map((order , index) => (
                            <div key={order.id} className="w-[50%] h-[270px] px-5 mb-30">
                                <div className="w-full h-full flex">
                                
                                <div className="h-full relative flex flex-wrap justify-center items-center w-[40%]">
                                    {order.items?.slice(0, 4).map((img, i) => (
                                    <div key={i} className={`${order.items.length === 1 ? 'w-[100%] h-[100%]' : 'w-[50%] h-[50%]' } p-1`}>
                                        <div className="relative size-full">
                                        <Image
                                            src={img.MainImage}
                                            alt={img.name || "product image"}
                                            fill
                                            sizes="25vw"
                                            className="object-cover "
                                        />
                                        </div>
                                    </div>
                                    ))}

                                    {order.items.length > 4 && (
                                    <div className="absolute inset-0 bg-black/50 text-white font-mono font-bold flex items-center justify-center z-50">
                                        + {order.items.length - 4}
                                    </div>
                                    )}

                                    <div className="absolute top-[10px] right-[10px] bg-black text-white py-1 px-3 text-[8px] tracking-[2px] font-bold font-mono uppercase z-50">
                                        {order.status}
                                    </div>
                                </div>

                                <div className="h-full w-[60%] flex flex-col justify-between ps-10 gap-3 uppercase text-[10px] font-bold font-mono">
                                    <div className="flex flex-col gap-2">
                                        <div className="text-black/60">{formatDate(order.date || order.updatedAt)}</div>
                                        <h1>name : {order.customer?.name}</h1>
                                        <h2>user name : @{order.customer?.username}</h2>
                                        <h3>email : {order.customer?.email}</h3>
                                        <h4>address : {order.address}</h4>
                                        <h5>number phone : {order.numberPhone}</h5>
                                    </div>

                                    <div className="border-y border-black flex py-2 justify-between items-center">
                                        <span>{order.quantity} pieces</span>
                                        <span className="w-[1px] h-[10px] bg-black"></span>
                                        <span>payment : {order.paymentInfo?.paymentStatus}</span>
                                        <span className="w-[1px] h-[10px] bg-black"></span>
                                        <span>total : {order.total?.toFixed(2)} $</span>
                                    </div>

                                    <div className="w-full flex gap-1">
                                    {(status === 'pending') && (
                                        <button
                                            onClick={() => {
                                                setLoading(true)
                                                cancelOrder(order.id , setLoading , setMsg , setOrders , baseUrl , user , msg)
                                            }}
                                            className="w-[50%] cursor-pointer bg-red-600 text-white uppercase py-2 font-bold font-mono"
                                            >
                                            cancel
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            handleOpenDetails(order , order.status)
                                        }}
                                        className={`${
                                        status === 'completed'  || status === 'on shipping' ? 'w-full' : 'w-[50%]'
                                        } bg-black cursor-pointer text-white uppercase py-2 font-bold font-mono`}
                                    >
                                        details
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            ))}
                            <div className="absolute h-[30px] top-[-15px] left-[20px] bg-white z-50 px-10 flex justify-center items-center uppercase tracking-[5px]">
                                <span className="text-[10px] font-bold font-mono">{label}</span>
                            </div>
                        </div>
                        );
                    })
                }
            </>
        )
    }
    const middleScreen = () => {
        return(
            <>
                {
                    sections.map(({ status, label }) => {
                        const filtered = orders.filter((order) => order.status === status);
                        if (!filtered.length) return null;

                        return (
                        <div key={status} className="pt-20 flex flex-wrap border-t-2 border-black relative">
                            {filtered.map((order , index) => (
                            <div key={order.id} className="w-full h-[300px] px-5 mb-30">
                                <div className="w-full h-full flex">
                                
                                <div className="h-full relative flex flex-wrap justify-center items-center w-[30%]">
                                    {order.items?.slice(0, 1).map((img, i) => (
                                    <div key={i} className={`w-[100%] h-[100%]`}>
                                        <div className="relative size-full">
                                        <Image
                                            src={img.MainImage}
                                            alt={img.name || "product image"}
                                            fill
                                            sizes="30vw"
                                            className="object-cover "
                                        />
                                        </div>
                                    </div>
                                    ))}

                                    {order.items.length > 1 && (
                                    <div className="absolute inset-0 bg-black/50 text-white font-mono font-bold flex items-center justify-center z-50">
                                        + {order.items.length - 1}
                                    </div>
                                    )}

                                    <div className="absolute top-[10px] right-[10px] bg-black text-white py-1 px-3 text-[8px] tracking-[2px] font-bold font-mono uppercase z-50">
                                        {order.status}
                                    </div>
                                </div>

                                <div className="h-full w-[70%] flex flex-col justify-between ps-10 gap-3 uppercase text-[10px] font-bold font-mono">
                                    <div className="flex flex-col gap-2">
                                        <div className="text-black/60">{formatDate(order.date || order.updatedAt)}</div>
                                        <h1>name : {order.customer?.name}</h1>
                                        <h2>user name : @{order.customer?.username}</h2>
                                        <h3>email : {order.customer?.email}</h3>
                                        <h4>address : {order.address}</h4>
                                        <h5>number phone : {order.numberPhone}</h5>
                                    </div>

                                    <div className="border-y border-black flex py-2 justify-between items-center">
                                        <span>{order.quantity} pieces</span>
                                        <span className="w-[1px] h-[10px] bg-black"></span>
                                        <span>payment : {order.paymentInfo?.paymentStatus}</span>
                                        <span className="w-[1px] h-[10px] bg-black"></span>
                                        <span>total : {order.total?.toFixed(2)} $</span>
                                    </div>

                                    <div className="w-full flex gap-1">
                                    {(status === 'pending') && (
                                        <button
                                            onClick={() => {
                                                setLoading(true)
                                                cancelOrder(order.id , setLoading , setMsg , setOrders , baseUrl , user , msg)
                                            }}
                                            className="w-[50%] cursor-pointer bg-red-600 text-white uppercase py-2 font-bold font-mono"
                                            >
                                            cancel
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            handleOpenDetails(order , order.status)
                                        }}
                                        className={`${
                                        status === 'completed'  || status === 'on shipping' ? 'w-full' : 'w-[50%]'
                                        } bg-black cursor-pointer text-white uppercase py-2 font-bold font-mono`}
                                    >
                                        details
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            ))}
                            <div className="absolute h-[30px] top-[-15px] left-[20px] bg-white z-50 px-10 flex justify-center items-center uppercase tracking-[5px]">
                                <span className="text-[10px] font-bold font-mono">{label}</span>
                            </div>
                        </div>
                        );
                    })
                }
            </>
        )
    }
    const smallScreen = () => {
        return(
            <>
                {
                    sections.map(({ status, label }) => {
                        const filtered = orders.filter((order) => order.status === status);
                        if (!filtered.length) return null;

                        return (
                        <div key={status} className="pt-20 flex flex-col border-t-2 border-black relative">
                            {filtered.map((order , index) => (
                            <div key={order.id} className="w-full h-[250px] relative px-5 mb-30">
                                <div className="w-full h-full font-mono font-bold text-[10px] uppercase flex gap-5 flex-col">
                                    <div className="w-full gap-5 flex h-[60%]">
                                        <div className="h-full relative flex gap-2 flex-wrap justify-center items-center w-[40%]">
                                            {order.items?.slice(0, 1).map((img, i) => (
                                            <div key={i} className={`w-[100%] h-[100%] px-5`}>
                                                <div className="relative size-full">
                                                    <Image
                                                        src={img.MainImage}
                                                        alt={img.name || "product image"}
                                                        fill
                                                        sizes="40vw"
                                                        className="object-cover "
                                                    />
                                                    {order.items.length > 1 && (
                                                        <div className="absolute inset-0 bg-black/50 text-white font-mono font-bold flex items-center justify-center z-50">
                                                            + {order.items.length - 1}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                        <div className="flex flex-col justify-center w-[60%] gap-2">
                                            <div className="text-black/60 text-[8px]">{formatDate(order.date || order.updatedAt)}</div>
                                            <h1>name : {order.customer?.name}</h1>
                                            <h2>user name : @{order.customer?.username}</h2>
                                            <h3>email : {order.customer?.email}</h3>
                                            <h4>address : {order.address}</h4>
                                            <h5>number phone : {order.numberPhone}</h5>
                                        </div>
                                    </div>

                                    <div className="h-[40%] w-full flex flex-col justify-center gap-3 uppercase text-[10px] font-bold font-mono">
                                        <div className="border-y border-black flex py-2 justify-between items-center">
                                            <span>{order.quantity} pieces</span>
                                            <span className="w-[1px] h-[10px] bg-black"></span>
                                            <span>payment : {order.paymentInfo?.paymentStatus}</span>
                                            <span className="w-[1px] h-[10px] bg-black"></span>
                                            <span>total : {order.total?.toFixed(2)} $</span>
                                        </div>

                                        <div className="w-full flex gap-1">
                                        {(status === 'pending') && (
                                            <button
                                                onClick={() => {
                                                    setLoading(true)
                                                    cancelOrder(order.id , setLoading , setMsg , setOrders , baseUrl , user , msg)
                                                }}
                                                className="w-[50%] cursor-pointer bg-red-600 text-white uppercase py-2 font-bold font-mono"
                                                >
                                                cancel
                                            </button>
                                        )}
                                        <button
                                            onClick={() => {
                                                handleOpenDetails(order , order.status)
                                            }}
                                            className={`${
                                            status === 'completed'  || status === 'on shipping' ? 'w-full' : 'w-[50%]'
                                            } bg-black cursor-pointer text-white uppercase py-2 font-bold font-mono`}
                                        >
                                            details
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                            <div className="absolute h-[30px] top-[-15px] left-[20px] bg-white z-50 px-10 flex justify-center items-center uppercase tracking-[5px]">
                                <span className="text-[10px] font-bold font-mono">{label}</span>
                            </div>
                        </div>
                        );
                    })
                }
            </>
        )
    }

    return (
        <>
            <section className="container m-auto flex flex-col pt-40">
                {screenWidth >= 1024 && bigScreen()}
                {(screenWidth >= 768 && screenWidth < 1024)&& middleScreen()}
                {screenWidth < 768 && smallScreen()}
            </section>
            <OrderDeatails order={openDetails.data} openDetails={openDetails} setOpenDetails={setOpenDetails} formatDate={formatDate} msg={msg.orderDetailsMsg} baseUrl={baseUrl} setLoading={setLoading} setOrders={setOrders} setMsg={setMsg}/>
            <Toest msg={msg.mainPageMsg} />
        </>
    );
}
