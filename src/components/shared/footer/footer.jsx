import JetSupportLogo from "../../../utils/JetSupportLogo";
import { AndroidBottom, AndroidTop, AppleIcon } from "../../../utils/OsICon";
import GetInTouch from "./getInTouch";
import RightReserved from "./rightReserved";
import HaveAQuestion from "./haveAQuestion.jsx";

export const CustomButton = ({ children, os }) => {
  return (
      <button className="border flex items-center gap-2 px-4 py-1 rounded-full">
        {children}
        <p className=" text-start text-primary text-xs ml-3">
          Download on <br /> <span className="font-bold text-md">{os}</span>
        </p>
      </button>
  );
};

function Footer() {

  // const [isChatVisible, setIsChatVisible] = useState(false);
  //
  // const handleChatIconClick = () => {
  //   setIsChatVisible(true);
  // };
  //
  // const handleChatClose = () => {
  //   setIsChatVisible(false);
  // };

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
      <HaveAQuestion/>
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
        <div className="flex flex-col mt-3 py-8 md:py-0  md:mt-0 lg:w-[430px] w-full md:items-start">
          <p className="font-medium">Get the App</p>
          <div className="flex flex-col md:flex-row mt-3 md:mt-5 w-full gap-[9px] items-center justify-end">
            <CustomButton os="Android">
              <div className="flex flex-col gap-[1px]">
                <AndroidTop />
                <AndroidBottom />
              </div>
            </CustomButton>
            <CustomButton os="Apple iOS">
              <div className="flex flex-col gap-[1px]">
                <AppleIcon />
              </div>
            </CustomButton>
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
