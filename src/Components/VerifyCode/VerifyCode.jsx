import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [resetCode, setResetCode] = useState("");
  const navigate = useNavigate(); // 🔹 لاستخدام التوجيه البرمجي

  async function verifyResetCode() {
    if (!resetCode) {
      toast.error("Please enter the reset code", { position: "top-right" });
      return;
    }

    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode }
      );

      console.log(data);
      toast.success("Code verified successfully!", { position: "top-right" });

      // ✅ بعد نجاح التحقق، الانتقال إلى صفحة "Reset Password"
      navigate("/reset-password");

    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Invalid or expired code", { position: "top-right" });
    }
  }

  return (
    <>
      <h2 className="text-center">Enter Verification Code</h2>
      <input
        required
        className="w-9/12 m-auto block p-5 border-main rounded-xl border-2 mb-5"
        type="text"
        placeholder="Enter reset code"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
      />
      <button onClick={verifyResetCode} className="m-auto text-center">
        Verify Code
      </button>
    </>
  );
}
