import { useEffect, useState } from "react";
import Button from "../reusables/button";
import Modal from "../reusables/modal";
import OtpInputWithValidation from "../utils/otp-input";
import Proptypes from "prop-types"

const OtpModal = ( { setModal, handleContinue } ) =>
{ const [otpFilled, setOtpFilled] = useState(false);
  const [timer, setTimer] = useState(60);

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
    const isFilled = otp.length === 6;
    setOtpFilled(isFilled);
  };


  const handleClick = () => {
    setModal(null);
  };
  return (
    <Modal handleClick={handleClick}>
      <div className="bg-white w-full h-[400px] text-center flex flex-col justify-between mt-14 rounded-[24px] p-2 py-3 ">
        <div>
          <p className="font-inter font-semibold text-lg">
            OTP code verification
          </p>
          <p className="text-[#828282] text-md font-inter leading-5">
            We’ve sent a unique code to your mobile number. Enter the code below
            to verify.
          </p>
          <p className="text-[14px] text-[#828282]  font-inter">
            (+234) 9035017863
          </p>
        </div>
        <OtpInputWithValidation numberOfDigits={6} handleOtp={handleChange} />
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
          onClick={handleContinue}
          type="submit"
          title="Continue"
          className=""
          disabled={!otpFilled}
        />
      </div>
    </Modal>
  );
};


OtpModal.propTypes = {
    setModal: Proptypes.func.isRequired,
    handleContinue: Proptypes.func.isRequired,
}

export default OtpModal;


  //  {
  //    timer > 0 && otp.join("") === "" ? (
  //      <p>
  //        You can resend code in <span className="text-primary">{timer}</span>{" "}
  //        seconds
  //      </p>
  //    ) : (
  //      <button onClick={handleResend}>Resend OTP</button>
  //    );
  //  }