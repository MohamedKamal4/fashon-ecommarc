
export async function updateItem(
  newItemData,
  orderId,
  itemId,
  setOpenDetails,
  msg,
  baseUrl,
  setLoading,
  user,
  setOrders,
  setMsg
) {
  setLoading(true);

try {
    
    
    const resItem = await fetch(`${baseUrl}/api/data/users/${user.id}/orders/${orderId}/items/${itemId}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItemData),
    }
    );
    

    if (!resItem.ok) throw new Error(`Failed to update item: ${resItem.statusText}`);

    const updatedItem = await resItem.json();

    setOpenDetails((prev) => {
      const updatedItems = prev.data.items.map((it) =>
        it.id === itemId ? updatedItem : it
      );

      const newTotal = updatedItems.reduce((acc, item) => acc + (item.price || 0), 0);
      const newQuantity = updatedItems.reduce((acc, item) => acc + (item.quantity || 0), 0);

      const updatedOrder = {
        ...prev.data,
        items: updatedItems,
        total: newTotal,
        quantity: newQuantity,
      };

      fetch(`${baseUrl}/api/data/users/${user?.id}/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOrder),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to update order totals: ${res.statusText}`);
          return res.json();
        })
        .then(() => {
          console.log("Order totals updated successfully");
        })
        .catch((err) => {
          setMsg((prevMsg) => ({
            ...prevMsg,
            orderDetailsMsg: (
              <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
                {`Error updating order totals - ${err.message}`}
              </p>
            ),
          }));
        });

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? updatedOrder : order))
      );

      return { ...prev, data: updatedOrder };
    });

    setMsg((prevMsg) => ({
      ...prevMsg,
      orderDetailsMsg: (
        <p className="px-10 py-3 text-[10px] font-bold font-mono bg-green-600 text-white uppercase">
          Item and Order updated successfully
        </p>
      ),
    }));
  } catch (err) {
    setMsg((prevMsg) => ({
      ...prevMsg,
      orderDetailsMsg: (
        <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
          {`Error updating item - ${err.message}`}
        </p>
      ),
    }));
  } finally {
    setLoading(false);
  }
}
