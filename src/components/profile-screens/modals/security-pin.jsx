import { useEffect, useState } from "react";
import Button from "../reusables/button";
import Modal from "../reusables/modal";
import OtpInputWithValidation from "../utils/reset-pin";
import Proptypes from "prop-types";

const SecurityPin = ({ setModal, setConfirmed, setNotifications }) => {
  const [otpFilled, setOtpFilled] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
    const [otpError, setOtpError] = useState(null);


  // Timer logic using useEffect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Function to handle timer reset and resend
  const handleResend = () => {
    setTimer(60);
  };
  const handleChange = (otp) => {
    const isFilled = otp.length === 4;
    setOtpFilled(isFilled);
  };

  const handleClick = () => {
    setModal(null);
    setConfirmed(false);
  };

  useEffect(() => {
    if (otpFilled && otpVerified) {
      setModal(null);
      setConfirmed(false);
    }
  }, [otpFilled, otpVerified, setConfirmed, setModal]);

  return (
    <Modal handleClick={handleClick}>
      <div className="bg-white w-[348px] md:w-96 h-[400px] flex text-center flex-col justify-between mt-14 rounded-[24px] p-2 py-3 ">
        <div>
          <p className="font-inter font-semibold text-lg">
            Reset your security pin
          </p>
          <p className="text-[#828282] text-md font-inter leading-5">
            Choose a 4-digit code that&apos;s easy for you to remember.
          </p>
        </div>
        <OtpInputWithValidation
          setOtpVerified={setOtpVerified}
          numberOfDigits={6}
          handleOtp={handleChange}
          setConfirmed={setConfirmed}
          setNotifications={setNotifications}
          setModal={setModal}
          otp={otp}
          setOtp={setOtp}
          otpError={otpError}
          setOtpError={setOtpError}
        />
        <div>
          <p className="text-[#757575] mt-7">
            Didn’t receive code?{" "}
            <span onClick={handleResend}>{timer == 0 && "Resend"}</span>
          </p>
          {timer != 0 && (
            <p>
              You can resend code in{" "}
              <span className="text-[#0063F7]">{timer}</span> s
            </p>
          )}
        </div>
        <Button
          type="button"
          title="Continue"
          className=""
          disabled={!otpFilled && !otpVerified}
          onClick={handleClick}
        />
      </div>
    </Modal>
  );
};

SecurityPin.propTypes = {
  setModal: Proptypes.func.isRequired,
  setConfirmed: Proptypes.func,
  setNotifications: Proptypes.any
};

export default SecurityPin;
