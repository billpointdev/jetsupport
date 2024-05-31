import { useEffect, useState } from "react";
import Button from "../reusables/button";
import Modal from "../reusables/modal";
import OtpInputWithValidation from "../utils/otp-input";
import Proptypes from "prop-types";
import axiosInstance from "../../../api/config";
import { useSelector } from "react-redux";

const OtpModal = ({ setModal, handleContinue, title, setConfirmed }) => {
  const [otpFilled, setOtpFilled] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const storedUserEmail = localStorage.getItem("userEmail") || null;
  const { userEmail } = useSelector((state) => state.auth);
  const [otpError, setOtpError] = useState(null);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    try {
      setTimer(60);
      const response = await axiosInstance.post(`/auth/verify/otp`, {
        email: storedUserEmail ? storedUserEmail : userEmail,
        verify_code: otp.join(""),
      });

      if (!response.data) {
        throw new Error("OTP verification failed");
      }

      console.log("OTP verified:", response.data);
      setOtpVerified(true);
      setModal(null);
      setConfirmed(true);
      setModal(title);
    } catch (error) {
      setOtpVerified(false);
      setOtpError(error.response.data.message);
    }
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
      <div className="bg-white md:w-96 h-[400px] text-center flex flex-col justify-between mt-14 rounded-[24px] p-2 py-3 ">
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
        <OtpInputWithValidation
          numberOfDigits={6}
          handleOtp={handleChange}
          setOtpVerified={setOtpVerified}
          setModal={setModal}
          title={title}
          setConfirmed={setConfirmed}
          otpError={otpError}
          setOtpError={setOtpError}
          otp={otp}
          setOtp={setOtp}
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
          onClick={handleContinue}
          type="submit"
          title="Continue"
          className=""
          disabled={!otpFilled && !otpVerified}
        />
      </div>
    </Modal>
  );
};

OtpModal.propTypes = {
  setModal: Proptypes.func.isRequired,
  handleContinue: Proptypes.func.isRequired,
  title: Proptypes.string.isRequired,
  setConfirmed: Proptypes.func,
};

export default OtpModal;
