import PropTypes from "prop-types";

const Input = ({ label, id, type, placeholder }) => {
  return (
    <div className="text-start">
      <label htmlFor={id}>{label}</label>
      <input
        className="w-full rounded-lg border-gray-200 p-3 text-sm"
        placeholder={placeholder}
        type={type}
        id={id}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "email", "tel"]).isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
