import Button from "../reusables/button";
import Modal from "../reusables/modal";
import Proptypes from "prop-types";
import OtpInputWithValidation from "../utils/reset-pin";
import avatar from "../../../assets/frameimage.png"
import { useState } from "react";

const AuthorizeDelete = ( { setAuthorizeDelete } ) =>
{
    const [otpFilled, setOtpFilled] = useState(false);

  
    const handleChange = (otp) => {
      const isFilled = otp.length === 4;
      setOtpFilled(isFilled);
    };


  const handleClick = () => {
    setAuthorizeDelete(false);
  };
  const handleAuthorizeDelete = () => {
    // code to authorize delete
  };
  return (
    <Modal handleClick={handleClick}>
      <div className="bg-white w-full h-[400px] flex flex-col justify-between mt-14 rounded-[24px] p-2 py-3 ">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border border-[#DDE5E9] flex items-center justify-center">
            <img src={avatar} alt="avatar" />
          </div>
          <p className="font-inter font-semibold text-lg">
            Authorize account deletion
          </p>
          <p className="text-[#828282] text-md font-inter leading-5">
            Enter your BillPoint PIN to authorize account deletion{" "}
          </p>
          <OtpInputWithValidation numberOfDigits={4} handleOtp={handleChange} />
        </div>

        <Button
          type="submit"
          onClick={handleAuthorizeDelete}
          title="Continue"
          className="lg:mb-4"
          disabled={!otpFilled}
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
