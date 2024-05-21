import CautionIcon from '../../../utils/CautionIcon';
import Button from '../reusables/button';
import Modal from '../reusables/modal'
import Proptypes from "prop-types"

const DeleteAccountModal = ({ setConfirmDeleteModal, setAuthorizeDelete }) => {
  const closeModal = () => {
    setConfirmDeleteModal(false);
  };
    const handleAuthorization = () =>
    {setConfirmDeleteModal(false);
        setAuthorizeDelete(true)
    }

  return (
    <Modal handleClick={closeModal}>
      <div className="bg-white w-full text-center h-[315px] flex flex-col justify-center mt-14 rounded-[24px] p-4 py-3 ">
        <div className="flex items-center justify-center">
          <div className="flex justify-center items-center bg-[#f5f5f5] h-16 w-16 rounded-full p-0.5">
            <CautionIcon />
          </div>
        </div>
        <div className="mt-7">
          <p>Confirm account deletion</p>
          <p className="text-[#757575]">
            By deleting your account you loose all your Jet support data and
            information
          </p>
        </div>
        <div className="mt-8">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setConfirmDeleteModal(false)}
              className={`block w-full rounded-[16px]  bg-[#F5F5F5] px-6 py-4 font-medium transform  hover:scale-95 transition-transform duration-300`}
            >
              Close
            </button>
            <Button
              onClick={handleAuthorization}
              className="h-14"
              title="Delete"
              type="button"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

DeleteAccountModal.propTypes = {
  setConfirmDeleteModal: Proptypes.func.isRequired,
  setAuthorizeDelete: Proptypes.func.isRequired
};

export default DeleteAccountModal;