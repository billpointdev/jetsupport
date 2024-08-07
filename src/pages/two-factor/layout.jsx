import PropTypes from "prop-types";
import JetSupportLogo from "../../assets/jetsupportcropped.jpg";

const TwoFactorLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="rounded-sm shadow-md bg-neutral-50 w-[400px]">
        <div className="p-6 flex flex-col items-center">
          <div className="flex items-center gap-1.5 font-medium">
            <img
              src={JetSupportLogo}
              alt="jet-support-logo"
              className="w-10 h-10"
            />
            <h2>JetSupport</h2>
          </div>
         <div className="mt-3 w-full">
         {children}
         </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorLayout;

TwoFactorLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
