import  { useState } from "react";
import Proptypes from "prop-types"
// import { FaPlus, FaTimes } from "react-icons/fa";

const AccordionItem = ({ title, content }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleAccordion = () => {
//     setIsOpen(!isOpen);
//   };

  return (
    // <div>
    //     <div
    //         onClick={toggleAccordion}
    //         className="flex justify-between items-center cursor-pointer py-2"
    //     >
    //         <h3 className="text-lg font-bold">{title}</h3>
    //         <div className="text-xl">
    //             {isOpen ? <FaTimes /> : <FaPlus />}
    //         </div>
    //     </div>
    //     {isOpen && <p className="text-xs text-gray-500 mt-2">{content}</p>}
    //     <hr className="my-3" />
    // </div>
    <div className="space-y-4 ">
      <details
        className="group border-b  lg:px-6 py-2 [&_summary::-webkit-details-marker]:hidden"
        open
      >
        <summary className="flex cursor-pointer items-center justify-between gap-1.5">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>

          <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>

        <p className="mt-4 leading-relaxed text-gray-700">{content}</p>
      </details>
    </div>
  );
};


AccordionItem.propTypes = {
    title: Proptypes.string.isRequired,
    content: Proptypes.string.isRequired,
}

function FAQSection() {
  const [activeSection, setActiveSection] = useState("General");

  const sections = [
    { name: "General", label: "General" },
    // { name: "Transactions", label: "Transactions" },
    // { name: "Payments", label: "Payments" },
    // { name: "Returns", label: "Returns" },
    // { name: "Careers", label: "Careers" },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-between my-10">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 space-y-2">
        {sections.map((section) => (
          <button
            key={section.name}
            className={`w-full text-left p-4 rounded ${
              activeSection === section.name
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-500"
            }`}
            onClick={() => setActiveSection(section.name)}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 px-4">
        {activeSection === "General" && (
          <div>
            <AccordionItem
              title="How do I get started with JetSupport?"
              content="To get started with JetSupport, simply download the app, create an account, link your bank account, and start trading your favorite cryptocurrencies and gift cards."
            />
            <AccordionItem
              title="How secure is JetSupport?"
              content="JetSupport uses industry-standard security measures to ensure the safety of your funds and personal information."
            />
            <AccordionItem
              title="What types of cryptocurrencies can I trade on JetSupport?"
              content="You can trade a variety of cryptocurrencies including Bitcoin, Ethereum, Litecoin, and more."
            />
            <AccordionItem
              title="What types of gift cards can I trade on JetSupport?"
              content="You can trade popular gift cards such as Amazon, iTunes, Google Play, and more."
            />
            <AccordionItem
              title="How long does it take to process a transaction on JetSupport?"
              content="Most transactions are processed within a few minutes. However, it may take longer depending on network congestion."
            />
            <AccordionItem
              title="What if I have issues with my JetSupport account or transactions?"
              content="If you encounter any issues, please contact our support team for assistance."
            />
          </div>
        )}
        {activeSection === "Transactions" && (
          <div>
            <h3 className="text-lg font-bold">Transaction Related FAQ</h3>
            {/* Add content for transactions section */}
          </div>
        )}
        {activeSection === "Payments" && (
          <div>
            <h3 className="text-lg font-bold">Payments Related FAQ</h3>
            {/* Add content for payments section */}
          </div>
        )}
        {activeSection === "Returns" && (
          <div>
            <h3 className="text-lg font-bold">Returns Related FAQ</h3>
            {/* Add content for returns section */}
          </div>
        )}
        {activeSection === "Careers" && (
          <div>
            <h3 className="text-lg font-bold">Careers Related FAQ</h3>
            {/* Add content for careers section */}
          </div>
        )}
      </div>
    </div>
  );
}

export default FAQSection;
