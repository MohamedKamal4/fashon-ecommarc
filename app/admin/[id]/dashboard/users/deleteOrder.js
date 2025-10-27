export async function deleteOrder(user, setMsg, setIsLoading, setUsers , baseUrl , orderId) {
  try {
    setIsLoading(true);

    const res = await fetch(`${baseUrl}/api/data/users/${user.id}/orders/${orderId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      setMsg(
        <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
          order deletion failure
        </p>
      );
      return;
    }

    setUsers((prev) =>
      prev.map((el) =>
        el.id === user.id
          ? { ...el, orders: el.orders.filter((order) => order.id !== orderId) }
          : el
      )
    );

    setMsg(
      <p className="px-10 py-3 text-[10px] font-bold font-mono bg-green-600 text-white uppercase">
        successfully deleted order
      </p>
    );
  } catch (error) {
    setMsg(
      <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
        error deleting order
      </p>
    );
  } finally {
    setIsLoading(false);
  }
}
