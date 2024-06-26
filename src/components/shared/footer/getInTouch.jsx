import { IoCallOutline } from "react-icons/io5";
import InboxIcon from "../../../utils/InboxIcon";
import { socialLinks } from "../../../utils";
import { LandingPageInput } from "../../reusables/customInput";
import { Circle } from "../../../utils/constants";

const GetInTouchForm = () => {
  return (
    <form action="#" className="space-y-3 bg-[#fafafc]">
      <LandingPageInput
        label="Full Name"
        id="name"
        type="text"
        placeholder="Enter your full name"
      />

      <LandingPageInput
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your email address"
      />
      <LandingPageInput
        label="Phone"
        id="phone"
        type="tel"
        placeholder="Enter your phone number"
      />
      <LandingPageInput
        label="Message"
        id="message"
        type="tel"
        placeholder="Enter your message here..."
      />
      <div className="mt-4 w-full">
        <button
          type="submit"
          className="block w-full rounded-xl bg-primary px-5 py-3 font-medium text-white transform scale-95 hover:scale-100 transition-transform duration-300"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

const GetInTouch = () => {
  return (
    <div className="h-full flex relative flex-col  getInTouch justify-between w-full md:py-12 lg:py-0 ">
      <section className="overflow-hidden w-full">
        <div className="mx-auto max-w-[501px] lg:max-w-none ">
          <div className="grid grid-cols-1 gap-x-24 gap-y-8 lg:grid-cols-8">
            <div className="lg:col-span-4 lg:py-12">
              <div className="text-start flex flex-col gap-y-5 lg:gap-y-24">
                <div className="">
                  <h1 className=" text-3xl whitespace-nowrap lg:text-[50px] max-w-xl font-semibold tracking-wide">
                    Get in touch
                  </h1>
                  <p className="text-xs text-gray-500 mt-5 text-[13px] font-inter">
                    Have an enquiry? Fill out the form to contact our team
                  </p>
                </div>
                <div className="h-fit text-xs text-gray-500   gap-y-[19px] w-fit">
                  <p className="flex items-center text-[24px] ">
                    <IoCallOutline />{" "}
                    <span className="text-sm  ml-2">+ +234 906 421 9645</span>
                  </p>
                  <p className="flex items-center  mt-2">
                    <InboxIcon />{" "}
                    <span className="text-sm  ml-2">hello@jetsupport.com</span>
                  </p>
                </div>
                <div className="h-[100px]  flex flex-col justify-between">
                  <p>Connect with us on our social media accounts</p>
                  <ul className="flex gap-3  ml-1 lg:mt-0">
                    {socialLinks.map((link, index) => (
                      <li
                        key={index}
                        className="bg-primarylight cursor-pointer h-[40px] w-[40px] text-2xl rounded-full flex items-center justify-center"
                      >
                        <a className="text-primary" href={link?.link}>
                          {link?.icon}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <Circle
                  size="20"
                  top=""
                  left=""
                  zIndex="-10"
                  className="left-[-10%] -z-10 lg:left-[-12%] hidden lg:block -bottom-8 md:-bottom-0 lg:bottom-8  w-24 h-24"
                />
              </div>
            </div>
            <div className="rounded-xl  bg-[#fafafc] p-8 shadow-sm border border-[#DDE5E9] lg:col-span-4 lg:p-6">
              <GetInTouchForm />
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default GetInTouch;
