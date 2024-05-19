import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const correctOTP = "1234";

function OtpInputWithValidation({ numberOfDigits }) {
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [otpError, setOtpError] = useState(null);
  const otpBoxReference = useRef([]);

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

  useEffect(() => {
    if (otp.join("") !== "" && otp.join("") !== correctOTP) {
      setOtpError("❌ Wrong OTP Please Check Again");
    } else {
      setOtpError(null);
    }
  }, [otp]);

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
            value={digit} // Set value to digit
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            onPaste={(e) => handlePaste(e)}
            ref={(ref) => (otpBoxReference.current[index] = ref)}
            className={`h-16 text-center text-primary  text-6xl password-field px-3 pb-2 rounded-xl bg-[#FAFAFA] focus:border focus:border-primary focus:outline-none appearance-none ${
              digit ? "password-field" : ""
            }`}
          />
        ))}
      </div>
      {otpError && <p className="text-sm mt-4">{otpError}</p>}
    </div>
  );
}

OtpInputWithValidation.propTypes = {
  numberOfDigits: PropTypes.number.isRequired,
};

export default OtpInputWithValidation;
