import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from './shared/AuthHeader';
import DownloadButton from '../reusables/DownloadButton';
import AvatarSelector from './AvatarUploader';
import Input from '../reusables/customInput';
import userAvatar from '../../assets/avatar-images/user-avatar.svg'

const AvatarScreen = () => {
      const [selectedAvatar, setSelectedAvatar] = useState(null);
      const [currentStep, setCurrentStep] = useState(1);
      const navigate = useNavigate();

      const handleAvatarSelect = (avatar) => {
            setSelectedAvatar(avatar);
      };

      const handleContinue = () => {
            setCurrentStep(currentStep + 1);
      };

      const handleLogin = () => {
            setTimeout(() => {
                  navigate('/profile');
            }, 1000);
      };

      return (
            <div>
                  <div className='flex flex-col justify-start relative top-20 place-items-center gap-10 px-4'>
                        <AuthHeader />
                        {currentStep === 1 && (
                              <div className="text-center h-[100vh]">
                                    <h4 className='font-semibold text-[24px] text-center font-helvetica'>Set your avatar</h4>
                                    <p>Select an avatar for your profile to personalize your account.</p>

                                    <div className='my-4'>
                                          <AvatarSelector onSelect={handleAvatarSelect} />
                                    </div>

                                    <DownloadButton
                                          buttonText='Continue'
                                          padding={'px-20'}
                                          width={'md:w-[100%] '}
                                          bgColor={'bg-primary'}
                                          textColor={'text-white'}
                                          onClick={handleContinue}
                                    />
                              </div>
                        )}
                  </div>

                  <div className='flex flex-col justify-start relative top-20 place-items-center gap-10 px-4'>
                        {/* <AuthHeader /> */}
                        {currentStep === 2 && (
                              <div className="flex flex-col justify-between text-center h-[70vh] md:w-[30%] w-[100%]">
                                    <div className='relative'>
                                          <h4 className='font-semibold text-[20px] text-center font-helvetica mt-10'>One last thing 👋</h4>
                                          <p className='text-center'>What do we call you by on Jetpay?</p>

                                          <Input
                                                label="Username"
                                                id="username"
                                                type="text"
                                                placeholder="      James"
                                                width={'md:w-[100%] '}
                                                bgColor={'bg-[#FAFAFA]'}
                                                onChange={(e) => setValue("username", e.target.value)}
                                                className="mb-4"
                                          />

                                          <img src={userAvatar} alt="" className='absolute left-4 top-[122px] cursor-pointer' />
                                    </div>

                                    <DownloadButton
                                          buttonText='Continue'
                                          padding={'px-20'}
                                          width={'md:w-[100%] '}
                                          bgColor={'bg-primary'}
                                          textColor={'text-white'}
                                          onClick={handleLogin}
                                    />
                              </div>
                        )}
                  </div>
      
            </div>
      );
};

export default AvatarScreen;
