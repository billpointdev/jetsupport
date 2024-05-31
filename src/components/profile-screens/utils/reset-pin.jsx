import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import axiosInstance from "../../../api/config";

// const correctOTP = "1234";

function OtpInputWithValidation({
  setNotifications,
  numberOfDigits,
  handleOtp,
  setOtpVerified,
  setConfirmed,
  setModal,
}) {
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
          const response = await axiosInstance.post(`/auth/update/pin`, {
            pin: otp.join(""),
            pin_confirmation: otp.join(""),
          });

          if (!response.data) {
            throw new Error("OTP verification failed");
          }

          console.log("OTP verified:", response?.data?.data?.message);
          setOtpVerified(true);
          setModal(null);
          setConfirmed(false);
          setNotifications((prev) => [
            { id: Date.now(), text: response?.data?.data?.message },
            ...prev,
          ]);
        } catch (error) {
          console.error("Error verifying OTP:", error.message);
          setOtpVerified(false);
        }
      };

      handleSubmit(); // Call the handleSubmit function directly

      // If you want to set OTP error here, uncomment the line below
      // setOtpError("❌ Wrong OTP Please Check Again");
    } else {
      setOtpError(null);
    }
  }, [
    otp,
    setConfirmed,
    setModal,
    setNotifications,
    setOtpVerified,
    storedUserEmail,
    userEmail,
  ]);

  return (
    <div className="w-full flex flex-col items-center justify-center mt-5">
      <div
        style={{
          gridTemplateColumns: `repeat(${numberOfDigits}, minmax(0, 1fr))`,
        }}
        className="grid justify-center items-center gap-4"
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            type="password"
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            onPaste={(e) => handlePaste(e)}
            ref={(ref) => (otpBoxReference.current[index] = ref)}
            placeholder="-"
            style={{ caretColor: "transparent" }}
            className={` h-14 text-center text-6xl placeholder:text-2xl  text-primary p-3 rounded-md bg-[#FAFAFA]  focus:border focus:border-primary focus:outline-none appearance-none`}
          />
        ))}
      </div>
      {otpError && <p className="text-sm mt-4">{otpError}</p>}
    </div>
  );
}

OtpInputWithValidation.propTypes = {
  numberOfDigits: PropTypes.number.isRequired,
  handleOtp: PropTypes.func.isRequired,
  setOtpVerified: PropTypes.func,
  setConfirmed: PropTypes.func,
  setModal: PropTypes.func,
  setNotifications: PropTypes.any,
};

export default OtpInputWithValidation;
