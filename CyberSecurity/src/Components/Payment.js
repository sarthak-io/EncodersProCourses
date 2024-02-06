import React, { useContext, useEffect, useState } from 'react'
import app from './Firebase'
import { getDatabase, ref, set, get, update } from 'firebase/database';
import User from './Global';
import useRazorpay from "react-razorpay";
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from './Animations/Animation - 1705558534465.json';
import { ToastContainer,toast } from 'react-toastify';
export default function Payment(props) {


    const [Razorpay] = useRazorpay();
    const [user, setUser] = useContext(User);
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [number, setNubmer] = useState(user.number)

    const [showThanks, setShowThanks] = useState(false)
    const [active, setActive] = useState(9)
    const currency = "INR";
    const receiptId = "qwsaq1";

    const paymentHandler = async (e) => {

        const amount = active * 100
        const response = await fetch("https://p-1-beta.vercel.app/order", {
            method: "POST",
            body: JSON.stringify({
                amount,
                currency,
                receipt: receiptId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const order = await response.json();
        // console.log(order);

        var options = {
            key: "rzp_test_c2C0XeZvdHLJuJ", // Enter the Key ID generated from the Dashboard
            amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency,
            name: "ENCODERSPRO", //your business name
            description: "",
            image: "/brand.svg",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: async function (response) {
                const body = {
                    ...response,
                };

                const validateRes = await fetch(
                    "https://p-1-beta.vercel.app/order/validate",
                    {
                        method: "POST",
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const jsonRes = await validateRes.json();
                // Check if the payment is successful
                if (jsonRes.msg === "success") {
                   
                
                    if ( !name && !email && !number) {
                      toast.warn('Please fill in all fields.');
                      return;
                    }
                
                    const userData = {
                      name,
                      email,
                      number,
                    };
                
                   
                    await set(ref(getDatabase(), `collections/${name}`), userData);
                    toast.success("Your are now registered!");
                    setShowThanks(true);
                }
            },
            prefill: {
                //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                name: name, //your customer's name
                email: email,
                contact: number, //Provide the customer's phone number for better conversion rates
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            toast.error(response.error.code);
        
        });
        rzp1.open();
        e.preventDefault();
    };
    return (
        <div className=' w-full  flex justify-start items-center lg:px-32 lg:h-[150vh] flex-col  bg-white  px-4 '>
            <img src='images/pay-bg.svg' className=' absolute z-0 left-0 top-0 object-cover w-full h-[160vh]' />
            <h1 className=' font-extrabold lg:text-8xl text-text-black-dark text-5xl my-5  lg:my-3 z-50'>Cyber Monday</h1>
            <h1 className=' font-extrabold lg:text-3xl  text-text-black-dark text-xl text-center mb-8 z-50'>Register at just  <span className=' text-text-orange font-extrabold text-4xl'>₹{active}</span> to Get started and avail limited time offer</h1>
            {showThanks ? (<ThankYou />) : (
                <div className=" w-full flex justify-center lg:flex-row flex-col items-center px-4 lg:px-20 z-50">
                    <div className='lg:w-1/2 h-full w-full p-3 flex flex-col bg-bg-orange '>
                        <div className=' w-full flex lg:gap-x-5 gap-x-2 justify-center items-center font-bold'>
                            <button
                                className={`${active === 9
                                    ? 'bg-white text-text-orange'
                                    : 'border-2 border-[#FFFFFF] text-white bg-transparent'
                                    } w-1/4 rounded flex justify-center items-center h-12 transition-all`}
                                onClick={() => setActive(9)}
                            >
                                Basic Plan
                            </button>
                            <button
                                className={`${active === 99
                                    ? 'bg-white text-text-orange'
                                    : 'border-2 border-[#FFFFFF] text-white bg-transparent'
                                    } w-3/4 rounded flex justify-center items-center h-12 transition-all`}
                                onClick={() => setActive(99)}
                            >
                                Advanced Plan
                            </button>


                        </div>

                        {active === 9 ? (
                            <>
                                <div className=' w-full flex flex-col  text-white  font-medium justify-start items-start'>
                                    <p className='text-4xl  font-bold my-3'>
                                        Description
                                    </p>
                                    <p>
                                    ENCODERSPRO cybersecurity workshops
                                        registration
                                    </p>
                                    <p className=' text-2xl  font-bold my-3'>
                                        Cart Summary
                                    </p>
                                    <div className=' flex   lg:font-semibold border-[#ffffff] border w-full mb-5 '>
                                        <div className=' w-3/4 flex flex-col justify-start'>
                                            <div className=' w-full h-12 border border-[#ffffff] flex justify-start p-3 items-center'>
                                                Product Details:
                                            </div>
                                            <div className=' w-full lg:h-20 h-28 border border-[#ffffff] flex justify-start p-3 items-center'>
                                                Cybersecurity workshops registration ticket from ENCODERSPRO private limited 2021.
                                            </div>
                                        </div>

                                        <div className=' w-1/4 flex flex-col justify-start'>
                                            <div className=' w-full h-12 border border-[#ffffff] flex justify-center items-center'>
                                                Quantity:
                                            </div>
                                            <div className=' w-full lg:h-20 h-28 border border-[#ffffff] flex justify-center items-center'>
                                                1
                                            </div>
                                        </div>
                                    </div>

                                    <div className=' flex w-full text-white flex-col justify-center text-lg  items-center'>
                                        <div className=' flex w-full  border-white border-t border-b justify-between p-1'>
                                            <div className=' w-1/2 justify-start flex items-center'>
                                                Subtotal
                                            </div>
                                            <div className=' w-1/2 justify-end flex items-center'>
                                                ₹{active}.00
                                            </div>
                                        </div>
                                        <div className=' flex w-full  border-white  justify-between p-1'>
                                            <div className=' w-1/2 justify-start flex items-center'>
                                                Tax + GST
                                            </div>
                                            <div className=' w-1/2 justify-end flex items-center'>
                                                + 0.00
                                            </div>
                                        </div>
                                        <div className=' flex w-full  border-white border-t border-b justify-between p-1'>
                                            <div className=' w-1/2 justify-start flex items-center'>
                                                Total
                                            </div>
                                            <div className=' w-1/2 justify-end flex items-center'>
                                                ₹{active}.00
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className=' w-full flex flex-col  text-white  font-medium justify-start items-start'>
                                    <p className='text-4xl  font-bold my-3'>
                                        Description
                                    </p>
                                    <p>
                                        Premium cybersecurity advance batch registration plus lifetime batch membership and 5+ expert mentors one to one meet.
                                    </p>
                                    <p className=' text-2xl  font-bold my-3'>
                                        Cart Summary
                                    </p>
                                    <div className=' flex   lg:font-semibold border-[#ffffff] border w-full mb-5 '>
                                        <div className=' w-3/4 flex flex-col justify-start'>
                                            <div className=' w-full h-12 border border-[#ffffff] flex justify-start p-3 items-center'>
                                                Product Details:
                                            </div>
                                            <div className=' w-full lg:h-20 h-28 border border-[#ffffff] flex justify-start p-3 items-center'>
                                                Advance cybersecurity workshops plus ultimate hacker bundle registration ticket from ENCODERSPRO private limited 2021.
                                            </div>
                                        </div>

                                        <div className=' w-1/4 flex flex-col justify-start'>
                                            <div className=' w-full h-12 border border-[#ffffff] flex justify-center items-center'>
                                                Quantity:
                                            </div>
                                            <div className=' w-full lg:h-20 h-28 border border-[#ffffff] flex justify-center items-center'>
                                                1
                                            </div>
                                        </div>
                                    </div>

                                    <div className=' flex w-full text-white flex-col justify-center text-lg  items-center'>
                                        <div className=' flex w-full  border-white border-t border-b justify-between p-1'>
                                            <div className=' w-1/2 justify-start flex items-center'>
                                                Subtotal
                                            </div>
                                            <div className=' w-1/2 justify-end flex items-center'>
                                                ₹{active}.00
                                            </div>
                                        </div>
                                        <div className=' flex w-full  border-white  justify-between p-1'>
                                            <div className=' w-1/2 justify-start flex items-center'>
                                                Tax + GST
                                            </div>
                                            <div className=' w-1/2 justify-end flex items-center'>
                                                + 0.00
                                            </div>
                                        </div>
                                        <div className=' flex w-full  border-white border-t border-b justify-between p-1'>
                                            <div className=' w-1/2 justify-start flex items-center'>
                                                Total
                                            </div>
                                            <div className=' w-1/2 justify-end flex items-center'>
                                                ₹{active}.00
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className='flex flex-col  lg:w-1/2  shadow w-full  px-8 py-10 z-40 bg-white text-gray-600'>
                        <h1 className='text-black text-3xl font-semibold mb-10 text-center'><span className='  text-text-logo'>ENCODERSPRO </span>Registration</h1>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="space-y-5 "
                        >
                            <div>
                                <label className="font-medium">
                                    Full name
                                </label>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    id='name-1'
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium ">
                                    Email
                                </label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    id='email-1'
                                    type="email"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Phone number
                                </label>
                                <div className="relative mt-2">
                                    <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                                        <img src='images/in.svg' className=' w-full h-full object-cover' />

                                    </div>
                                    <input
                                        onChange={(e) => setNubmer(e.target.value)}
                                        id='phone-1'
                                        type="number"
                                        value={number}
                                        placeholder="+91 55 000-000"
                                        required
                                        className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                                    />
                                </div>
                            </div>


                        </form>


                        <button onClick={paymentHandler}
                            className="w-full px-4 py-2  bg-bg-orange  font-medium  text-white  mt-16  rounded-lg duration-150"
                        >
                            Checkout
                        </button></div>


                </div>)

            }
            <ToastContainer/>
            <img src='images/PngItem_575863 1.png' className=' my-20 object-cover' />
        </div>
    )
}

const ThankYou = () => {
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        // Google Tag Manager script
        const script = document.createElement('script');
        script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WX5264HH');
      `;
        document.head.appendChild(script);

        // Cleanup function to remove the script when the component unmounts
        return () => {
            document.head.removeChild(script);
        };
    }, []); // Empty dependency array ensures the script runs only once on mount

    const defaultOptions = {
        loop: true,
        autoplay: !isPaused,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <>
            <div className="flex flex-col lg:w-[28vw] shadow w-full rounded-2xl px-8 py-10 z-40 bg-white text-gray-600">
                <h1 className="text-black text-3xl font-semibold mb-5 text-center">
                    <span className="text-text-orange">Thank </span>You
                </h1>

                <p className="text-sm text-text-black-dark text-center">Congratulations for registering in this workshops and being a part of #ENCODERSPROARMY</p>
                <div className="justify-center items-center flex">
                    <Lottie options={defaultOptions} />
                </div>
                <Link
                    to="/"
                    className="w-full px-4 py-2 bg-bg-orange font-medium flex justify-center items-center text-white mt-16 rounded-lg duration-150"
                >
                    Back to Home
                </Link>
            </div>

            {/* Add noscript section to body */}
            <noscript>
                <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-WX5264HH"
                    height="0"
                    width="0"
                    style={{ display: 'none', visibility: 'hidden' }}
                ></iframe>
            </noscript>
        </>
    );
};



