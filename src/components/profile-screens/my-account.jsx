import ProfilePage from "../../pages/profile-screens";
import { AiTwotoneEdit } from "react-icons/ai";
import { useState, useEffect } from "react";
import Header from "./reusables/header";
import { useSelector } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";

const InputComponent = ({
  placeholder,
  label,
  id,
  type,
  value,
  onChange,
  disabled,
}) => {
  return (
    <>
      <div>
        <label
          className="text-[#616161]/75 dark:text-white text-xs font-semibold"
          htmlFor={id}
        >
          {label}
        </label>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full h-16 rounded-xl px-4 py-2 text-[#757575] bg-[#FAFAFA] ${
            disabled ? "cursor-not-allowed" : ""
          }`}
          disabled={disabled}
        />
      </div>
    </>
  );
};

InputComponent.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

const INITIAL_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const MyAccount = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setData({
        firstName: userInfo.user.firstname,
        lastName: userInfo.user.lastname,
        email: userInfo.user.email,
        phone: userInfo.user.phone,
      });
    }
  }, [userInfo]);

  const updateFields = (fields) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/update/user`, {
        firstname: data?.firstName,
        lastname: data?.lastName,
      });

      if (!response.data) {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  const userObject = userInfo.user;
  const avatar = userInfo.user.picture;
  console.log("userinfo ==>", userInfo.user);

  return (
    <ProfilePage>
      <div className="font-inter text-start p-5 pt-6 flex flex-col overflow-y-auto">
        <Header
          title="My Account"
          message="Your Jet support profile is your personal gateway to managing your
            account information."
        />

        <div className="flex items-center gap-x-5 mt-12">
          <div className="h-20 w-20 relative rounded-full border border-lightGray">
            <img
              src={avatar}
              alt="avatar"
              className="object-cover h-full w-full"
            />
            <div className="bg-[#EBEBF0] w-8 h-8 rounded-full flex items-center justify-center absolute -bottom-2 right-0">
              <AiTwotoneEdit />
            </div>
          </div>
          <div>
            <p className="font-semibold text-md text-[#010E0E] dark:text-white">
              {userObject?.firstname} {userObject?.lastname}
            </p>
            <p className="text-[#616161] dark:text-white text-xs">
              {userObject?.email}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-[421px] mt-8 md:ml-6">
          <div className="grid grid-cols-2 gap-3">
            <InputComponent
              label="Your First Name"
              id="name"
              type="text"
              placeholder="James"
              value={data.firstName}
              onChange={(e) => updateFields({ firstName: e.target.value })}
            />
            <InputComponent
              label="Your Last Name"
              id="lastname"
              type="text"
              placeholder="Oluwafemi"
              value={data.lastName}
              onChange={(e) => updateFields({ lastName: e.target.value })}
            />
          </div>
          <InputComponent
            label="Your Email Address"
            id="email"
            type="email"
            placeholder="jamesoluwafemi@gmail.com."
            value={data.email}
            onChange={(e) => updateFields({ email: e.target.value })}
            disabled={true}
          />
          <InputComponent
            label="Your Phone number"
            id="phone"
            type="tel"
            placeholder="+234 903-4553-493"
            value={data.phone}
            onChange={(e) => updateFields({ phone: e.target.value })}
            disabled={true}
          />
          <div className="mt-16 md:mt-36 w-full">
            <button
              type="submit"
              className="block w-full rounded-[16px] bg-primary px-6 py-4 font-medium text-white transform scale-95 hover:scale-100 transition-transform duration-300"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </ProfilePage>
  );
};

export default MyAccount;
