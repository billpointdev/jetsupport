import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const AccordionItem = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div
                onClick={toggleAccordion}
                className="flex justify-between items-center cursor-pointer py-2"
            >
                <h3 className="text-lg font-bold">{title}</h3>
                <div className="text-xl">
                    {isOpen ? <FaTimes /> : <FaPlus />}
                </div>
            </div>
            {isOpen && <p className="text-xs text-gray-500 mt-2">{content}</p>}
            <hr className="my-3" />
        </div>
    );
};

function FAQSection() {
    const [activeSection, setActiveSection] = useState("General");

    const sections = [
        { name: "General", label: "General" },
        { name: "Transactions", label: "Transactions" },
        { name: "Payments", label: "Payments" },
        { name: "Returns", label: "Returns" },
        { name: "Careers", label: "Careers" },
    ];

    return (
        <div className="flex justify-between my-10">
            {/* Sidebar */}
            <div className="w-1/4 space-y-2">
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
            <div className="w-3/4 p-4">
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
