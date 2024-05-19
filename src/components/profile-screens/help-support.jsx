import ProfilePage from "../../pages/profile-screens";
import Header from "./reusables/header";
import helpSupportimg from "../../assets/help-support.png";
import LiveChatIcon from "../../utils/LiveChatIcon";
import { FaSquareInstagram, FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";



const helpLinks = [
  { title: "Live Chat", Icon: LiveChatIcon, href: "#" },
  { title: "Instagram", Icon: FaSquareInstagram, href: "/#" },
  { title: "Facebook", Icon: FaFacebook, href: "#" },
  { title: "Twitter ", Icon: FaTwitter, href: "#" },
];
const HelpSupport = () => {
  return (
    <ProfilePage>
      <div className="font-inter text-start p-5 pt-6 flex  flex-col  overflow-y-auto">
        <Header
          title="Help & Support"
          message="Your Jetpay profile is your personal gateway to managing your account information.
          "
        />
        <div className="  max-w-[421px] mt-8 md:ml-6  text-center flex flex-col items-center">
          <div className="w-52 h-52">
            <img
              src={helpSupportimg}
              alt="helpSupportimg"
              className="object-cover h-full w-full"
            />
          </div>
          <p className="text-[#212121] text-lg dark:text-white ">How can we help you?</p>
          <p className="text-[#757575] text-md  dark:text-white leading-5">
            At Jetpay, we&apos;re committed to providing you with the best
            possible experience. If you have any questions, concerns, or issues,
            we&apos;re here to help.
          </p>

          <div className="flex items-center gap-6 mt-6">
            {helpLinks.map((helplink, idx) => {
              const { title, href, Icon } = helplink;
              return (
                <p
                  className="flex flex-col items-center justify-center gap-3  w-16 font-inter  h-16"
                  key={idx}
                >
                  <Icon className="text-2xl dark:text-white"/>
                  <a
                    href={href}
                    target="_blank"
                    className="whitespace-nowrap dark:text-white text-xs font-[501] text-[#999999]"
                    rel="noopener noreferrer"
                  >
                    {title}
                  </a>
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </ProfilePage>
  );
};

export default HelpSupport;
