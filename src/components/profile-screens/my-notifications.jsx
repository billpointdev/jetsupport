import { useState } from "react";
import ProfilePage from "../../pages/profile-screens"
import Header from "./reusables/header"
import Toggler from "./reusables/toggler";
import { GoBellFill } from "react-icons/go";

const MyNotificaitions = () =>
{
      const [notifications, setNotifications] = useState({
        push: false,
        sms: false,
        email: false,
      });

      const handleToggle = (notificationType) => {
        setNotifications((prevNotifications) => {
          return {
            ...prevNotifications,
            [notificationType]: !prevNotifications[notificationType],
          };
        });
      };

   
  return (
    <ProfilePage>
      <div className="font-inter text-start p-5 pt-6 flex  flex-col  overflow-y-auto">
        <Header
          title="Notifications"
          message="Your Jet support profile is your personal gateway to managing your account information."
        />
        <div className="max-w-[421px] flex flex-col gap-8 mt-20 ml-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <GoBellFill className="text-2xl dark:text-white" />
              <p className="font-inter text-[#424242] dark:text-white text-md ">
                Push Notification
              </p>
            </div>
            <Toggler
              id="pushNotification"
              checked={notifications.push}
              onChange={() => handleToggle("push")}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <GoBellFill className="text-2xl dark:text-white" />
              <p className="font-inter text-[#424242] dark:text-white text-md ">
                SMS Notification
              </p>
            </div>
            <Toggler
              id="smsNotification"
              checked={notifications.sms}
              onChange={() => handleToggle("sms")}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <GoBellFill className="text-2xl dark:text-white" />
              <p className="font-inter text-[#424242] dark:text-white text-md ">
                Email Notification
              </p>
            </div>
            <Toggler
              id="emailNotification"
              checked={notifications.email}
              onChange={() => handleToggle("email")}
            />
          </div>
        </div>
      </div>
    </ProfilePage>
  );
}

export default MyNotificaitions