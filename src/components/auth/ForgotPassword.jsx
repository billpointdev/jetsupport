import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../reusables/customInput";
import DownloadButton from "../reusables/DownloadButton";
import AuthLayout from "./shared/AuthLayout";
import axiosInstance from "../../api/config";
import Notification from "../reusables/notifications";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ErrorBot from "../../error";

const ForgotPassword = () => {
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, setValue, watch } = useForm();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      // eslint-disable-next-line no-unused-vars
      localStorage.setItem("userEmail", data.email);
      const response = await axiosInstance.post("/auth/forget/password", {
        email: data.email,
      });
      setNotifications((prev) => [
        { id: Date.now(), text: response?.message },
        ...prev,
      ]);
      navigate("/otp", { state: { fromForgotPassword: true } });
    } catch (error) {
      console.error("Error:", error?.response?.data?.message);
      setError(error?.response?.data?.message);
    }
  };

  const removeNotif = (id) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  return (
    <AuthLayout>
      <div className="">
        <div>
          <h4 className="font-semibold text-[24px] font-helvetica">
            Hello there 👋
          </h4>
          <p>
            Welcome, put in your account information to continue. Please enter
            your email to reset your password.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-14 flex flex-col justify-between gap-[20px] h-[70vh]"
        >
          <div className="flex flex-col gap-2">
            <Input
              label="Email "
              id="email"
              type="email"
              placeholder="Enter your email"
              bgColor={"bg-[#FAFAFA]"}
              value={watch("email") || ""}
              onChange={(e) => setValue("email", e.target.value)}
            />
          </div>

          <div className="mt-20">
            <DownloadButton
              buttonText="Send reset password"
              padding={"px-20"}
              width={"w-[100%]"}
              bgColor={"bg-primary"}
              textColor={"text-white"}
            />
          </div>
        </form>
        <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none">
          <AnimatePresence>
            {notifications.map((n) => (
              <Notification removeNotif={removeNotif} {...n} key={n.id} />
            ))}
          </AnimatePresence>
        </div>
      </div>
      {error && <ErrorBot error={error} />}
    </AuthLayout>
  );
};

export default ForgotPassword;
