import Button from "../reusables/button";
import Modal from "../reusables/modal";
import OtpInputWithValidation from "../utils/otp-input";
import Proptypes from "prop-types"

const OtpModal = ({ setModal, handleContinue }) => {
  const handleClick = () => {
    setModal(null);
  };
  return (
    <Modal handleClick={handleClick}>
      <div className="bg-white w-full h-[400px] flex flex-col justify-between mt-14 rounded-[24px] p-2 py-3 ">
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
        <OtpInputWithValidation numberOfDigits={6} />
        <div>
          <p className="text-[#757575] mt-8">Didn’t receive code?</p>
          <p>
            You can resend code in <span className="text-[#0063F7]">45</span> s
          </p>
        </div>
        <Button
          onClick={handleContinue}
          type="submit"
          title="Continue"
          className="lg:mb-4"
        />
      </div>
    </Modal>
  );
};


OtpModal.propTypes = {
    setModal: Proptypes.func.isRequired,
    handleContinue: Proptypes.func.isRequired,
}

export default OtpModal