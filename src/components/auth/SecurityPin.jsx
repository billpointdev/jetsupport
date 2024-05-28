import  { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Input from "../reusables/customInput";
import AuthHeader from './shared/AuthHeader';
import DownloadButton from '../../components/reusables/DownloadButton';

const SecurityPin = () => {
  const [pin, setPin] = useState(Array(4).fill(''));
  const [timer, setTimer] = useState(45);
  // const buttonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo , userEmail } = useSelector((state) => state.auth);

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

    if (index === 3 && value.length > 1) {
      return;
    }

    setPin(newPin);

    if (index < 3 && value !== '') {
      const nextInput = document.getElementById(`pin-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Check if all pin fields are filled
    if (location.state?.fromLogin && newPin.every(p => p !== '')) {

      setTimeout(() => {
        navigate('/profile');

      }, 2000);
    }

  };

console.log("userinfo", userEmail);

  return (
    <div className="flex flex-col  justify-start relative top-20 place-items-center gap-10 h-[100vh] px-4">
      <AuthHeader />

      <div className="text-center">
        {location.state?.fromLogin ? (
          <>
            {userInfo?.avatar && (
              <div className="my-4 flex justify-center">
                <img
                  src={userInfo.avatar}
                  alt="User Avatar"
                  className="rounded-full w-24 h-24 object-cover"
                />
              </div>
            )}
            <h4 className=" font-semibold text-[24px] text-center font-helvetica">
              Hello, James
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
        <div className="flex gap-2 border-collapse max-w-[300px]">
          {pin.map((value, index) => (
            <Input
              key={index}
              id={`pin-input-${index}`}
              type="text"
              placeholder="-"
              bgColor="bg-lightGray"
              value={value}
              className="pl-[29.5px]"
              onChange={(e) => handlePinChange(e.target.value, index)}
              maxLength={1} // Allow only one character
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
          onClick={() => navigate("/set-avatar")}
        />
      )}
    </div>
  );
};

export default SecurityPin;
