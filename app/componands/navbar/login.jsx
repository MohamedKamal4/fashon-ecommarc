'use client'

import { useEffect, useState } from "react"
import { RxEyeOpen } from "react-icons/rx";
import { RxEyeClosed } from "react-icons/rx";
import { useDispatch } from "react-redux"
import { login } from "../../redux/slices/loginSlice"
import { handleFormInput } from './handleFormInput'
import { handleFormOnSubmit } from "./handleFormOnSubmit";
import Toest from "../toestMsg/toest";


export default function LogIn({openLogin , setOpenLogin , noClose}){
    const [isRemember , setIsRemember] = useState(false)
    const [switchForm , setSwitchForm] = useState(false)
    const [data , setData] = useState(null)
    const [msg , setMsg] = useState(null)
    const dispatch = useDispatch()
    const [showPassword , setShowPassword] = useState({
        password: false,
        confirmPassword: false
    })

    useEffect(() => {
        fetch("http://localhost:3000/api/data/users")
        .then((res) => res.json())
        .then((res) => {
            setData(res)
        })
    } ,[])
    
    const [formData , setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const registerInputs = [
        {
            inputName : 'username',
            placeholder : 'user name',
            inputType : 'text',
        },
        {
            inputName : 'fullName',
            placeholder : 'full Name',
            inputType : 'text',
        },
        {
            inputName : 'email',
            placeholder : 'email',
            inputType : 'email',
        },
        {
            inputName : 'password',
            placeholder : 'password',
            inputType : 'password',
        },
        {
            inputName : 'confirmPassword',
            placeholder : 'confirm Password',
            inputType : 'password',
        },
    ]

    const loginInputs = [
        {
            inputName : 'username',
            placeholder : 'user name',
            inputType : 'text',
        },
        {
            inputName : 'password',
            placeholder : 'password',
            inputType : 'password',
        }
    ]

    const [errors, setErrors] = useState({
        username: null,
        email: null,
        fullName: null,
        password: null,
        confirmPassword: null,
    });

    
    function handleSocendBtn(){
        setSwitchForm(!switchForm)
        setFormData({
            username: '',
            email: '',
            fullName: '',
            password: '',
            confirmPassword: ''
        })
        setErrors({
            username: null,
            email: null,
            password: null,
            confirmPassword: null,
        })
    }

    useEffect(() => {
        if (msg) {
            const timer = setTimeout(() => setMsg(null), 3000)
            return () => clearTimeout(timer)
        }
    }, [msg])


    return(
         <div className={`flex bg-white flex-col gap-5 overflow-hidden justify-center items-center fixed inset-0 w-full min-h-dvh nav-vid transition-transform ${openLogin ? 'opacity-100 z-[5000] top-0 ' : 'opacity-0 z-0 top-[-200%] ' }`}>
            <form className="w-[90%] xl:w-[40%] flex flex-col gap-5" onSubmit={ (e) => {
                    e.preventDefault();
                    handleFormOnSubmit(switchForm , setMsg , setOpenLogin , formData , setFormData , setErrors , noClose , data , dispatch , login , isRemember , errors)
                }}>
                {(switchForm ? registerInputs : loginInputs).map((input , index) => {
                    return(
                        <div key={index} className="w-full relative">
                            <input
                            onBlur={() => handleFormInput(input.inputName, formData, switchForm, setErrors , data)}
                            value={formData[input.inputName]} onChange={((e) => {setFormData({...formData , [input.inputName] : e.target.value })})} type={ input.inputType === "password" && showPassword[input.inputName] ? "text" : input.inputType } placeholder={input.placeholder} className=" border-[1px] placeholder:uppercase placeholder:text-black border-black py-2 text-[10px] w-full text-center focus:outline-0 placeholder:text-[8px] tracking-wide" />
                            {input.inputType === 'password' &&
                                <div className=" absolute top-0 right-0 h-full w-fit">
                                    <button type="button" onClick={(() => {setShowPassword({...showPassword , [input.inputName]: !showPassword[input.inputName],})})} className="h-full px-5 cursor-pointer">
                                        {showPassword[input.inputName] ?
                                            <RxEyeClosed size={12} />
                                            :
                                            <RxEyeOpen size={12}/>
                                        }
                                    </button>
                                </div>
                            }
                            {errors[input.inputName] &&
                                <div className="absolute flex items-center gap-2 top-full left-0 mt-1 text-[9px] font-extrabold uppercase text-red-600 font-mono">
                                    <span className="w-[5px] h-[5px] bg-red-600 rounded-full"></span>
                                    {errors[input.inputName]}
                                </div>
                            }
                        </div>
                    )
                })}
                <button  type='button' onClick={(() => {setIsRemember(!isRemember)})} className=" cursor-pointer text-[10px] flex gap-3 items-center">
                    <span className=" w-[10px] flex justify-center items-center h-[10px] rounded-full border-[1px] border-black">
                        {isRemember &&
                            <span className=" w-[50%] h-[50%] bg-black rounded-full">

                            </span>
                        }
                    </span>
                    REMEMBER ME
                </button>
                <button className="py-2 cursor-pointer text-[10px] w-full text-center bg-black border-0 outline-0 focus:outline-0 tracking-wide text-white">
                    {switchForm ?
                        'REGISTER'
                        :
                        'LOG IN'
                    }
                </button>
                <button type="button" onClick={handleSocendBtn} className="py-2 cursor-pointer text-[10px] w-full text-center bg-white border-[1px] border-black  outline-0 focus:outline-0 tracking-wide text-black">
                    {switchForm ?
                        'LOG IN'
                        :
                        'REGISTER'
                    }
                </button>
            </form>
            {!noClose &&
                <div className=" absolute top-[30px] right-[30px]">
                    <button className="z-[5000] w-[50px] h-[50px] focus:outline-0 flex flex-col justify-around cursor-pointer relative" onClick={(() => { setOpenLogin(false) })}>
                            <span
                                className={`w-full h-[1px] transform transition-all duration-300 translate-y-[5px] rotate-45 bg-black`}
                            ></span>
                            <span
                                className={`w-full h-[1px] transform transition-all duration-300 -translate-y-[20px] -rotate-45 bg-black`}
                            ></span>
                    </button> 
                </div>
            }
            {noClose &&
                <div className="w-full flex justify-center items-center py-10 text-[10px] font-bold font-mono">
                    <h5 className=" uppercase tracking-[3px] text-red-600">[ you most login first ]</h5>
                </div>
            }
            <Toest msg={msg} />
        </div>
    )
}