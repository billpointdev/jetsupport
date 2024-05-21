import Proptypes from "prop-types";
const Button = ({ type, title, className, onClick, disabled }) => {
  return (
    <button
      type={type}
      onClick={() => onClick()}
      disabled={disabled}
      className={`block w-full rounded-[16px] ${className} bg-primary px-6 py-4 font-medium text-white transform  hover:scale-95 transition-transform duration-300`}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  type: Proptypes.string,
  title: Proptypes.string,
  className: Proptypes.string,
  onClick: Proptypes.func,
  disabled: Proptypes.bool,
};

export default Button;
