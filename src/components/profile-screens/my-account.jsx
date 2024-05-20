import ProfilePage from "../../pages/profile-screens";
import avatar from "../../assets/frameimage.png";
import { AiTwotoneEdit } from "react-icons/ai";
import { useState } from "react";
import Proptypes from "prop-types";
import Header from "./reusables/header";

const INITIAL_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const InputComponent = ({ placeholder, label, id, type, value, onChange }) => {
  return (
    <>
      <div>
        <label className="text-[#616161]/75 dark:text-white text-xs font-semibold" htmlFor={id}>
          {label}
        </label>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full h-16  rounded-xl px-4 py-2 text-[#757575] bg-[#FAFAFA]"
        />
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

const MyAccount = () => {
  const [data, setData] = useState(INITIAL_DATA);

  const updateFields = (fields) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // value={country}
  //       onChange={(e) => updateFields({ country: e.target.value })}
  return (
    <ProfilePage>
      <div className="font-inter text-start p-5 pt-6 flex  flex-col  overflow-y-auto">
        <Header
          title="My Account"
          message="Your Jet support profile is your personal gateway to managing your
            account information."
        />

        <div className="flex items-center  gap-x-5 mt-12">
          <div className="h-20 w-20 relative  rounded-full border border-lightGray">
            <img
              src={avatar}
              alt="avatar"
              className="object-cover h-full w-full  "
            />
            <div className="bg-[#EBEBF0] w-8 h-8 rounded-full flex items-center justify-center absolute -bottom-2 right-0">
              <AiTwotoneEdit />
            </div>
          </div>
          <div>
            <p className="font-semibold text-md text-[#010E0E] dark:text-white">
              James Adeshina
            </p>
            <p className="text-[#616161] dark:text-white text-xs">jamesadeshina@gmail.com</p>
          </div>
        </div>
        {/* form */}
        <form action="#" className="  max-w-[421px] mt-8 md:ml-6 ">
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
          />
          <InputComponent
            label="Your Phone number"
            id="phone"
            type="tel"
            placeholder="+234  903-4553-493"
            value={data.phone}
            onChange={(e) => updateFields({ phone: e.target.value })}
          />
          <div className="mt-36 w-full">
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
