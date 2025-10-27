export async function changeUserState(user, setIsLoading, setMsg, setAllOrders, baseUrl, item) {
  try {
    setIsLoading(true);

    const res = await fetch(`${baseUrl}/api/data/users/${user.id}/orders/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" }),
    });

    const data = await res.json();
    const updatedOrder = data.data; 

    console.log(data)
    if (!res.ok) {
      setMsg(
        <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
          failed to update order
        </p>
      );
      return;
    }


    setAllOrders((prev) =>
      prev.map((el) =>
        el.id === item.id ? { ...el, status: "completed" } : el
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
