import PropTypes from "prop-types";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ label, id, type, placeholder, bgColor,className, value, onChange, width }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = type === "password" ? (isPasswordVisible ? "text" : "password") : type;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="text-start w-full dark:text-dark">
      <label htmlFor={id} className="block mb-2 dark:text-[#FFD9C5]">
        {label}
      </label>
      <div className="relative">
        <input
          className={`${bgColor} ${className} outline-none dark:text-dark dark:placeholder:text-dark dark:bg-[#FFD9C5] ${width} w-full rounded-[16px] border-gray-200 p-[20px] text-sm`}
          placeholder={placeholder}
          type={inputType}
          id={id}
          value={value}
          onChange={onChange}
          style={{ flexShrink: 0 }}
        />
        {type === "password" && (
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-6 cursor-pointer"
          >
            {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "email", "tel", "password"]).isRequired,
  placeholder: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string,
  className: PropTypes.string,
};

export default Input;

export const LandingPageInput = ({ label, id, type, placeholder, bgColor,className, value, onChange, width }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = type === "password" ? (isPasswordVisible ? "text" : "password") : type;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="text-start w-full ">
      <label htmlFor={id} className="block mb-2 ">
        {label}
      </label>
      <div className="relative">
        <input
          className={`${bgColor} ${className} outline-none    ${width} w-full rounded-[16px] border-gray-200 p-[20px] text-sm`}
          placeholder={placeholder}
          type={inputType}
          id={id}
          value={value}
          onChange={onChange}
          style={{ flexShrink: 0 }}
        />
        {type === "password" && (
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-6 cursor-pointer"
          >
            {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        )}
      </div>
    </div>
  );
};

LandingPageInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "email", "tel", "password"]).isRequired,
  placeholder: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string,
  className: PropTypes.string,
};


