import { useState } from "react";
import { Avatarsicons } from "../../utils/AvatarIcons";
import UploadIcon from "../../assets/avatar-images/Upload own photo.svg";
import PropTypes from "prop-types";

const AvatarSelector = ({ onSelect }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isCustomImage, setIsCustomImage] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedAvatar(reader.result);
        setIsCustomImage(true);
        onSelect(reader.result, isCustomImage);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = (avatarSrc, index) => {
    setSelectedAvatar(avatarSrc);
    setIsCustomImage(false);
    onSelect(index + 1, isCustomImage);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-3 w-fit gap-3 md:gap-6">
        {Avatarsicons.map((avatar, index) => (
          <div
            key={index}
            onClick={() => handleAvatarClick(avatar.src, index)}
            className={`cursor-pointer w-18 h-18 md:w-24 md:h-24 object-cover ${
              selectedAvatar === avatar.src
                ? "border-2 rounded-full border-primary"
                : ""
            }`}
          >
            <img
              src={avatar.src}
              alt={avatar.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Custom file input */}
        <label className="cursor-pointer w-18 h-18 md:w-24 md:h-24">
          <img
            src={UploadIcon}
            alt="Upload Avatar"
            className="w-full h-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

AvatarSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default AvatarSelector;
