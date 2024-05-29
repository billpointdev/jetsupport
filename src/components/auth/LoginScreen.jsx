import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../features/auth/authActions";
import Input from "../reusables/customInput";
import DownloadButton from "../reusables/DownloadButton";
import AuthLayout from "./shared/AuthLayout";
// import Error from '../reusables/Error'
// import Spinner from '../reusables/Spinner'

const LoginScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, setValue, watch } = useForm();

  const navigate = useNavigate();

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate("/security-pin", { state: { fromLogin: true } });
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  return (
    <AuthLayout>
      <div className="mt-20">
        <div>
          <h4 className=" font-semibold text-[24px] font-helvetica">
            Welcome back 👋
          </h4>
          <p>Log in to your account to continue</p>
        </div>
        <form
          onSubmit={handleSubmit(submitForm)}
          className=" py-14 flex flex-col justify-between gap-[20px]"
        >
          <div className="flex flex-col gap-2">
            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="Enter your email address"
              bgColor={"bg-[#FAFAFA]"}
              value={watch("email") || ""}
              onChange={(e) => setValue("email", e.target.value)}
            />

            <Input
              label="Account Password"
              id="password"
              type="password"
              placeholder="Enter your password..."
              bgColor={"bg-[#FAFAFA]"}
              value={watch("password") || ""}
              onChange={(e) => setValue("password", e.target.value)}
            />
            <small>Forget Password? </small>
          </div>

          <div className="mt-40">
            <DownloadButton
              buttonText="Continue"
              padding={"px-20"}
              width={"w-[100%]"}
              bgColor={"bg-primary"}
              textColor={"text-white"}
            />
            <small className="text-center block mt-10">
              New to Jetpay?{" "}
              <span onClick={() => navigate("/signup")}>Create an account</span>
            </small>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
export default LoginScreen;
