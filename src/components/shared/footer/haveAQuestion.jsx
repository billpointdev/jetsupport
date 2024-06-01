import FAQSection from "./faqSection.jsx";

function HaveAQuestion() {
    return (
      <div className="">
        <div>
          {/* <h3 className="text-3xl  lg:text-[50px] max-w-xl font-semibold tracking-wide mb-4">
           
          </h3> */}
          <h2 className="w-full text-4xl font-bold tracking-tight lg:mt-6 whitespace-nowrap text-gray-900 sm:text-5xl">
            Have a Question?
          </h2>{" "}
          {/* <p className="text-xs text-gray-500">
                   
                </p> */}
          <p className="mt-4 leading-relaxed text-gray-700">
            Have a question about our platform or services? We got you covered.
            Browse our FAQs to find the
            <br />
            information you need, or get in touch with us for personalized
            support.
          </p>
        </div>
        <FAQSection />
      </div>
    );
}

export default HaveAQuestion;
