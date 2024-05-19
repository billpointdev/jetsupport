import ProfilePage from "../../pages/profile-screens";
import Header from "./reusables/header";
import JSDeleteIcon from "../../assets/JSDeleteImage.png";
import Button from "./reusables/button";
import { useState } from "react";
import DeleteAccountModal from "./modals/delete-account";
import AuthorizeDelete from "./modals/authorize-delete";

const DeleteAccount = () => {
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [authorizeDelete, setAuthorizeDelete] = useState(false);

  const handleClick = () => {
    setConfirmDeleteModal(true);
  };
  

  return (
    <ProfilePage>
      <div className="font-inter text-start p-5 pt-6 flex  flex-col  overflow-y-auto">
        <Header
          title="Close Account"
          message="Are you sure you want to deactivate/delete your account? This action cannot be undone."
        />
        <div className="max-w-[421px] flex items-center md:items-start flex-col gap-8 mt-20 ml-2">
          <div className="w-56 h-56 ">
            <img
              src={JSDeleteIcon}
              alt="delete_icon"
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            onClick={handleClick}
            title="Delete Account"
            className="bg-[#FF3B3B]"
          />
        </div>
      </div>
      {confirmDeleteModal && (
        <DeleteAccountModal
          setAuthorizeDelete={setAuthorizeDelete}
          setConfirmDeleteModal={setConfirmDeleteModal}
        />
      )}
      {!confirmDeleteModal && authorizeDelete && (
        <AuthorizeDelete
          setAuthorizeDelete={setAuthorizeDelete}
        />
      )}
    </ProfilePage>
  );
};

export default DeleteAccount;
