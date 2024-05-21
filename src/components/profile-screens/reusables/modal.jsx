import CancelIcon from "../../../utils/CancelIcon";
import Proptypes from "prop-types"

const Modal = ({ children, handleClick }) => {
  return (
    <div
      style={{ zIndex: 2147483647 }}
      className="fixed top-0  w-screen h-screen flex items-center justify-center left-0 backdrop-blur-sm bg-[#00000033]"
    >
      <div className="w-[100%] md:w-96 lg:w-[428px] h-fit relative p-4">
        <div
          onClick={() => handleClick()}
          className="absolute h-10 w-10 cursor-pointer rounded-full  right-0 top-0 flex items-center justify-center bg-[#F5F5F5]"
        >
          <CancelIcon />
        </div>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
    children: Proptypes.node.isRequired,
    handleClick: Proptypes.func.isRequired,
}

export default Modal