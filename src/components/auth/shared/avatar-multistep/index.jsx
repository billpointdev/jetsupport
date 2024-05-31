import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChooseAvatar from "./choose-avatar";
import AddName from "./add-name";
import useMultiForm from "../hooks/useMultiStep";
import DownloadButton from "../../../reusables/DownloadButton";
import AuthHeader from "../AuthHeader";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../api/config";

const INITIAL_DATA = {
  avatar: null,
  userName: "",
  isCustom: false,
};

const MultiStep = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const navigate = useNavigate();
  const [skip, setSkip] = useState(false);

  const updateFields = (fields) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const {
    // steps,
    currentStateIndex,
    step,
    isFirstStep,
    isLastStep,
    next,
  } = useMultiForm([
    <ChooseAvatar
      key="chooseAvatar"
      avatar={data.avatar}
      updateFields={updateFields}
    />,
    <AddName
      key="addName"
      username={data.userName}
      updateFields={updateFields}
    />,
  ]);

  const handleSetName = async () => {
    try {
      const response = await axiosInstance.post("not determined yet", {
        // name: data.userName,
      });
      console.log("Avatar set successfully:", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error setting avatar:", error);
    }
    // setTimeout(() => {
    //
    // }, 1000);
  };

   const handleSubmitAvatar = async () => {
     try {
       if (data.isCustom) {
         const response = await axiosInstance.post("/update/user/picture", {
           picture: data.avatar,
         });
         console.log("Custom image set successfully:", response.data);
       } else {
         const response = await axiosInstance.post("/auth/update/avatar", {
           avatar: data.avatar,
         });
         console.log("Avatar set successfully:", response.data);
       }
       next();
     } catch (error) {
       console.error("Error setting avatar:", error);
     }
   };
  const handleSkip = () => {
    setSkip(true);
    if (skip) {
      navigate("/profile");
    }
  };

  const disabled = Boolean(data.avatar);
  const onSubmit = () => {
    if (!isLastStep) return handleSubmitAvatar();

    handleSetName();
  };

  return (
    <div className=" ">
      <div className="">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStateIndex}
              initial={{ opacity: 0, x: isFirstStep ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLastStep ? 100 : -100 }}
              transition={{ type: "tween" }}
              className="flex flex-col   justify-center h-screen items-center gap-10 px-4"
            >
              <p className="self-end" onClick={handleSkip}>
                Skip
              </p>
              <div className="flex flex-col max-w-lg  w-full justify-center items-center gap-10 px-4">
                <AuthHeader />
                <div className="text-center h-full w-full">
                  {step}
                  <div className="flex justify-center">
                    <div className="w-[448px] ">
                      <DownloadButton
                        buttonText="Continue"
                        type="button"
                        padding={"px-20"}
                        width={"md:w-[100%] mt-8"}
                        bgColor={"bg-primary"}
                        textColor={"text-white"}
                        onClick={onSubmit}
                        disabled={disabled}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MultiStep;
