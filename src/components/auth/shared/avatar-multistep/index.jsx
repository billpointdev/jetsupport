import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChooseAvatar from "./choose-avatar";
import AddName from "./add-name";
import useMultiForm from "../hooks/useMultiStep";
import DownloadButton from "../../../reusables/DownloadButton";
import AuthHeader from "../AuthHeader";
import { useNavigate } from "react-router-dom";

const INITIAL_DATA = {
  image: "",
  name: "",
};

const MultiStep = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const navigate = useNavigate();

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
    <ChooseAvatar {...data} key="userForm" updateFields={updateFields} />,
    <AddName {...data} key="completionForm" updateFields={updateFields} />,
  ]);

  const handleLogin = () => {
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isLastStep) return next();
    handleLogin();
  };

  return (
    <div className=" ">
      <div className="">
        <form onSubmit={onSubmit}>
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
                <div className="flex flex-col max-w-lg  w-full justify-center items-center gap-10 px-4">
                  <AuthHeader />
                  <div className="text-center h-full w-full">
                    {step}
                    <div className="flex justify-center">
                      <div className="w-[448px] ">
                        <DownloadButton
                          buttonText="Continue"
                          type="submit"
                          padding={"px-20"}
                          width={"md:w-[100%] mt-8"}
                          bgColor={"bg-primary"}
                          textColor={"text-white"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStep;
