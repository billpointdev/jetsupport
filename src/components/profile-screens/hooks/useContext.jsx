import { createContext, useState } from "react";
import PropTypes from "prop-types";

const defaultContextValue = {
  showLogoutModal: false,
  setShowLogoutModal: () => {},
};

export const MyContext = createContext(defaultContextValue);

const MyProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <MyContext.Provider
      value={{ showLogoutModal, setShowLogoutModal, open, setOpen }}
    >
      {children}
    </MyContext.Provider>
  );
};

MyProvider.propTypes = {
  children: PropTypes.node,
};

export default MyProvider;
