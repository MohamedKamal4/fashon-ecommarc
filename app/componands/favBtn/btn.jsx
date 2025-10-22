'use client'

import { useDispatch, useSelector } from "react-redux";
import { addProductToFavoriteList, removeProductFromFavoriteList } from "../../redux/slices/favoriteList";
import { TiHeartFullOutline } from "react-icons/ti";

export default function FavBtn({ element, setMsg }) {
  const favoriteList = useSelector((state) => state.favoriteList.favoriteList);
  const user = useSelector((state) => state.login.data);
  const dispatch = useDispatch();

  async function handleAddToFavorite(product) {
    const find = favoriteList.some((el) => el.id === product.id);
    const newList = find
      ? favoriteList.filter((el) => el.id !== product.id)
      : [...favoriteList, product];

    if (!find) {
      dispatch(addProductToFavoriteList(product));
      setMsg(
        <p className="px-10 py-3 text-[10px] font-bold font-mono bg-green-600 text-white uppercase">
          ADDED PRODUCT
        </p>
      );
    } else {
      dispatch(removeProductFromFavoriteList(product));
      setMsg(
        <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
          REMOVED PRODUCT
        </p>
      );
    }

    try {
      const res = await fetch(`http://localhost:3000/api/data/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ favoriteList: newList })
      });
      const data = await res.json();
      console.log('Updated user:', data);
    } catch (err) {
      console.error('Error updating favorites:', err);
    }
  }

  return (
    <div className="flex items-center gap-5">
      <button
        onClick={() => handleAddToFavorite(element)}
        className="p-1 cursor-pointer"
      >
        {favoriteList.some((item) => item.id === element.id) ? (
          <TiHeartFullOutline color="red" size={15} />
        ) : (
          <TiHeartFullOutline color="black" size={15} />
        )}
      </button>
    </div>
  );
}
