import { useState } from "react";
import AvatarSelector from "../../AvatarUploader";

const ChooseAvatar = () => {
  // eslint-disable-next-line no-unused-vars
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  return (
    <>
      <h4 className="font-semibold text-[24px] text-center font-helvetica">
        Set your avatar
      </h4>
      <p>Select an avatar for your profile to personalize your account.</p>

      <div className="my-4">
        <AvatarSelector onSelect={handleAvatarSelect} />
      </div>
    </>
  );
};

export default ChooseAvatar;
