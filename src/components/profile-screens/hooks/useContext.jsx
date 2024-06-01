import { createContext, useState } from "react";
import PropTypes from "prop-types";

const defaultContextValue = {
  showLogoutModal: false,
  setShowLogoutModal: () => {},
};

export const MyContext = createContext(defaultContextValue);

const MyProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [ showLogoutModal, setShowLogoutModal ] = useState( false );
  const [ isSearching, setIsSearching ] = useState( false );
  const [darkMode , setDarkMode] = useState(false)
  const [isChannelsModalOpen, setIsChannelsModalOpen] = useState(false);


  return (
    <MyContext.Provider
      value={{ showLogoutModal, isChannelsModalOpen, setIsChannelsModalOpen, darkMode, setDarkMode, setShowLogoutModal, open, setOpen ,isSearching, setIsSearching }}
    >
      {children}
    </MyContext.Provider>
  );
};

MyProvider.propTypes = {
  children: PropTypes.node,
};

export default MyProvider;
