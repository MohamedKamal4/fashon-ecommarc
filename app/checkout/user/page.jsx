"use client";

import { useDispatch, useSelector } from "react-redux";
import LogIn from "../../componands/navbar/login";
import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { login } from "../../redux/slices/loginSlice";
import Toest from "../../componands/toestMsg/toest";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckOut() {
  const [isClient, setIsClient] = useState(false);
  const user = useSelector((state) => state.login.data);
  const isAuth = useSelector((state) => state.login.isAuthenticated);
  const cart = useSelector((state) => state.addProduct.cart);
  const [isLoading , setIsLoading] = useState(false)
  const [openList , setOpenList] = useState(false)
  const [status , setStatus] = useState('visa')
  const [msg , setMsg] = useState(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: ""
  });
  const dispatch = useDispatch()
  const router = useRouter()
  const quantity = cart?.reduce((prev, next) => prev + next.quantity, 0) || 0;

  useEffect(() => {
    setIsClient(true);
    if (user) {
      setFormData({
        fullName: user.name || "",
        email: user.email || "",
        phoneNumber: "",
        address: ""
      });
    }
  }, [user]);

  const paymentStatus = ['visa' , 'cash']

  const total = useMemo(() => {
    return cart?.reduce((acc, el) => acc + Number(el.price) * (el.quantity || 1), 0) || 0;
  }, [cart]);


    const handleCheckout = async () => {
      if (formData.fullName === '' || formData.email === '' || formData.address === '' || formData.phoneNumber === '') {
        setIsLoading(false)
        setMsg(<p className=" px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">Please fill in all required fields</p>)
        return;
      }
      
      setIsLoading(true)
      
      if(status === 'visa'){
        const stripe = await stripePromise;
    
        const res = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart.map((item) => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity || 1,
            })),
          }),
        });

        dispatch(login({
            username: user.username,
            name: user.name,
            id: user.id,
            email: user.email,
            address: formData.address,
            numberPhone: formData.phoneNumber ,
            remember: user.remember,
          })
        );
    
        const data = await res.json();
          if (data.url) {
            router.push(data.url)
          } else {
            setMsg(<p className=" px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">Error creating checkout session</p>)
            alert("Error creating checkout session.");
          }
        }else{
          dispatch(login({
              username: user.username,
              name: user.name,
              id: user.id,
              email: user.email,
              address: formData.address,
              numberPhone: formData.phoneNumber ,
              remember: user.remember,
            })
          );
          router.push('/success/cash')
        }
    };

    useEffect(() => {
        if (msg) {
            const timer = setTimeout(() => setMsg(null), 3000)
            return () => clearTimeout(timer)
        }
    }, [msg])

    useEffect(() => {
        if(cart.length === 0){
          router.push('/ShoppingBag')
        }
    }, [cart])


    if (!isClient) return null;

  return (
    <>
      {isAuth ? (
        <section className=" relative">
          <div className="container flex m-auto h-screen">
            <div className="pt-30 uppercase flex flex-col justify-center gap-5 text-[10px] pe-10 font-mono font-bold w-[50%] h-full">
              <h1 className="font-extrabold text-[15px]">Edit your billing address</h1>
              <p className="text-black/70 ">
                To place your order, you must first fill in your account details.
                You can change them in your account at any time.
              </p>

              <div className="flex flex-col gap-5">
                {[
                  { name: "fullName", type: "text", placeholder: "FULL NAME" },
                  { name: "email", type: "email", placeholder: "YOUR E-MAIL" },
                  { name: "address", type: "text", placeholder: "FULL ADDRESS" },
                  { name: "phoneNumber", type: "tel", placeholder: "NUMBER PHONE", pattern: "[0-9]*" },
                ].map((input, i) => (
                  <div key={i} className="bg-white w-full border border-black">
                    <input
                      {...input}
                      value={formData[input.name]}
                      onChange={(e) =>
                        setFormData({ ...formData, [input.name]: e.target.value })
                      }
                      className="p-2 text-[10px] w-full text-start focus:outline-0 placeholder:text-[10px] tracking-wide placeholder:text-black appearance-none"
                    />
                  </div>
                ))}

                <div className="w-full flex gap-1 text-white">
                  <button
                    onClick={handleCheckout}
                    className="py-2 bg-black cursor-pointer w-[20%] tracking-[3px]"
                  >
                    {status === 'visa' ?
                      'PAY NOW'
                      :
                      'CONTINUE'
                    }
                  </button>

                  <div className="w-[50%] bg-black text-white py-2 uppercase text-[10px] flex justify-center items-center gap-5 font-bold font-mono">
                    <div className="flex justify-center items-center gap-2">
                      <span>{quantity}</span>
                      <span>pieces</span>
                    </div>
                    <span className="w-[1px] h-[10px] bg-white"></span>
                    <div className="flex justify-center items-center gap-2">
                      <p>total :</p>
                      <span>{`[ ${total.toFixed(2)} $ ]`}</span>
                    </div>
                  </div>
                  <div className=" w-[30%] h-full px-3 "> 
                    <div className="w-full h-full relative">
                        <button onClick={() => {
                            setOpenList(!openList)
                        }} className="bg-white text-black z-50 flex justify-between items-center text-[10px] font-bold font-mono h-full w-full cursor-pointer border-b-[1px] border-black">
                            {status}
                            {openList ?
                                <IoMdArrowDropup />
                                :
                                <IoMdArrowDropdown />
                            }
                        </button>

                        <ul className={` absolute ${openList ? 'top-[30px]' : 'top-[-1500%] opacity-0'}  bg-white border-[1px] border-black z-50 transition-transform left-0 w-full flex flex-col justify-center`}>
                            {paymentStatus.map((btn , index) => {
                                return(
                                    <li key={index}>
                                        <button onClick={(() => {
                                            setStatus(btn)
                                            setOpenList(false)
                                        })} className="text-[10px] px-3 py-2 w-full cursor-pointer text-black font-bold font-mono">{btn}</button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[50%] h-full pt-30 pb-10 px-20 relative">
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/newHead.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <Toest msg={msg} />
          {isLoading &&
            <div className="fixed top-0 left-0 w-screen h-screen bg-white flex justify-center items-center z-[1000000]">
                <span className="loader"></span>
            </div>
          }
        </section>
      ) : (
        <LogIn openLogin={true} noClose={true} />
      )}
    </>
  );
}
