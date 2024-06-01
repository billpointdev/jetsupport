import { useEffect, useState } from "react";
import Button from "../reusables/button";
import Modal from "../reusables/modal";
import Proptypes from "prop-types";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import ErrorBot from "../../../error";
import axiosInstance from "../../../api/config";

const INITIAL_DATA = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const InputComponent = ({ placeholder, label, id, type, value, onChange }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType =
    type === "password" ? (isPasswordVisible ? "text" : "password") : type;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <div>
        <label className="text-start text-[#616161]/75 text-xs" htmlFor={id}>
          {label}
        </label>
        <div className="text-[#757575] bg-[#FAFAFA] h-12 flex  items-center justify-between pr-4 mt-0.5 rounded-xl  ">
          <input
            type={inputType}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-[90%] bg-transparent px-4 text-sm py-2 h-full outline-none border-none"
          />
          {isPasswordVisible ? (
            <FaRegEye
              onClick={togglePasswordVisibility}
              className="w-[10%] text-[#292D32] bg-transparent  text-xl cursor-pointer"
            />
          ) : (
            <FaRegEyeSlash
              onClick={togglePasswordVisibility}
              className="w-[10%] text-[#292D32] bg-transparent  text-xl cursor-pointer"
            />
          )}
        </div>
      </div>
    </>
  );
};
InputComponent.propTypes = {
  placeholder: Proptypes.string,
  label: Proptypes.string,
  id: Proptypes.string,
  type: Proptypes.string,
  value: Proptypes.string,
  onChange: Proptypes.func,
};

const ResetPassword = ({ setModal, setConfirmed, setNotifications }) => {
  const [data, setData] = useState(INITIAL_DATA);
  const [errorResponse, setErrorResponse] = useState();
  const storedUserEmail = localStorage.getItem("userEmail") || null;
  const [loading, setLoading] = useState(false);

  const updateFields = (fields) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const handleClick = () => {
    setModal(null);
    setConfirmed(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.newPassword !== data.confirmNewPassword) {
      alert("Password mismatch");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/reset/password/web", {
        password: data.newPassword,
        password_confirmation: data.confirmNewPassword,
        email: storedUserEmail,
      });

      if (!response.data) {
        throw new Error("Update failed");
      }
      setModal(null);
      setNotifications((prev) => [
        { id: Date.now(), text: response?.data?.message },
        ...prev,
      ]);
      setLoading(false);
    } catch (error) {
      setErrorResponse(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (errorResponse) {
      const timer = setTimeout(() => {
        setErrorResponse(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorResponse, setErrorResponse]);

  return (
    <Modal handleClick={handleClick}>
      <div className="bg-white sm:w-[348px] md:w-96 text-center h-[335px] flex flex-col  mt-14 rounded-[24px] p-4 py-3 ">
        <div>
          <p className="font-inter font-semibold text-lg">
            Reset your security pin
          </p>
          <p className="text-[#828282] text-md font-inter leading-5">
            Choose a 4-digit code that&apos;s easy for you to remember.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="text-start flex flex-col gap-3"
        >
          {/* <InputComponent
            label="Old Password"
            id="name"
            type="password"
            placeholder="Enter old password"
            value={data.oldPassword}
            onChange={(e) => updateFields({ oldPassword: e.target.value })}
          /> */}
          <InputComponent
            label="New Password"
            id="name"
            type="password"
            placeholder="Enter new password"
            value={data.newPassword}
            onChange={(e) => updateFields({ newPassword: e.target.value })}
          />
          <InputComponent
            label="Confirm New Password"
            id="name"
            type="password"
            placeholder="Confirm new password"
            value={data.confirmNewPassword}
            onChange={(e) =>
              updateFields({ confirmNewPassword: e.target.value })
            }
          />
          <Button
            type="submit"
            title={loading ? "Resetting ..." : "Continue"}
            className="mt-3"
          />
        </form>
      </div>
      {errorResponse && <ErrorBot error={errorResponse} />}
    </Modal>
  );
};

ResetPassword.propTypes = {
  setModal: Proptypes.func.isRequired,
  setConfirmed: Proptypes.func,
  setNotifications: Proptypes.any,
};

export default ResetPassword;
