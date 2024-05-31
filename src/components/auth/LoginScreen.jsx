import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../features/auth/authActions";
import Input from "../reusables/customInput";
import DownloadButton from "../reusables/DownloadButton";
import AuthLayout from "./shared/AuthLayout";
import { AnimatePresence } from "framer-motion";
import Notification from "../reusables/notifications";
import ErrorBot from "../../error";
// import Error from '../reusables/Error'
// import Spinner from '../reusables/Spinner'

const LoginScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const { loading, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, setValue, watch } = useForm();

  const navigate = useNavigate();

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate("/security-pin", { state: { fromLogin: true } });
      // navigate("/profile")
    }
  }, [navigate, userInfo]);

  const submitForm = async (data) => {
    try {
      const response = await dispatch(userLogin(data)).unwrap();
      setNotifications((prev) => [
        { id: Date.now(), text: "Login successful" },
        ...prev,
      ]);
      console.log(response);
    } catch (error) {
      console.log("responseError", error.message);
      setError(error?.message);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  const removeNotif = (id) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };

  return (
    <AnimatePresence>
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
              <small
                className="cursor-pointer"
                onClick={() => navigate("/forgot-password")}
              >
                Forget Password?{" "}
              </small>
            </div>

            <div className="mt-40">
              <DownloadButton
                buttonText={loading ? "Logging in ..." : "Continue"}
                padding={"px-20"}
                width={"w-[100%]"}
                bgColor={"bg-primary"}
                textColor={"text-white"}
              />
              <small className="text-center block mt-10">
                New to Jetpay?{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Create an account
                </span>
              </small>
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none">
          {notifications.map((n) => (
            <Notification removeNotif={removeNotif} {...n} key={n.id} />
          ))}
        </div>
        {error && <ErrorBot error={error} />}
      </AuthLayout>
    </AnimatePresence>
  );
};
export default LoginScreen;
