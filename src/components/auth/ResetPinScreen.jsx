import { useState } from "react";
import Input from "../reusables/customInput";
import DownloadButton from "../reusables/DownloadButton";
import AuthHeader from "./shared/AuthHeader";
import Modal from "../../components/profile-screens/reusables/modal";
import TickCircle from "../../utils/TickCircleIcon";
import ErrorBot from "../../error";
import axiosInstance from "../../api/config";
import { AnimatePresence } from "framer-motion";
import Notification from "../reusables/notifications";

const INITIAL_DATA = {
  newPassword: "",
  confirmNewPassword: "",
};

const ResetPinScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [data, setData] = useState(INITIAL_DATA);
  const [errorResponse, setErrorResponse] = useState();
  const [notifications, setNotifications] = useState([]);

  const updateFields = (fields) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };
  const removeNotif = (id) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };

  const handleReset = async (e) => {
      e.preventDefault()
    if (data.newPassword !== data.confirmNewPassword) {
      alert("Password mismatch");
      return;
    }

    try {
          const response = await axiosInstance.post( "/auth/change/password", {
        new_password: data.newPassword,
        new_password_confirmation: data.confirmNewPassword,
      });

      if (!response.data) {
        throw new Error("Update failed");
      }

      setNotifications((prev) => [
        { id: Date.now(), text: response?.data?.data?.message },
        ...prev,
      ] );
          setModalContent(
            <div className="text-center place-items-center bg-white w-full h-full flex flex-col gap-8  mt-14 rounded-[24px] p-4 pt-10 ">
              <TickCircle />
              <div>
                <p className="font-inter font-semibold text-lg">
                  Password Reset Successfully
                </p>
                <p className="text-[#828282] text-md font-inter leading-5">
                  You have requested to reset your password. <br /> Click
                  Continue to login to your account.
                </p>
              </div>
              <div className="mt-8 w-full">
                <DownloadButton
                  buttonText="Continue"
                  padding={"px-20"}
                  width={"w-[100%]"}
                  bgColor={"bg-primary"}
                  textColor={"text-white"}
                />
              </div>
            </div>
          );
          setIsModalOpen(true);
    } catch (error) {
      setErrorResponse(error?.response?.data?.message);
    }
  };
 

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optionally navigate to a different page or reset the form here
  };

  return (
    <div className="flex flex-col justify-start relative top-20 place-items-center gap-10 h-[100vh] px-4">
      <AuthHeader />
      <div className="text-center">
        <h4 className="font-semibold text-[24px] font-helvetica">
          Reset your password
        </h4>
        <p className="text-[#828282]">
          No problem. Enter the phone number associated with your <br />{" "}
          account.
        </p>
      </div>

      <form
        className="flex flex-col justify-between gap-[20px] h-[50vh] md:w-[25%] w-[100%]"
        onSubmit={handleReset}
      >
        <div className="flex flex-col gap-2">
       
          <Input
            label="New Password"
            id="password"
            type="password"
            placeholder="Enter your new password"
            bgColor={"bg-[#FAFAFA]"}
            value={data.newPassword}
            onChange={(e) => updateFields({ newPassword: e.target.value })}
          />

          <Input
            label="Confirm Password"
            id="confirm-password"
            type="password"
            placeholder="Confirm your new password"
            bgColor={"bg-[#FAFAFA]"}
            value={data.confirmNewPassword}
            onChange={(e) =>
              updateFields({ confirmNewPassword: e.target.value })
            }
          />
        </div>

        <div className="mt-20">
          <DownloadButton
            buttonText="Update password"
            padding={"px-20"}
            width={"w-[100%]"}
            bgColor={"bg-primary"}
            textColor={"text-white"}
          />
        </div>
      </form>

      {isModalOpen && (
        <Modal handleClick={handleCloseModal}>{modalContent}</Modal>
      )}
      {errorResponse && <ErrorBot error={errorResponse} />}
      <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <Notification removeNotif={removeNotif} {...n} key={n.id} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResetPinScreen;
