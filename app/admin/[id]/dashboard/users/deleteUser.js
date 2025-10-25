export async function deleteUser(user, setMsg, setIsLoading, setUsers , baseUrl) {
  try {
    setIsLoading(true);

    const res = await fetch(`${baseUrl}/api/data/users/${user.id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      setMsg(
        <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
          user deletion failure
        </p>
      );
      return;
    }

    setUsers((prev) => prev.filter((el) => el.id !== user.id));

    setMsg(
      <p className="px-10 py-3 text-[10px] font-bold font-mono bg-green-600 text-white uppercase">
        successfully deleted user
      </p>
    );
  } catch (error) {
    setMsg(
      <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
        error deleting user
      </p>
    );
  } finally {
    setIsLoading(false);
  }
}
