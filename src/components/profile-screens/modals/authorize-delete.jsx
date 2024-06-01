import Button from "../reusables/button";
import Modal from "../reusables/modal";
import Proptypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../api/config";
import { logout } from "../../../features/auth/authSlice";
import OtpInputWithValidation from "../utils/authorize-delete";

const AuthorizeDelete = ({ setAuthorizeDelete }) => {
  // eslint-disable-next-line no-unused-vars
  const [otpFilled, setOtpFilled] = useState(false);
  const [otpError, setOtpError] = useState(null);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const { userInfo } = useSelector((state) => state.auth);
  // eslint-disable-next-line no-unused-vars
  const [otpVerified, setOtpVerified] = useState(false);
  const [authorize, setAuthorize] = useState(false);
  const handleChange = (otp) => {
    const isFilled = otp.length === 4;
    setOtpFilled(isFilled);
  };

  const dispatch = useDispatch();
  const handleClick = () => {
    setAuthorizeDelete(false);
  };
  const handleAuthorizeDelete = async () => {
    // code to authorize delete
    try {
      const response = await axiosInstance.get(`/auth/accountdelete`);
      dispatch(logout());
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Modal handleClick={handleClick}>
      <div className="bg-white sm:w-[348px] md:w-96 text-center h-[315px] flex flex-col justify-center mt-14 rounded-[24px] p-4 py-3 ">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border border-[#DDE5E9] flex items-center justify-center">
            <img src={userInfo?.picture} alt="avatar" />
          </div>
          <p className="font-inter font-semibold text-lg">
            Authorize account deletion
          </p>
          <p className="text-[#828282] text-md font-inter leading-5">
            Enter your Jet Support PIN to authorize account deletion{" "}
          </p>
          <OtpInputWithValidation
            handleOtp={handleChange}
            setOtpVerified={setOtpVerified}
            setAuthorizeDelete={setAuthorizeDelete}
            otpError={otpError}
            setOtpError={setOtpError}
            setAuthorize={setAuthorize}
            otp={otp}
            setOtp={setOtp}
            numberOfDigits={6}
          />
        </div>

        <Button
          type="submit"
          onClick={handleAuthorizeDelete}
          title="Continue"
          className="mt-6"
          disabled={!otpFilled || authorize}
        />
      </div>
    </Modal>
  );
};

AuthorizeDelete.propTypes = {
  setAuthorizeDelete: Proptypes.func.isRequired,
  handleAuthorizeDelete: Proptypes.func,
};

export default AuthorizeDelete;
