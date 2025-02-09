import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function ResetPassword() {
  const [email , setEmail] = useState("");
  const [newPassword , setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  async function resetPassword() {
    if (!email || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields", { position: "top-right" , 
        duration : 5000
       });
      return;
    };
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", { position: "top-right" });
      return;
    };
    try{
      let {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',{
        email , newPassword
      })
      console.log(data);
      toast.success("Password reset successfully!", { position: "top-right" });

      navigate("/login");
      
    }catch(err){
      console.log(err);
      toast.error(err?.response?.data?.message || "An error occurred", {
        position: "top-right",
      });
    }
  }

  return <>
    <h2 className='mt-5 font-bold text-gray-500'>reset your account password</h2>
    <div className='my-8'>
    <input onChange={(e)=> setEmail(e.target.value)} placeholder='Email....' className='shadow-inner shadow-current w-full p-3 border-gray-400 focus:border-main border-2  rounded-lg' type="email" id="email" />

    </div>
    <div className='my-8'>
      <input onChange={(e)=> setNewPassword(e.target.value)} placeholder='Password ****' className='  shadow-inner shadow-current w-full border-gray-400 p-3 focus:border-main border-2  rounded-lg' type="password" id="newPassword" />
    </div>
    <div>
      <input onChange={(e)=> setConfirmPassword(e.target.value)} placeholder='confirm password ****' className='  shadow-inner shadow-current w-full border-gray-400 p-3 focus:border-main border-2  rounded-lg' type="password" id="newPassword" />
    </div>
    <button onClick={resetPassword} className='w-3/4 mt-5 m-auto flex justify-center'>Verify</button>
    
  </>
}
