import userAvatar from "../../../../assets/avatar-images/user-avatar.svg";
const AddName = () => {
  return (
    <div className=" h-[500px] dark:bg-dark w-full">
      <h4 className="font-semibold text-[20px] text-center font-helvetica ">
        One last thing 👋
      </h4>
      <p className="text-center text-[14px] text-[#828282] dark:text-[#FFD9C5]">
        What do we call you by on Jet Support ?
      </p>
      <div className="flex flex-col px-3 w-full text-center items-center">
        <label
          htmlFor="username"
          className="text-sm  self-start text-[#616161] dark:text-[#FFD9C5]"
        >
          Username
        </label>
        <div className="h-12 bg-[#FAFAFA]  dark:bg-[#FFD9C5] w-full rounded-md px-5 flex ">
          <img src={userAvatar} alt="" className=" w-6 cursor-pointer" />
          <input
            type="text"
            id="username"
            className="border-none flex-1 dark:text-dark dark:placeholder:text-dark bg-transparent pl-2 h-full outline-none"
            placeholder="James12"
          />
        </div>
      </div>
    </div>
  );
};

export default AddName;
