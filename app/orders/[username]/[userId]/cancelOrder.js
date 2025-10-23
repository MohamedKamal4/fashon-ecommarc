export function cancelOrder(orderId , setLoading , setMsg , setOrders , baseUrl , user , msg){
    fetch(`${baseUrl}/api/data/users/${user.id}/orders/${orderId}`,{
        method: 'DELETE' 
    })
    .then((res) => res.json())
    .then((res) => {
        setLoading(false)
        setMsg({...msg , mainPageMsg : <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
            order is canceled
        </p>})
        setOrders((prev) => prev.filter((el) => el.id !== orderId));
    } )
}