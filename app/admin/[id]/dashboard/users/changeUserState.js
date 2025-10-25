export async function changeUserState(user, setIsLoading, setMsg, setUsers, baseUrl, item) {
  try {
    setIsLoading(true);

    const res = await fetch(`${baseUrl}/api/data/users/${user.id}/orders/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" }),
    });

    const data = await res.json();
    const updatedOrder = data.data; 

    consolelog(data)
    if (!res.ok) {
      setMsg(
        <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
          failed to update order
        </p>
      );
      return;
    }

    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? {
              ...u,
              orders: u.orders.map((o) =>
                o.id === updatedOrder.id ? updatedOrder : o
              ),
            }
          : u
      )
    );

    setMsg(
      <p className="px-10 py-3 text-[10px] font-bold font-mono bg-green-600 text-white uppercase">
        order updated successfully
      </p>
    );
  } catch (error) {
    console.error(error);
    setMsg(
      <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
        error updating order
      </p>
    );
  } finally {
    setIsLoading(false);
  }
}
