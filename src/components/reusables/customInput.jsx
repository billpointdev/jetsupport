import PropTypes from "prop-types";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ label, id, type, placeholder, bgColor, value, onChange }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = type === "password" ? (isPasswordVisible ? "text" : "password") : type;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="text-start">
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <input
          className={`${bgColor} w-full rounded-[16px] border-gray-200 p-[20px] text-sm`}
          placeholder={placeholder}
          type={inputType}
          id={id}
          value={value}
          onChange={onChange}
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
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "email", "tel", "password"]).isRequired,
  placeholder: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
