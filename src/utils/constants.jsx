import PropTypes from "prop-types";

// Circle Component
export const Circle = ({
  top,
  right,
  bottom,
  left,
  zIndex,
  className,

  clipPath,
}) => {
  const circleClasses = `absolute bg-primary ${className} ${top} ${right} ${bottom} ${left} z-${zIndex}`;

  return (
    <div
      className={circleClasses}
      style={{
        clipPath: clipPath,
      }}
    />
  );
};

Circle.propTypes = {
  className: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  zIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.number,
  clipPath: PropTypes.string, // New prop for clip-path
};

Circle.defaultProps = {
  clipPath: "circle(50% at 50% 50%)", // Default clip-path if not provided
};


