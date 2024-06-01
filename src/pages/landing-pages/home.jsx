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
      {/*Hero section starts here*/}
      <div className="md:flex justify-around items-center ">
        <div>
          <div className="flex justify-between items-center bg-[#FEF0E6] px-3 rounded-md text-primary w-fit">
            <p>
              <IoIosArrowRoundForward />
            </p>
            <p className="text-[10px]">Elevating Your Crypto Experience</p>
          </div>
          <h1 className="text-[60px] font-bold">
            Trade Crypto and
            <br />
            Gift Cards with
            <br />
            Ease.🎉
          </h1>
          <p className="text-gray-500 text-[10px]">
            Choose JetSupport for a seamless crypto trading experience with
            detailed and simplified transactions. We <br />
            offer hassle-free gift card trading and a commitment to your maximum
            satisfaction.
          </p>
          <div className="flex flex-col md:flex-row mt-3 md:mt-5 w-full gap-[9px] items-center justify-start">
            <CustomButton os="Android" bgColor={"bg-primary"}>
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

        <div className=" ">
          <div className="w-[400px] h-[400px] flex items-center justify-center rounded-full border bg-primary relative">
            <img
              className=" w-[290px] aboslute "
              src={Jetpay_chat_screen}
              alt=""
            />
          </div>
          <div className="w-[70px] h-[70px] rounded-full bg-primary "></div>
        </div>
      </div>
      {/*ends here*/}
      <WhyJetsupport />

      {/* Download jetpay now starts here */}

      <div className="flex justify-around my-20 items-center">
        <div>
          <div className="flex justify-between items-center bg-[#FEF0E6] px-3 rounded-md text-primary w-fit"></div>
          <h1 className="text-[60px] font-bold">
            Download <span className="text-primary">JetSupport</span> <br />{" "}
            Now!
          </h1>

          <div className="flex flex-col md:flex-row mt-3 md:mt-5 w-full gap-[9px] items-center justify-start">
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
        <div className="position-relative ">
          <div className="w-[450px] h-[450px] rounded-full border bg-primary relative">
            <img
              className="  absolute left-[-60px] bottom-1"
              src={Jetpay_logo_on_screen}
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Download jetpay now ends here */}

      {/* what customers are saying starts here*/}
      <div>
        <h1 className="text-[60px] font-semibold">
          What our customers say <br /> about JetSupport
        </h1>
        <p>
          Read what our satisfied customers have to say about their JetSupport
          experience and discover why JetSupport is the go-to solution for all
          your crypto trading needs
        </p>
        <Testimonial />
      </div>

      {/* what customers are saying ends here*/}
    </Layout>
  );
}

export default Home;
