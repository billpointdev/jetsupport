import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from './shared/AuthHeader';
import DownloadButton from '../reusables/DownloadButton';
import AvatarSelector from './AvatarUploader'

const AvatarScreen = () => {

      const [selectedAvatar, setSelectedAvatar] = useState(null);

      const handleAvatarSelect = (avatar) => {
            setSelectedAvatar(avatar);
      };

      const navigate = useNavigate();

      const handleLogin = () => {r
            setTimeout(() => {
                  navigate('/set-username');

            }, 2000); 
      };

      return (
            <div className='flex flex-col justify-start relative top-20 place-items-center gap-10 h-[130vh] px-4'>
                  <AuthHeader />
                  <div className='text-center'>
                        <h4 className=' font-semibold text-[24px] text-center font-helvetica'>Set your avatar</h4>
                        <p>Select an avatar for your profile to personalize your account.</p>
                  </div>

                  <div>
                        <AvatarSelector onSelect={handleAvatarSelect} />
                        <div>
                              {/* Render the selected avatar */}
                              {selectedAvatar && <img src={selectedAvatar} alt="Selected Avatar" />}
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

export default AvatarScreen;
