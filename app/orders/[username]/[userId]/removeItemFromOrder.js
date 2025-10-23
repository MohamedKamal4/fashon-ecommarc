export async function removeItemFromOrder(
  order,
  orderId,
  itemIdToRemove,
  baseUrl,
  setLoading,
  setOpenDetails,
  openDetails,
  user,
  setOrders ,
  setMsg ,
  msg
) {
  setLoading(true);
  try {
    if (order.items.length === 1) {
      await fetch(`${baseUrl}/api/data/users/${user?.id}/orders/${orderId}`, {
        method: "DELETE",
      });
        setOrders([]);
        setOpenDetails({
            status: false,
            data: {},
      });
        setMsg({...msg , mainPageMsg : <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
            order is deleted
        </p>})  
        setLoading(false);
      return;
    }
    const res = await fetch(`${baseUrl}/api/data/orders/${orderId}/items/${itemIdToRemove}`, {
        method: 'DELETE',
    });
    const data = await res.json();
    setOrders((prev) => prev.filter(order => order.id !== data.id));
    setOpenDetails({
       ...openDetails,
       data: {
           ...openDetails.data,
           items: openDetails.data.items.filter((el) => el.id !== itemIdToRemove)
        }
    });
    setMsg({...msg , orderDetailsMsg : <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
        item is deleted
    </p>})  
    setLoading(false);
  } catch (error) {
    console.error('Error removing item from order:', error);
    setLoading(false);
  }
}
