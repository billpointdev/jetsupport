import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Error from '../reusables/Error'
import { registerUser } from '../../features/auth/authActions'
import Spinner from '../reusables/Spinner'
import DownloadButton from '../reusables/DownloadButton'
import Input from '../reusables/customInput'

const SignupScreen = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

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
    <form onSubmit={handleSubmit(submitForm)}>
     <Input
        label="First Name"
        id="name"
        type="text"
        placeholder="Enter your first name"
      />
<Input
        label="Last Name"
        id="name"
        type="text"
        placeholder="Enter your last name"
      />

      <Input
        label="Email Address"
        id="email"
        type="email"
        placeholder="Enter your email address"
      />
      <Input
        label="Phone number"
        id="phone"
        type="tel"
        placeholder="Enter your phone number"
      />
      <Input
        label="Account Password"
        id="password"
        type="tel"
        placeholder="Enter your password..."
      />

      <DownloadButton  buttonText='Continue' bgColor={'bg-primary'} textColor={'text-white'}/>
      
    </form>
  )
}
export default SignupScreen