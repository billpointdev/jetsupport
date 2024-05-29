import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "../reusables/customInput";
// import AuthHeader from "./shared/AuthHeader";
import DownloadButton from "../../components/reusables/DownloadButton";
import { updatePin, validatePin } from "../../features/auth/authActions";

const SecurityPin = () => {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(45);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // const buttonRef = useRef(null);
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
      dispatch(
        validatePin({ email: userEmail, security_pin: pin.join("") })
      ).then((result) => {
        if (validatePin.fulfilled.match(result)) {
          navigate("/profile");
        } else {
          // Handle validation error, show a message,
        }
      });
    }
  }, [pin, location.state?.fromLogin, dispatch, userEmail, navigate]);

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
  // console.log("userInfor" , userInfo?.user?.picture)
  return (
    <div className="flex flex-col  justify-start relative top-20 place-items-center gap-10 h-[100vh] px-4">
      {/* <AuthHeader /> */}

      <div className="text-center">
        {location.state?.fromLogin ? (
          <>
            {userInfo?.user?.picture && (
              <div className="my-4 flex justify-center">
                <img
                  src={userInfo?.user?.picture}
                  alt="User Avatar"
                  className="rounded-full w-24 h-24 object-cover"
                />
              </div>
            )}
            <h4 className=" font-semibold text-[24px] text-center font-helvetica">
              Hello, {userInfo?.user?.firstname || "User"}
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
    </div>
  );
};

export default SecurityPin;
