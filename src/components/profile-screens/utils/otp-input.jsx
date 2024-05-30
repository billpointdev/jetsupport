import { useRef, useEffect, useState } from "react";
import Proptypes from "prop-types";
import { useSelector } from "react-redux";
import axiosInstance from "../../../api/config";

// const correctOTP = "123456";

function OtpInputWithValidation({title,setConfirmed, setModal, numberOfDigits, handleOtp, setOtpVerified }) {
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [otpError, setOtpError] = useState(null);
  const otpBoxReference = useRef([]);
  const { userEmail } = useSelector((state) => state.auth);

  useEffect(() => {
    handleOtp(otp.join(""));
  }, [otp, handleOtp]);

  function handleChange(value, index) {
    if (!isNaN(value)) {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);

      if (value && index < numberOfDigits - 1) {
        otpBoxReference.current[index + 1].focus();
      }
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain");
    const pasteArray = pasteData.split("").slice(0, numberOfDigits);
    const newOtp = [...otp];
    pasteArray.forEach((digit, index) => {
      newOtp[index] = digit;
    });
    setOtp(newOtp);
  }

  const storedUserEmail = localStorage.getItem("userEmail") || null;

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
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
          setOtpVerified(true);
          setModal(null)
          setConfirmed(true)
          setModal(title)
          
        } catch (error) {
          console.error("Error verifying OTP:", error.message);
          setOtpVerified(false);
        }
      };

      handleSubmit(); 
    } else {
      setOtpError(null);
    }
  }, [otp, setOtpVerified, storedUserEmail, userEmail]);

  return (
    <div className="w-full  flex flex-col items-center justify-center mt-5">
      <div
        style={{
          gridTemplateColumns: `repeat(${numberOfDigits}, minmax(0, 1fr))`,
        }}
        className={`grid justify-center   items-center gap-4`}
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            onPaste={(e) => handlePaste(e)}
            ref={(ref) => (otpBoxReference.current[index] = ref)}
            placeholder="-"
            className={` h-14 text-center text-[#757575] p-3 rounded-md bg-[#FAFAFA]  focus:border focus:border-primary focus:outline-none appearance-none`}
          />
        ))}
      </div>
      {otpError && <p className="text-sm mt-4">{otpError}</p>}
    </div>
  );
}

OtpInputWithValidation.propTypes = {
  numberOfDigits: Proptypes.number.isRequired,
  handleOtp: Proptypes.func.isRequired,
  setOtpVerified: Proptypes.func,
};

export default OtpInputWithValidation;
