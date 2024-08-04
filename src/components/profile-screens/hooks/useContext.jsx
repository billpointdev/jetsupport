import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const defaultContextValue = {
  showLogoutModal: false,
  setShowLogoutModal: () => {},
  isChannelsModalOpen: false,
  setIsChannelsModalOpen: () => {},
  darkMode: false,
  setDarkMode: () => {},
  open: false,
  setOpen: () => {},
  isSearching: false,
  setIsSearching: () => {},
};

export const MyContext = createContext(defaultContextValue);

const MyProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isChannelsModalOpen, setIsChannelsModalOpen] = useState(false);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    showLogoutModal,
    setShowLogoutModal,
    isChannelsModalOpen,
    setIsChannelsModalOpen,
    darkMode,
    setDarkMode,
    open,
    setOpen,
    isSearching,
    setIsSearching,
  }), [showLogoutModal, isChannelsModalOpen, darkMode, open, isSearching]);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

MyProvider.propTypes = {
  children: PropTypes.node,
};

export default MyProvider;
