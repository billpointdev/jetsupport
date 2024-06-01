import PropTypes from "prop-types";

const Toggler = ({ id, checked, onChange }) => {
  return (
    <label
      htmlFor={id}
      className="relative h-[25px] w-14 cursor-pointer rounded-full flex items-center bg-[#E0E0E0] dark:bg-[#FFCBAF] transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-primary dark:has-[:checked]:bg-primary"
    >
      <input
        type="checkbox"
        id={id}
        className="peer sr-only"
        checked={checked}
        onChange={onChange}
      />

      <span className="absolute inset-y-0 start-1  h-5 w-5 mt-0.5 rounded-full bg-[#FFF5EF] shadow-md transition-all peer-checked:start-8"></span>
    </label>
  );
};

Toggler.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Toggler;
