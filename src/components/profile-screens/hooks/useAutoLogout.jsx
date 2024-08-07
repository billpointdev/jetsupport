import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../features/auth/authActions'; // Adjust the import path

const useAutoLogout = (timeout = 10000) => { // Default timeout of 5 minutes (300000 ms)
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let inactivityTimer;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsVisible(false);
        inactivityTimer = setTimeout(() => {
          dispatch(logOut({})); // Pass any required data if needed
        }, timeout);
      } else {
        setIsVisible(true);
        clearTimeout(inactivityTimer);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(inactivityTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [timeout, dispatch]);

  return isVisible;
};

export default useAutoLogout;
