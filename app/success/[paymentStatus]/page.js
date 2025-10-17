"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/slices/addProduct";
import { useParams } from "next/navigation";

export default function SuccessPage() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const hasRun = useRef(false);
  const user = useSelector((state) => state.login.data);
  const cart = useSelector((state) => state.addProduct.cart);
  const dispatch = useDispatch();
  const { paymentStatus } = useParams();
  const total = cart?.reduce((acc, el) => acc + el.price * el.quantity, 0) || 0;
  const quantity = cart?.reduce((prev, next) => prev + next.quantity, 0) || 0;


  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (!user?.id) {
      console.warn("User not logged in or userId missing.");
      setLoading(false);
      return;
    }

    if (!cart?.length) {
      console.warn("No items in cart.");
      setLoading(false);
      return;
    }

    console.log("User order quantity:", quantity);

    const sendOrder = async () => {
      try {
        const orderPayload = {
          customer: user,
          items: cart,
          address: user.address,
          numberPhone: user.numberPhone,
          total,
          quantity,
          status: "pending",
          paymentInfo: { paymentStatus: paymentStatus || "paid" },
        };

        const res = await fetch(`http://localhost:3000/api/data/users/${user.id}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderPayload),
          }
        );

        const data = await res.json();
        console.log("User order added:", data);

        if (res.ok) {
          setSuccess(true);
          dispatch(clearCart());
        } else {
          console.error("Order submission failed:", { data });
        }
      } catch (err) {
        console.error("Error sending order:", err);
      } finally {
        setLoading(false);
      }
    };

    sendOrder();
  }, [user, cart, paymentStatus, total, dispatch]);

  if (loading) {
    return (
      <div className="flex bg-white gap-5 flex-col justify-center items-center fixed left-0 top-0 w-screen min-h-screen z-[5000]">
        <p className="text-sm font-mono animate-pulse">Processing your order...</p>
      </div>
    );
  }

  return (
    <div className="flex bg-white gap-5 flex-col justify-center items-center fixed left-0 top-0 w-screen min-h-screen z-[5000]">
      {success ? (
        <>
          <div className="flex gap-3 items-center">
            <h1 className="text-[15px] font-bold font-mono uppercase">
              {paymentStatus === 'cash' ?
                'Order Successful'
                  :
                'Payment Successful'
              }
            </h1>
          </div>
          <div>
            <Link
              className="bg-black text-white px-3 py-2 text-[10px] font-bold font-mono uppercase"
              href={`/orders/${user.username}/${user.id}`}
            >
              View Your Orders
            </Link>
          </div>
        </>
      ) : (
        <div className="text-red-600 text-[10px] font-bold font-mono uppercase">
          Failed to submit order
        </div>
      )}
    </div>
  );
}
