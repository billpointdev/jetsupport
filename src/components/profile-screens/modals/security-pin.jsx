import Button from "../reusables/button";
import Modal from "../reusables/modal";
import OtpInputWithValidation from "../utils/reset-pin";
import Proptypes from "prop-types";

const SecurityPin = ({ setModal, setConfirmed }) => {
  const handleClick = () => {
      setModal( null );
      setConfirmed(false)
  };
  return (
    <Modal handleClick={handleClick}>
      <div className="bg-white w-full h-[400px] flex flex-col justify-between mt-14 rounded-[24px] p-2 py-3 ">
        <div>
          <p className="font-inter font-semibold text-lg">
            Reset your security pin
          </p>
          <p className="text-[#828282] text-md font-inter leading-5">
            Choose a 4-digit code that&apos;s easy for you to remember.
          </p>
        </div>
        <OtpInputWithValidation numberOfDigits={4} />
        <div>
          <p className="text-[#757575] mt-8">Didn’t receive code?</p>
          <p>
            You can resend code in <span className="text-[#0063F7]">45</span> s
          </p>
        </div>
        <Button type="submit" title="Continue" className="lg:mb-4" />
      </div>
    </Modal>
  );
};


SecurityPin.propTypes = {
    setModal: Proptypes.func.isRequired,
    setConfirmed: Proptypes.func,
};

export default SecurityPin;
