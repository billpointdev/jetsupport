import Layout from "../../components/shared/layout/layout";
import { IoIosArrowRoundForward } from "react-icons/io";
import { AndroidBottom, AndroidTop, AppleIcon } from "../../utils/OsICon.jsx";
import { CustomButton } from "../../components/shared/footer/footer.jsx";
import WhyJetsupport from "./why-jetsupport.jsx";
import Testimonial from "./testimonial.jsx";
import Jetpay_chat_screen from "../../assets/jetpay-chat-screen.png";
import Jetpay_logo_on_screen from "../../assets/jetpay-logo-on-phone-screen.png";

function Home() {
  return (
    <Layout>
      <div className=" flex  items-center">
        <div className="">
          <div className="flex justify-between items-center bg-[#FEF0E6] px-3 rounded-sm text-primary w-fit">
            <p>
              <IoIosArrowRoundForward />
            </p>
            <p className="text-[10px]">Elevating Your Crypto Experience</p>
          </div>
          {/* <h1 className="text-4xl md:text-[60px] font-semibold w-full md:w-2/3 text-center md:text-start md:leading-[74px]">
           
          </h1>
          <p className="text-[#000000] text-[12px] mt-3">
           
          </p> */}
          <h1 className="w-full md:w-2/3 md:text-start text-4xl md:text-[60px] font-bold tracking-tight mt-4 text-center  text-gray-900 sm:text-5xl">
            Trade Crypto and Gift Cards with Ease
          </h1>{" "}
          <p className="mt-4 leading-relaxed text-gray-700">
            Choose JetSupport for a seamless crypto trading experience with
            detailed and simplified transactions. We offer hassle-free gift card
            trading and a commitment to your maximum satisfaction.
          </p>
          <div className="flex  flex-row mt-5 w-full gap-[9px] items-center justify-center md:justify-start">
            <CustomButton os="Android" >
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

        <div className="hidden lg:block w-1/2">
          <div className=" w-full">
            <div className=" md:w-[480px] md:h-[480px] flex items-center justify-center rounded-full  bg-primary relative">
              <img
                className="  w-[100px] md:w-[320px] object-fit aboslute mr-20 mt-5"
                src={Jetpay_chat_screen}
                alt=""
              />
            </div>
            <div className="w-[70px] h-[70px] rounded-full bg-primary "></div>
          </div>
        </div>
      </div>
      <WhyJetsupport />
      {/*  section starts here */}
      <div className="flex flex-col lg:flex-row  h-full lg:justify-between my-2 items-center">
        <div>
          <div className="flex justify-between items-center bg-[#FEF0E6]  px-3 rounded-md text-primary w-full lg:w-fit"></div>
         
          <h1 className="max-w-xl md:text-[60px] text-4xl font-bold tracking-tight mt-14 text-center md:text-start text-gray-900 sm:text-5xl">
            Download <span className="text-primary">JetSupport</span> Now!
          </h1>{" "}
          <div className="flex flex-row mt-3 my-5 lg:my-0 md:mt-5 w-full gap-[9px] items-center justify-start">
            <CustomButton os="Android" textColor={"text-black"}>
              <div className="flex flex-col gap-[1px]">
                <AndroidTop />
                <AndroidBottom />
              </div>
            </CustomButton>
            <CustomButton os="Apple iOS" textColor={"text-black"}>
              <div className="flex flex-col gap-[1px]">
                <AppleIcon />
              </div>
            </CustomButton>
          </div>
        </div>
        <div className=" mt-12">
          <div className="w-[281px] h-[281px] md:w-[450px]  md:h-[450px] rounded-full border bg-primary relative">
            <img
              className="  absolute left-[-20px] lg:left-[-60px] bottom-1"
              src={Jetpay_logo_on_screen}
              alt=""
            />
          </div>
        </div>
      </div>
      {/* section ends here */}{" "}
      <div>
        {" "}
        <h2 className="max-w-xl text-4xl font-bold tracking-tight mt-14 text-center md:text-start text-gray-900 sm:text-5xl">
          What our customers say <br /> about JetSupport{" "}
        </h2>{" "}
        <p className="mt-6  text-gray-700">
          Read what our satisfied customers have to say about their JetSupport
          experience and discover why JetSupport is the go-to solution for all
          your crypto trading needs{" "}
        </p>
        <Testimonial />{" "}
      </div>
    </Layout>
  );
}

export default Home;

