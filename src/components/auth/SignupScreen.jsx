import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import Error from "../reusables/Error"; @~Ellovick(Ezekiel Elom) please dont forget to utilize this
import { registerUser } from "../../features/auth/authActions";
// import Spinner from "../reusables/Spinner";
import DownloadButton from "../reusables/DownloadButton";
import Input from "../reusables/customInput";
import AuthLayout from "./shared/AuthLayout";
import Notification from "../reusables/notifications";
import ErrorBot from "../../error";

const SignupScreen = () => {
  const { userInfo, success, userEmail } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, setValue, watch } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (success && userEmail && userInfo) navigate("/otp");
  }, [navigate, userInfo, success, userEmail]);

  // const submitForm = (data) => {
  //   if (data.password !== data.password_confirmation) {
  //     alert("Password mismatch");
  //     return;
  //   }
  //   dispatch(registerUser(data));
  // };
  const submitForm = async (data) => {
    try {
      if (data.password !== data.password_confirmation) {
        alert("Password mismatch");
        return;
      }
      const response = await dispatch(registerUser(data)).unwrap();
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
    <AuthLayout>
      <div className="">
        <div>
          <h4 className=" font-semibold text-[24px] font-helvetica">
            Hello there 👋
          </h4>
          <p>
            Welcome, put in your account information to continue. Please enter
            your email & password to create an account.
          </p>
          {/* {error && <p>{error} </p>} */}
        </div>
        <form
          onSubmit={handleSubmit(submitForm)}
          className=" py-14 flex flex-col justify-between gap-[20px]"
        >
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2 justify-between">
              <Input
                label="First Name"
                id="firstname"
                type="text"
                placeholder="Enter your first name"
                bgColor={"bg-[#FAFAFA]"}
                value={watch("firstname") || ""}
                onChange={(e) => setValue("firstname", e.target.value)}
              />
              <Input
                label="Last Name"
                id="lastname"
                type="text"
                placeholder="Enter your last name"
                bgColor={"bg-[#FAFAFA]"}
                value={watch("lastname") || ""}
                onChange={(e) => setValue("lastname", e.target.value)}
              />
            </div>

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
              label="Phone number"
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              bgColor={"bg-[#FAFAFA]"}
              value={watch("phone") || ""}
              onChange={(e) => setValue("phone", e.target.value)}
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
            <Input
              label="Confirm Password"
              id="password_confirmation"
              type="password"
              placeholder="Enter your password..."
              bgColor={"bg-[#FAFAFA]"}
              value={watch("password_confirmation") || ""}
              onChange={(e) =>
                setValue("password_confirmation", e.target.value)
              }
            />
            <small>
              I agree to JetPay{" "}
              <a href="" className="text-[#1877F2] ">
                Terms of Service{" "}
              </a>
              and{" "}
              <a href="" className="text-[#1877F2] ">
                Privacy policy
              </a>
            </small>
          </div>
          <div className="mt-20">
            <DownloadButton
              buttonText="Continue"
              padding={"px-20"}
              width={"w-[100%]"}
              bgColor={"bg-primary"}
              textColor={"text-white"}
            />
            <small className="text-center block mt-10">
              Have a Jetpay account?{" "}
              <span onClick={() => navigate("/login")} className="cursor-pointer">Login</span>
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
  );
};

export default SignupScreen;
