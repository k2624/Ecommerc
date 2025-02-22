import React, { useState } from "react";
import style from "./ForgotPassword.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // 🔹 لاستخدام التوجيه البرمجي

  async function forgotPassword() {
    if (!email) {
      toast.error("Please enter your email", { position: "top-right" });
      return;
    }

    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email }
      );

      toast.success(data.message, { position: "top-right" });

      // ✅ بعد نجاح الطلب، انتقلي إلى صفحة "verify-code"
      navigate("/verify-code");

    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "An error occurred", { position: "top-right" });
    }
  }

  return (
    <>
      <input
        required
        className="w-9/12 m-auto block p-5 border-main rounded-xl border-2 mb-5"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={forgotPassword} className="m-auto text-center">
        Send Code
      </button>
    </>
  );
}
