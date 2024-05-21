import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../reusables/customInput';
import DownloadButton from '../reusables/DownloadButton';
import AuthLayout from './shared/AuthLayout';

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Perform the action to send reset password request
    // For example, dispatch an action to handle the request
    console.log(data); // You can replace this with your dispatch or API call

    // Navigate to the OTP page after successful submission
    navigate('/otp', { state: { fromForgotPassword: true } });
  };

  return (
    <AuthLayout>
      <div className=''>
        <div>
          <h4 className='font-semibold text-[24px] font-helvetica'>Hello there 👋</h4>
          <p>Welcome, put in your account information to continue. Please enter your phone number to reset your password.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='py-14 flex flex-col justify-between gap-[20px] h-[70vh]'>
          <div className='flex flex-col gap-2'>
            <Input
              label="Phone number"
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              bgColor={'bg-[#FAFAFA]'}
            //   {...register("phone", { required: true })}
            />
          </div>

          <div className='mt-20'>
            <DownloadButton
              buttonText='Send reset password'
              padding={'px-20'}
              width={'w-[100%]'}
              bgColor={'bg-primary'}
              textColor={'text-white'}
            />
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
