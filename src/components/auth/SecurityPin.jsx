import React, { useState, useEffect, useRef } from 'react';
import Input from "../reusables/customInput";
import { useNavigate } from 'react-router-dom';
import AuthHeader from './shared/AuthHeader';
import DownloadButton from '../../components/reusables/DownloadButton'

const SecurityPin = () => {
  const [pin, setPin] = useState(Array(4).fill(''));
  const [timer, setTimer] = useState(45);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

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
    
      // Restrict users from adding more than one value in the last input field
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
    };
    

  const handleLogin = () => {
    navigate('/set-avatar');
  };

  return (
    <div className='flex flex-col justify-start relative top-20 place-items-center gap-10 h-[100vh] px-4'>
      <AuthHeader />
      <div className='text-center'>
        <h4 className=' font-semibold text-[24px] text-center font-helvetica'>Create your security pin</h4>
        <p>We will require this pin to process your transactions</p>
      </div>

      <div>
        <div className="flex gap-2 border-collapse max-w-[300px]">
          {pin.map((value, index) => (
            <Input
              key={index}
              id={`pin-input-${index}`}
              type="text"
              placeholder="_"
              bgColor="bg-lightGray"
              value={value}
              onChange={(e) => handlePinChange(e.target.value, index)}
              maxLength={1} // Allow only one character
              autoFocus={index === 0}
            />
          ))}
        </div>
      </div>

      <DownloadButton
        buttonText='Continue'
        padding={'px-20'}
        width={'md:w-[30%] '}
        bgColor={'bg-primary'}
        textColor={'text-white'}
        onClick={handleLogin}       
      />
    </div>
  );
};

export default SecurityPin;
