import PropTypes from "prop-types";

// Circle Component
export const Circle = ({ top, right, bottom, left, zIndex, className }) => {
  const circleClasses = `absolute bg-primary ${className} rounded-full relative  ${top} ${right} ${bottom} ${left} z-${zIndex}`;

  return <div className={circleClasses} />;
};

Circle.propTypes = {
  className: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  zIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

