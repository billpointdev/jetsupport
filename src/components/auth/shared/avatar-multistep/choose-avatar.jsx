import AvatarSelector from "../../AvatarUploader";
import Proptypes from "prop-types";

const ChooseAvatar = ( { updateFields } ) =>
{
  
  const handleAvatarSelect = (selectedAvatar, isCustom) => {
    updateFields({ avatar: selectedAvatar, isCustom });
  };

  return (
    <>
      <h4 className="font-semibold text-[24px] dark:bg-dark text-center font-helvetica">
        Set your avatar
      </h4>
      <p>Select an avatar for your profile to personalize your account.</p>

      <div className="my-4">
        <AvatarSelector onSelect={handleAvatarSelect} />
      </div>
    </>
  );
};

ChooseAvatar.propTypes = {
  updateFields: Proptypes.func,
};

export default ChooseAvatar;
