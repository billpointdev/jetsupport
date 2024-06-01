import Layout from '../../components/shared/layout/layout'
import { IoIosArrowRoundForward } from "react-icons/io";
import {AndroidBottom, AndroidTop, AppleIcon} from "../../utils/OsICon.jsx";
import {CustomButton} from "../../components/shared/footer/footer.jsx";
import WhyJetsupport from "./why-jetsupport.jsx";




function Home() {


    return (
        <Layout>
            {/*Hero section starts here*/}
                <div className="flex justify-between ">
                    <div>
                        <div
                            className="flex justify-between items-center bg-[#FEF0E6] px-3 rounded-md text-primary w-fit">
                            <p><IoIosArrowRoundForward/></p>
                            <p className="text-[10px]">Elevating Your Crypto Experience</p>
                        </div>
                        <h1 className="text-[60px] font-bold">
                            Trade Crypto and<br/>Gift Cards with<br/>Ease.🎉
                        </h1>
                        <p className="text-gray-500 text-[10px]">
                            Choose JetSupport for a seamless crypto trading experience with detailed and simplified
                            transactions. We <br/>
                            offer hassle-free gift card trading and a commitment to your maximum satisfaction.
                        </p>
                        <div
                            className="flex flex-col md:flex-row mt-3 md:mt-5 w-full gap-[9px] items-center justify-start">
                            <CustomButton os="Android">
                                <div className="flex flex-col gap-[1px]">
                                    <AndroidTop/>
                                    <AndroidBottom/>
                                </div>
                            </CustomButton>
                            <CustomButton os="Apple iOS">
                                <div className="flex flex-col gap-[1px]">
                                    <AppleIcon/>
                                </div>
                            </CustomButton>
                        </div>
                    </div>
                    <div className="position-relative border">
                        <div className="w-[320px] h-[320px] rounded-full border bg-primary"></div>
                        <div className="w-[70px] h-[70px] rounded-full bg-primary"></div>
                    </div>
                </div>
            {/*ends here*/}
            <WhyJetsupport/>
        </Layout>
    )
}

export default Home
