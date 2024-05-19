import MasterExitIcon from "../../../utils/MasterExitIcon";
import useLogout from "../hooks/useLogout";
import Modal from "../reusables/modal";

const LogoutModal = () => {
  
    const {closeLogoutModal} = useLogout()
  return (
    <Modal handleClick={closeLogoutModal}>
      <div className="bg-white w-full h-[315px] flex flex-col justify-center mt-14 rounded-[24px] p-4 py-3 ">
        <div className="flex items-center justify-center">
          <MasterExitIcon />
          {/* <div className="flex justify-center items-center bg-[#f5f5f5] h-16 w-16 rounded-full p-0.5"></div> */}
        </div>
        <div className="mt-5">
          <p>Are you sure you want to sign out?</p>
          <p className="text-[#757575]">
            This action will log you out and you will need to sign in again to
            access your account.
          </p>
        </div>
        <div className="mt-10">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={closeLogoutModal}
              className={`block w-full rounded-[16px]  bg-[#F5F5F5] px-6 py-4 text-sm md:text-md lg:text-lg font-medium transform  hover:scale-95 transition-transform duration-300`}
            >
              Close
            </button>
            <button
              // onClick={handleLogout}
              type="button"
              className={`block w-full rounded-[16px] h-14  bg-[#FF3B3B] text-white text-sm md:text-md lg:text-lg px-6 py-4 font-medium transform  hover:scale-95 transition-transform duration-300`}
            >
              Sign me Out
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
