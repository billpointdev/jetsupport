import PropTypes from "prop-types";

const DownloadButton = ({ onClick , children , os, bgColor, textColor, buttonText, downloadOn, height, padding, width }) => {
  return (
    <button
      // className={`${bgColor} ${textColor} ${height} ${padding} ${width} border border-lightGray flex items-center md:py-2 w-full lg:w-[182px] max-w-[305px] font-inter h-[46px] md:h-[62px] justify-center px-3 rounded-full`}
      className={`${bgColor} ${textColor} ${height} ${padding} ${width} border border-lightGray flex items-center md:py-4 w-full  font-inter justify-center px-3 rounded-[16px]`}
      onClick={onClick}
    >
      {children} {buttonText} 
      <p className=" text-start text-primary text-xs ml-3">
      {downloadOn}  <br /> <span className="font-bold text-xl">{os}</span>
      </p>
    </button>
  );
};

DownloadButton.propTypes = {
    onClick: PropTypes.func, 
    children: PropTypes.node.isRequired,
    os: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    buttonText: PropTypes.string,
};


export default DownloadButton;
