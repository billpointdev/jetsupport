import React, { useState, useEffect, useRef } from 'react';
import Input from "../reusables/customInput";
import { useNavigate } from 'react-router-dom';
import AuthHeader from './shared/AuthHeader';

const OtpPage = () => {
      const [otp, setOtp] = useState(Array(6).fill(''));
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

      const handleOtpChange = (value, index) => {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (index < 5 && value !== '') {
                  const nextInput = document.getElementById(`otp-input-${index + 1}`);
                  if (nextInput) {
                        nextInput.focus();
                  }
            } else if (index > 0 && value === '') {
                  const prevInput = document.getElementById(`otp-input-${index - 1}`);
                  if (prevInput) {
                        prevInput.focus();
                  }
            }

            if (newOtp.every((digit) => digit !== '')) {
                  handleLogin();
            }
      };

      const handleResend = () => {
            setTimer(60);
            // Will Add  logic for resending OTP here:

      };

      const handleLogin = () => {
            
            setTimeout(() => {
                  navigate('/security-pin');
            }, 2000); 
      };

      return (
            <div className='flex flex-col justify-start relative top-20 place-items-center gap-10 h-[100vh] px-4'>
                  <AuthHeader />
                  <div className='text-center'>
                        <h4 className=' font-semibold text-[24px] text-center font-helvetica'>Account Verification 👋</h4>
                        <p>We’ve sent a unique code to your mobile number <br /> (+234) 9035017863</p>
                  </div>

                  <div>
                        <div className="flex gap-2 border-collapse max-w-[400px]">
                              {otp.map((value, index) => (
                                    <Input
                                          key={index}
                                          id={`otp-input-${index}`}
                                          type="text"
                                          placeholder="  _"
                                          bgColor="bg-lightGray"
                                          value={value}
                                          onChange={(e) => handleOtpChange(e.target.value, index)}
                                          autoFocus={index === 0}
                                    />
                              ))}
                        </div>
                  </div>
                  <div className='text-center'>
                        <small>Didn’t receive code?</small>

                        {timer > 0 ? (
                              <p className='py-4'>You can resend code in <span className='text-[#0063F7]'>{timer}</span> s</p>
                        ) : (
                              <p className='py-4'>Click the "Resend OTP" button to resend OTP</p>
                        )}


                  </div>

            </div>
      );
};

export default OtpPage;
