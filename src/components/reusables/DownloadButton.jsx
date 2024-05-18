import PropTypes from "prop-types";

const DownloadButton = ({ onClick , children , os}) => {
  return (
    <button
      className="border border-lightGray flex items-center md:py-2 w-full lg:w-[182px] max-w-[305px] font-inter h-[46px] md:h-[62px] justify-center px-3 rounded-full"
      onClick={onClick}
    >
      {children}
      <p className=" text-start text-primary text-xs ml-3">
        Download on <br /> <span className="font-bold text-xl">{os}</span>
      </p>
    </button>
  );
};

DownloadButton.propTypes = {
    onClick: PropTypes.func, 
    children: PropTypes.node.isRequired,
    os: PropTypes.string.isRequired,
};

export default DownloadButton;
