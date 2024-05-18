import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../features/auth/authActions'
import Input from '../reusables/customInput'
import DownloadButton from '../reusables/DownloadButton'
// import Error from '../reusables/Error'
// import Spinner from '../reusables/Spinner'


const LoginScreen = () => {
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate('/profile')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Input
        label="Email Address"
        id="email"
        type="email"
        placeholder="Enter your email address"
      />

      <Input
        label="Account Password"
        id="password"
        type="tel"
        placeholder="Enter your password"
      />

<DownloadButton  buttonText='Continue' bgColor={'bg-primary'} textColor={'text-white'}/>

    </form>
  )
}
export default LoginScreen