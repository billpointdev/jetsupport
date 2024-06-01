import React from "react";
import FAQSection from "./faqSection.jsx";

function HaveAQuestion() {
    return (
        <div className="boader">
            <div>
                <h3 className="text-3xl whitespace-nowrap lg:text-[50px] max-w-xl font-semibold tracking-wide mb-4">Have a
                    Question?</h3>
                <p className="text-xs text-gray-500">
                    Have a question about our platform or services? We got you covered. Browse our FAQs to find the<br/>
                    information you need, or get in touch with us for personalized support.
                </p>
            </div>
            <FAQSection/>
        </div>
    );
}

export default HaveAQuestion;
