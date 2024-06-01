import React, { useState } from "react";

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
        <div className="flex border my-10">
            {/* Sidebar */}
            <div className="w-1/4 space-y-2">
                {sections.map((section) => (
                    <button
                        key={section.name}
                        className={`w-full text-left p-4 rounded ${
                            activeSection === section.name
                                ? "bg-orange-500 text-white"
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
                        <h3 className="text-lg font-bold">How do I get started with JetSupport?</h3>
                        <p className="text-xs text-gray-500 mt-2">
                            To get started with JetSupport, simply download the app, create an account, link your bank account, and start trading your favorite cryptocurrencies and gift cards.
                        </p>
                        <hr className="my-3" />
                        <h3 className="text-lg font-bold">How secure is JetSupport?</h3>
                        <hr className="my-3" />
                        <h3 className="text-lg font-bold">What types of cryptocurrencies can I trade on JetSupport?</h3>
                        <hr className="my-3" />
                        <h3 className="text-lg font-bold">What types of gift cards can I trade on JetSupport?</h3>
                        <hr className="my-3" />
                        <h3 className="text-lg font-bold">How long does it take to process a transaction on JetSupport?</h3>
                        <hr className="my-3" />
                        <h3 className="text-lg font-bold">What if I have issues with my JetSupport account or transactions?</h3>
                        <hr className="my-3" />
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
