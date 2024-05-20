import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Error from '../reusables/Error'
import { registerUser } from '../../features/auth/authActions'
import Spinner from '../reusables/Spinner'
import DownloadButton from '../reusables/DownloadButton'
import Input from '../reusables/customInput'
import AuthLayout from './shared/AuthLayout'



const SignupScreen = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch()
  const { register, handleSubmit, setValue, watch } = useForm()

  const navigate = useNavigate()

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate('/profile')
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/profile')
  }, [navigate, userInfo, success])

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      alert('Password mismatch')
      return
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase()
    dispatch(registerUser(data))
  }

  return (
    <AuthLayout>
      <div className=''>
        <div>
          <h4 className=' font-semibold text-[24px] font-helvetica'>Hello there 👋</h4>
          <p>Welcome, put in your account information to continue. Please enter your email & password to create an account.</p>
        </div>
        <form onSubmit={handleSubmit(submitForm)} className=' py-14 flex flex-col justify-between gap-[20px]'>
          <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-2 gap-2 justify-between'>
              <Input
                label="First Name"
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                bgColor={'bg-[#FAFAFA]'}
                value={watch("firstName") || ""}
                onChange={(e) => setValue("firstName", e.target.value)}
              />
              <Input
                label="Last Name"
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                bgColor={'bg-[#FAFAFA]'}
                value={watch("lastName") || ""}
                onChange={(e) => setValue("lastName", e.target.value)}
              />
            </div>

            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="Enter your email address"
              bgColor={'bg-[#FAFAFA]'}
              value={watch("email") || ""}
              onChange={(e) => setValue("email", e.target.value)}
            />
            <Input
              label="Phone number"
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              bgColor={'bg-[#FAFAFA]'}
              value={watch("phone") || ""}
              onChange={(e) => setValue("phone", e.target.value)}
            />
            <Input
              label="Account Password"
              id="password"
              type="password"
              placeholder="Enter your password..."
              bgColor={'bg-[#FAFAFA]'}
              value={watch("password") || ""}
              onChange={(e) => setValue("password", e.target.value)}
            />
            <small>I agree to JetPay <a href="" className='text-[#1877F2] '>Terms of Service </a>and <a href="" className='text-[#1877F2] '>Privacy policy</a></small>
          </div>
          <div className='mt-20'>
            <DownloadButton
              buttonText='Continue'
              padding={'px-20'}
              width={'w-[100%]'}
              bgColor={'bg-primary'}
              textColor={'text-white'}
            />
            <small className='text-center block mt-10'>Have a Jetpay account? Login</small>
          </div>
        </form>
      </div>

    </AuthLayout>
  )
}

export default SignupScreen
