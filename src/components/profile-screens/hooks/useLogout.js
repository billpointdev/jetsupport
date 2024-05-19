import useProviderContext from "./useProvideContext";

const useLogout = () => {
  const {showLogoutModal , setShowLogoutModal} = useProviderContext()

  const triggerLogoutModal = () => {
      setShowLogoutModal( true );
       console.log("modal", showLogoutModal);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    // Implement your logout logic here, e.g., clear user data, redirect to login page, etc.
  };

  return {
    triggerLogoutModal,
    closeLogoutModal,
    confirmLogout,
  };
};

export default useLogout;
