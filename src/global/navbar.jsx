import JetSupportLogo from "../assets/jetsupportcropped.png";
import avatar from "../assets/frameimage.png";
import NewChatIcon from "../utils/NewChatIcon";
import NotificationIcon from "../utils/NotificationIcon";
import Proptypes from "prop-types";
import StaggeredDropDown from "../components/profile-screens/utils/dropdown";

const Navbar = ( { toggleSidebar } ) =>
{
  
  return (
    <header className=" fixed dark:bg-gray-800 dark:text-white bg-white left-0 top-0 z-50  w-full h-[66px] border-b">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="hidden md:block text-teal-600" href="#">
          <span className="sr-only">Home</span>
          <img src={JetSupportLogo} alt="" className="w-[56px] h-[49px]" />
        </a>
        <button
          className="block rounded  p-2.5 dark:text-white dark:hover:text-white text-gray-600 transition hover:text-gray-600/75 lg:hidden"
          onClick={toggleSidebar}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:flex items-center">
            <div className=" w-12 h-12 rounded-full border">
              <img src={avatar} alt="" className="object-cover h-full w-full" />
            </div>
            <div className="text-center sm:text-left ml-1">
              <h1 className="  dark:text-white sm:text-2xl font-inter">
                Good Morning,{" "}
                <span className=" text-[#010E0E] dark:text-white font-bold ">Quine</span> 👋
              </h1>

              <p className=" text-xs text-[#616161] dark:text-white">
                What would you live to buy or sell today?
              </p>
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="flex rounded-full gap-2  bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary/75"
                href="#"
              >
                <NewChatIcon /> New Chat{" "}
              </a>

              <a
                className="hidden rounded-full bg-gray-100 px-2.5 py-2.5 text-sm font-medium text-teal-600 transition hover:bg-primary/75 sm:block"
                href="#"
              >
                <NotificationIcon />
              </a>
            </div>
            <StaggeredDropDown />
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  open: Proptypes.bool.isRequired,
  setOpen: Proptypes.func.isRequired,
  toggleSidebar: Proptypes.func.isRequired,
};

export default Navbar;
