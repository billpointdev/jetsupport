import PropTypes from "prop-types";

const DownloadButton = ({
  type,
  onClick,
  children,
  os,
  bgColor,
  textColor,
  buttonText,
  downloadOn,
  height,
  padding,
  width,
}) => {
  return (
      <button
        type={type}
        className={`${bgColor} ${textColor} ${height} ${padding} ${width} border border-lightGray flex items-center py-4 w-full h-full font-inter justify-center px-2 rounded-full`}
        onClick={onClick}
      >
        {children} {buttonText}
        <p className=" text-start text-primary text-s ml-3">
          {downloadOn} <br /> <span className="font-bold text-xs">{os}</span>
        </p>
      </button>
  );
};

DownloadButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  os: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  buttonText: PropTypes.string,
  type: PropTypes.string,
  downloadOn: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  width: PropTypes.string,
};

export default DownloadButton;
