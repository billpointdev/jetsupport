import { useDispatch } from "react-redux";
import MasterExitIcon from "../../../utils/MasterExitIcon";
import useLogout from "../hooks/useLogout";
import Modal from "../reusables/modal";
import { useEffect, useState } from "react";
import { logOut } from "../../../features/auth/authActions";
import { AnimatePresence } from "framer-motion";
import Notification from "../../reusables/notifications";
import ErrorBot from "../../../error";

const LogoutModal = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const removeNotif = (id) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };

  const handleLogout = async (data) => {
    try {
      setLoading(true);
      const response = await dispatch(logOut(data)).unwrap();
      setNotifications((prev) => [
        { id: Date.now(), text: response?.data },
        ...prev,
      ]);
      setTimeout(() => {
        closeLogoutModal();
      }, 2000);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log("responseError", error.message);
      setError(error?.message);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  const { closeLogoutModal } = useLogout();
  return (
    <Modal handleClick={closeLogoutModal}>
      <div className="bg-white sm:w-[348px] md:w-96 text-center h-[315px] flex flex-col justify-center mt-14 rounded-[24px] p-4 py-3 ">
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
              onClick={() => handleLogout()}
              type="button"
              className={`block w-full whitespace-nowrap rounded-[16px] h-14  bg-[#FF3B3B] text-white text-sm md:text-md lg:text-lg px-6 py-4 font-medium transform  hover:scale-95 transition-transform duration-300`}
            >
            {loading ? "Signing out..." : "Sign me Out"}
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <Notification removeNotif={removeNotif} {...n} key={n.id} />
          ))}
        </AnimatePresence>
      </div>
      {error && <ErrorBot error={error} />}
    </Modal>
  );
};

export default LogoutModal;
