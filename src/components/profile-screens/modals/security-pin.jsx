import { useEffect, useState } from "react";
import Button from "../reusables/button";
import Modal from "../reusables/modal";
import OtpInputWithValidation from "../utils/reset-pin";
import Proptypes from "prop-types";

const SecurityPin = ( { setModal, setConfirmed } ) =>
{
  const [ otpFilled, setOtpFilled ] = useState( false );
    const [otpVerified, setOtpVerified] = useState(false);

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
    const isFilled = otp.length === 4;
    setOtpFilled(isFilled);
  };


  const handleClick = () => {
      setModal( null );
      setConfirmed(false)
  };

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
          type="submit"
          title="Continue"
          className=""
          disabled={!otpFilled && !otpVerified}
          onClick={() => console.log("button clicked")}
        />
      </div>
    </Modal>
  );
};


SecurityPin.propTypes = {
    setModal: Proptypes.func.isRequired,
    setConfirmed: Proptypes.func,
};

export default SecurityPin;
