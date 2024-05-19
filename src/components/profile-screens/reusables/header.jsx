import Proptypes from "prop-types";
const Header = ({ title, message }) => {
  return (
    <div>
      <p className="text-2xl dark:text-white font-semibold">{title}</p>
      <p className="text-xs md:text-md lg:text-[16px] dark:text-white text-[#828282] mt-3">{message}</p>
    </div>
  );
};

Header.propTypes = {
  title: Proptypes.string,
  message: Proptypes.string,
};
export default Header;
