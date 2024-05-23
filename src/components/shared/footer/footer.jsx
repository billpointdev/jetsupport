import { useState } from 'react';
import JetSupportLogo from "../../../utils/JetSupportLogo";
import { AndroidBottom, AndroidTop, AppleIcon } from "../../../utils/OsICon";
import DownloadButton from "../../reusables/DownloadButton";
import GetInTouch from "./getInTouch";
import RightReserved from "./rightReserved";



function Footer() {

  const [isChatVisible, setIsChatVisible] = useState(false);

  const handleChatIconClick = () => {
    setIsChatVisible(true);
  };

  const handleChatClose = () => {
    setIsChatVisible(false);
  };

  const links = [
    {
      name: "About us",
      path: "#",
    },
    {
      name: "Features",
      path: "#",
    },
    {
      name: "Faqs",
      path: "#",
    },
    {
      name: "Help",
      path: "#",
    },
    {
      name: "Privacy policy",
      path: "#",
    },
  ];
  return (
    <div className="relative h-full w-full">
      <GetInTouch />
      <footer className=" w-full lg:h-[280px] items-center py-3 flex flex-col md:flex-row justify-center md:justify-between font-inter ">
        <div className="w-full  flex flex-col  justify-center items-center md:items-start">
          <JetSupportLogo />
          {/* links */}
          <ul className="flex w-full  lg:gap-4 leading-3 lg:leading-5 gap-x-5 mt-2 gap-y-2 flex-wrap justify-center md:justify-start">
            {links.map((link, index) => (
              <li key={index} className="cursor-pointer ">
                <a
                  href={link.path}
                  className="text-[#000000] text-xs font-medium  hover:underline"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* get the app div */}
        <div className="flex flex-col  mt-3 py-12 md:py-0  md:mt-0 w-full lg:w-fit  md:items-start items-center ">
          <p className="font-medium">Get the App</p>
          <div className="flex flex-col md:flex-row mt-3 md:mt-5 w-full gap-[9px] items-center">
            <DownloadButton os="Android" downloadOn={'Download on'}>
              <div className="flex flex-col gap-[1px]">
                <AndroidTop />
                <AndroidBottom />
              </div>
            </DownloadButton>
            <DownloadButton os="Apple iOS"  downloadOn={'Download on'}>
              <div className="flex flex-col gap-[1px]">
                <AppleIcon />
              </div>
            </DownloadButton>
          </div>
        </div>
      </footer>
      <RightReserved />
      <div>
    </div>
    </div>
  );
}

export default Footer;
