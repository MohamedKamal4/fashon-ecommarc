export async function blockUser(user, setIsLoading, setMsg, setUsers, baseUrl) {
  try {
    setIsLoading(true);

    const newState = user.userState === "active" ? "blocked" : "active";

    const res = await fetch(`${baseUrl}/api/data/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userState: newState }),
    });

    const data = await res.json();
    console.log("Updated user:", data.user);

    if (!res.ok) {
      setMsg(
        <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
          user block failed
        </p>
      );
      return;
    }

    setUsers((prev) =>
      prev.map((el) => (el.id === user.id ? { ...el, ...data.user } : el))
    );

    setMsg(
      <p className="px-10 py-3 text-[10px] font-bold font-mono bg-green-600 text-white uppercase">
        {newState === "blocked"
          ? "user successfully blocked"
          : "user successfully unblocked"}
      </p>
    );
  } catch (error) {
    console.error(error);
    setMsg(
      <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
        error blocking user
      </p>
    );
  } finally {
    setIsLoading(false);
  }
}
