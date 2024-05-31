import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../reusables/customInput";
import AuthHeader from "./shared/AuthHeader";
import { useSelector } from "react-redux";
import axiosInstance from "../../api/config";

const OtpPage = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(45);
  const navigate = useNavigate();
  const { userEmail } = useSelector((state) => state.auth);
  const location = useLocation();
  const isFromForgotPassword = location.state?.fromForgotPassword;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5 && value !== "") {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    } else if (index > 0 && value === "") {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }

  
  };

 

   const handleResend = async () => {
     setTimer(60);
     try {
       const storedUserEmail = localStorage.getItem("userEmail") || userEmail;
       const response = await axiosInstance.post("/auth/forget/password", {
         email: storedUserEmail,
       });
       setNotifications((prev) => [
         {
           id: Date.now(),
           text: response?.message || "OTP resent successfully",
         },
         ...prev,
       ]);
     } catch (error) {
       console.error("Error resending OTP:", error?.response?.data?.message);
       setError(error?.response?.data?.message);
     }
   };

  const storedUserEmail = localStorage.getItem( "userEmail" ) || null;
  
  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const response = await axiosInstance.post(`/auth/verify/otp`, {
          email: storedUserEmail ? storedUserEmail : userEmail,
          verify_code: otp.join(""),
        });

        if (!response.data) {
          throw new Error("OTP verification failed");
        }

        console.log("OTP verified:", response.data);
        if (isFromForgotPassword) {
          navigate("/reset-password");
        } else {
          navigate("/security-pin");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error.message);
      }
    };

    // Check if all OTP digits are filled
    if (otp.every((digit) => digit !== "")) {
      // Trigger form submission
      handleSubmit();
    }
  }, [otp, storedUserEmail, userEmail, isFromForgotPassword, navigate]);


  return (
    <div className="flex flex-col justify-start relative top-20 place-items-center gap-10 h-[100vh] px-4">
      <AuthHeader />
      <div className="text-center">
        {isFromForgotPassword ? (
          <>
            <h4 className="font-semibold text-[24px] text-center font-helvetica">
              OTP code verification 👋
            </h4>
            <p>
              We’ve sent a unique code to your mobile number. Enter the code
              below to verify. <br /> (+234) 9035017863
            </p>
          </>
        ) : (
          <>
            <h4 className="font-semibold text-[24px] text-center font-helvetica">
              Account Verification 👋
            </h4>
            <p>
              We’ve sent a unique code to your mobile number <br /> (+234)
              9035017863
            </p>
          </>
        )}
      </div>

      <div>
        <div className="flex gap-2 border-collapse max-w-[400px]">
          {otp.map((value, index) => (
            <Input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              placeholder="-"
              bgColor="bg-lightGray"
              value={value}
              className="pl-[25px]"
              onChange={(e) => handleOtpChange(e.target.value, index)}
              autoFocus={index === 0}
            />
          ))}
        </div>
      </div>
      <div className="text-center">
        <small>Didn’t receive code?</small>

        {timer > 0 ? (
          <p className="py-4">
            You can resend code in{" "}
            <span className="text-[#0063F7]">{timer}</span> s
          </p>
        ) : (
          <p className="py-4" onClick={handleResend}>
            Click the &quot;Resend OTP&quot; button to resend OTP
          </p>
        )}
      </div>
    </div>
  );
};

export default OtpPage;
