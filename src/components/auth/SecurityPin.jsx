import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "../reusables/customInput";
// import AuthHeader from "./shared/AuthHeader";
import DownloadButton from "../../components/reusables/DownloadButton";
import { logOut, updatePin, validatePin } from "../../features/auth/authActions";
import ErrorBot from "../../error";
import { AnimatePresence } from "framer-motion";
import Notification from "../reusables/notifications";

const SecurityPin = () => {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(45);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // const buttonRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { userInfo, userEmail } = useSelector((state) => state.auth);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handlePinChange = (value, index) => {
    const newPin = [...pin];
    newPin[index] = value;

    if (index === 5 && value.length > 1) {
      return;
    }

    setPin(newPin);

    if (index < 5 && value !== "") {
      const nextInput = document.getElementById(`pin-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    } else if (index > 0 && value === "") {
      const prevInput = document.getElementById(`pin-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
    //   // setTimeout(() => {
    //   //   navigate('/profile');

    //   // }, 2000);
    // }
  };

  useEffect(() => {
    if (
      pin.every((p) => p !== "") &&
      pin.length === 6 &&
      location.state?.fromLogin
    ) {
      // Trigger PIN validation
      dispatch(validatePin({ email: userEmail, security_pin: pin.join("") }))
        .then((result) => {
          if (validatePin.fulfilled.match(result)) {
            navigate("/profile");
            setNotifications((prev) => [
              { id: Date.now(), text: "Login successful" },
              ...prev,
            ]);
          } else {
            console.log(result.payload.message);
            setError(result?.payload?.message);
            setNotifications( [] );
            dispatch(logOut())
          }
        })
        .catch((error) => {
          setError(error?.message);
          setNotifications([]);
          setPin(Array(6).fill(""));
        });
    }
  }, [
    pin,
    location.state?.fromLogin,
    dispatch,
    userEmail,
    navigate,
    setError,
    setNotifications,
  ]);

  const handleCreatePin = () => {
    const pinValue = pin.join("");
    setIsLoading(true);
    dispatch(updatePin({ pin: pinValue, pin_confirmation: pinValue }))
      .then((result) => {
        if (updatePin.fulfilled.match(result)) {
          navigate("/set-avatar");
        } else {
          // Handle update error, show a message
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  const removeNotif = (id) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };
  return (
    <div className="flex flex-col dark:bg-dark justify-start dark:text-[#FFD9C5] pt-12 place-items-center gap-10 h-[100vh] px-4">
      {/* <AuthHeader /> */}

      <div className="text-center">
        {location.state?.fromLogin ? (
          <>
            {userInfo?.picture && (
              <div className="my-4 flex justify-center">
                <img
                  src={userInfo?.picture}
                  alt="User Avatar"
                  className="rounded-full w-24 h-24 object-cover"
                />
              </div>
            )}
            <h4 className=" font-semibold text-[24px] text-center font-helvetica">
              Hello, {userInfo?.firstname || "User"}
            </h4>
            <p>Sign in with your security PIN</p>
          </>
        ) : (
          <>
            <h4 className=" font-semibold text-[24px] text-center font-helvetica">
              Create your security pin
            </h4>
            <p>We will require this pin to process your transactions</p>
          </>
        )}
      </div>

      <div>
        <div className="flex gap-2 border-collapse max-w-[400px]">
          {pin.map((value, index) => (
            <Input
              key={index}
              id={`pin-input-${index}`}
              type="text"
              placeholder="-"
              bgColor="bg-lightGray"
              value={value}
              className="pl-[25px]"
              onChange={(e) => handlePinChange(e.target.value, index)}
              autoFocus={index === 0}
            />
          ))}
        </div>
      </div>

      {!location.state?.fromLogin && (
        <DownloadButton
          buttonText="Continue"
          padding={"px-20"}
          width={"md:w-[30%] "}
          bgColor={"bg-primary"}
          textColor={"text-white"}
          onClick={handleCreatePin}
        />
      )}
      <AnimatePresence>
        <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none">
          {notifications.map((n) => (
            <Notification removeNotif={removeNotif} {...n} key={n.id} />
          ))}
        </div>
        {error && <ErrorBot error={error} />}
      </AnimatePresence>
    </div>
  );
};

export default SecurityPin;
