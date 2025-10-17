'use client';

import { useEffect , useState , useMemo } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import OrderDeatails from "./orderDetails";
import Toest from "../../../componands/toestMsg/toest";

export default function OrdersProducts() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.login.data);
    const isAuth = useSelector((state) => state.login.isAuthenticated);
    const router = useRouter();
    const [msg , setMsg] = useState({
        cancelOrder: null ,
        removeItemFromOrder: null
    })
    const [openDetails , setOpenDetails] = useState({
        status: false,
        data : {}
    })


    useEffect(() => {
        if (!isAuth) router.replace('/');
    }, [isAuth, router]);

    useEffect(() => {
        if (msg) {
            const timer = setTimeout(() => setMsg({
                cancelOrder: null ,
                removeItemFromOrder: null
            }), 3000)
            return () => clearTimeout(timer)
        }
    }, [msg])

    useEffect(() => {
        if (!isAuth || !user?.id) return;
        fetch(`http://localhost:3000/api/data/users/${user.id}/orders`)
        .then((res) => res.json())
        .then((res) => {
            setOrders(res);
            setLoading(false)
        })
    },[isAuth, user?.id , openDetails.data])
    
    function cancelOrder(orderId){
        fetch(`http://localhost:3000/api/data/users/${user.id}/orders/${orderId}`,{
            method: 'DELETE' 
        })
        .then((res) => res.json())
        .then((res) => {
            setLoading(false)
            setMsg({...msg , cancelOrder : <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
                order in canceled
            </p>})
            setOrders((prev) => prev.filter((el) => el.id !== orderId));
        } )
    }

    function removeItemFromOrder(order , orderId , itemIdToRemove) {
        setLoading(true)

        if(order.items.length === 1){
            fetch(`http://localhost:3000/api/data/users/${user?.id}/orders/${orderId}`, {
                method: "DELETE",
            })
            setOrders([])
            setLoading(false)
            setOpenDetails({
                status: false,
                data : {}
            })
            return
        }

        const updatedItems = order.items.filter(item => String(item.id) !== String(itemIdToRemove));
        const newTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

        fetch(`http://localhost:3000/api/data/users/${user?.id}/orders/${orderId}`, {
            method: "DELETE",
        })

        const newOrder = {
            ...order,
            items: updatedItems,
            total: newTotal,
            date: new Date().toISOString(),
        };
        
        fetch(`http://localhost:3000/api/data/users/${user?.id}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newOrder),
        })
        .then((res) => res.json())
        .then((res) => {
            setLoading(false)
            setOpenDetails({ ...openDetails, data: res.data });
            setMsg({...msg , removeItemFromOrder : <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
                removed item
            </p>})
            console.log("✅ Order replaced successfully:", res.data);
        })
    }

    function handleOpenDetails(order){
        setLoading(true)
        setTimeout(() => {
            setOpenDetails({ data : order , status : true})
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

    

    return (
        <>
            <section className="container m-auto flex flex-col pt-40">
                {sections.map(({ status, label }) => {
                    const filtered = orders.filter((order) => order.status === status);
                    if (!filtered.length) return null;

                    return (
                    <div key={status} className="pt-20 flex flex-wrap border-t-2 border-black relative">
                        {filtered.map((order) => (
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
                                    <div className="text-black/60">{formatDate(order.createdAt)}</div>
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
                                            cancelOrder(order.id)
                                        }}
                                        className="w-[50%] cursor-pointer bg-red-600 text-white uppercase py-2 font-bold font-mono"
                                        >
                                        cancel
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        handleOpenDetails(order)
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
                })}
            </section>
            <OrderDeatails order={openDetails.data} openDetails={openDetails} setOpenDetails={setOpenDetails} formatDate={formatDate} removeItemFromOrder={removeItemFromOrder} msg={msg.removeItemFromOrder} />
            <Toest msg={msg.cancelOrder} />
        </>
    );
}
