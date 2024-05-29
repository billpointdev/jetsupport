import userAvatar from "../../../../assets/avatar-images/user-avatar.svg";
const AddName = () => {
  return (
    <div className=" h-[500px]  w-full">
      
      <h4 className="font-semibold text-[20px] text-center font-helvetica ">
        One last thing 👋
      </h4>
      <p className="text-center text-[14px] text-[#828282]">
        What do we call you by on Jetpay ?
      </p>
      <div className="flex flex-col px-3 w-full text-center items-center">
        <label
          htmlFor="username"
          className="text-sm  self-start text-[#616161]"
        >
          Username
        </label>
        <div className="h-12 bg-[#FAFAFA] w-full rounded-md px-5 flex ">
          <img src={userAvatar} alt="" className=" w-6 cursor-pointer" />
          <input
            type="text"
            id="username"
            className="border-none flex-1 bg-transparent pl-2 h-full outline-none"
            placeholder="James12"
          />
        </div>
      </div>
    </div>
  );
};

export default AddName;
