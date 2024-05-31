import React from "react";
import JetSupportLogo from "../../../utils/JetSupportLogo.jsx";

function Navbar() {
    return (
        <div className="border-b">
            {/* Important announcement bar */}
            <div className="bg-orange-500 text-white text-sm py-2 px-4 flex border  justify-center">
        <span>
          <strong>Important —</strong> JetSupport App is being Launched on 01/06/2024.{" "}
            <a href="#" className="underline">
            Learn more →
          </a>
        </span>
                <button className="text-white pl-3">✕</button>
            </div>
            {/* Main Navbar */}
            <div className="flex justify-between items-center py-4 px-8">
                {/* Logo */}
                <div className="flex items-center">
                    <a href="https://jetpayng.co">
                        <JetSupportLogo/>
                    </a>
                </div>
                {/* Navigation Links */}
                <div className="flex space-x-8 pt-1">
                    <a
                        href="#"
                        className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
                    >
                        Home
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                        Why JetSupport
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                        FAQs
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                        Contact Us
                    </a>
                </div>
                {/* Download Buttons */}
                <div className="flex space-x-4">
                    <a
                        href="#"
                        className="border border-gray-300 text-orange-500 py-2 px-4 rounded-md flex items-center"
                    >
                        <div>
                            <p className="font-bold">Login</p>
                        </div>

                    </a>
                    <a
                        href="#"
                        className="border border-gray-300 text-orange-500 py-2 px-4 rounded-md flex items-center"
                    >
                        <div>
                            <p className="font-bold">Sign Up</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
