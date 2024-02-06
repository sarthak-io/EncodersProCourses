import React, { useRef ,useContext} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { HeroSection_course_data } from './Data'
import { useNavigate } from 'react-router-dom'
import User from './Global'
export default () => {
    const refs = useRef(null)
    const [user, setUser] = useContext(User);
    const navigate = useNavigate()

    const Submit = () => {
        var name = document.getElementById("name-1").value;
        var phone = document.getElementById("phone-1").value;
        var email = document.getElementById("email-1").value;

        if (document.cookie.includes("formSubmitted=true")) {
            toast.warn("we already got your response!");
            return;
        }

        if (name && phone && email) {
            var formData = {
                name: name,
                phone: phone,
                email: email,

            };

            // Make a POST request to Google Apps Script
            fetch(`${HeroSection_course_data.app_script_link}`, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData)
            })
            .then(response =>{
                const expirationDate = new Date();
                expirationDate.setMonth(expirationDate.getMonth() + 1);
    
                document.cookie = `formSubmitted=true; expires=${expirationDate.toUTCString()}`;
                    toast.success("Your Response submitted successfully🥳")
                    window.location.href = `${HeroSection_course_data.Download_broucher_link}`;

            document.getElementById("name-1").value = "";
            document.getElementById("phone-1").value = "";
            document.getElementById("email-1").value = "";}
            )

             
                .catch (error => {
    toast.error('Error submitting form 😏 ');

});


        } else {
    toast.warn("Please fill in all the fields😏");
}

    }

//Payment Function if needed
    // const Submit = () => {
    //     var name = document.getElementById("name-1").value;
    //     var phone = document.getElementById("phone-1").value;
    //     var email = document.getElementById("email-1").value;

    

    //     if (name && phone && email) {
    //        setUser({
    //         name:name,number:phone,email:email,
    //        })

    //         navigate('/payment')
        
    //     } else {
    //         toast.warn("Please fill in all the fields😏");
    //     }

    // }

    return (
        <>
            <div id='enroll' ref={refs} style={{
                // scale: scalePro,
                // opacity: opacityPro,
                // borderRadius:rounded
            }} className='flex flex-col lg:h-[120vh] justify-center items-center my-16  lg:px-32 lg:py-10'>
                <div className=' bg-white  overflow-hidden h-full w-full flex'>
                    <div className=' lg:w-3/5 h-full overflow-hidden hidden lg:block'>

                        <video autoPlay muted loop src='images/contact_video.mp4' className="w-full h-screen object-cover" />

                    </div>
                    <div className=' lg:w-2/5 h-full w-full text-black '>
                        <div className=" flex-1 mx-auto px-8 py-10 text-gray-600">
                            <h1 className='text-black text-3xl font-semibold my-5'>Enroll Now</h1>
                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="space-y-2 "
                            >
                                <div>
                                    <label className="font-medium">
                                        Full name
                                    </label>
                                    <input
                                        id='name-1'
                                        type="text"
                                        required
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="font-medium">
                                        Email
                                    </label>
                                    <input
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
                                            <select className="text-sm bg-transparent outline-none rounded-lg h-full">
                                                <option>IN</option>
                                               
                                            </select>
                                        </div>
                                        <input
                                            id='phone-1'
                                            type="number"
                                            placeholder="+91 55 000-000"
                                            required
                                            className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="font-medium">
                                        Message
                                    </label>
                                    <textarea id='msg-1'  className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"></textarea>
                                </div>
                                <button onClick={Submit}
                                    className="w-full px-4 py-2  bg-bg-logo font-medium  text-white   rounded-lg duration-150"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div></div>

            </div>
        </>
    )
}