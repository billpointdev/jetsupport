import React from "react";
import JetSupportLogo from "../../../utils/JetSupportLogo.jsx";
import {useNavigate} from "react-router-dom";

function Navbar() {

    const navigate = useNavigate()

    return (

        <div className="">
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
                    <a href="#" className="text-gray-500 py-2 px-4 hover:text-gray-900">
                        Why JetSupport
                    </a>
                    <a href="#" className="text-gray-500 py-2 px-4 hover:text-gray-900">
                        FAQs
                    </a>
                    <a href="#" className="text-gray-500 py-2 px-4 hover:text-gray-900">
                        Contact Us
                    </a>
                </div>
                {/* Download Buttons */}
                <div className="flex space-x-4">
                    <div
                        className="cursor-pointer border border-gray-300 text-orange-500 py-2 px-4 hover:bg-orange-600 rounded-md flex hover:text-white items-center"
                        onClick={() => navigate("/login")}>
                        <p className="font-bold">Login</p>
                    </div>
                    <div className="border border-gray-300 text-orange-500 py-2 px-4 hover:bg-orange-600 hover:text-white rounded-md flex items-center"
                         onClick={() => navigate("/signup")}>
                        <p className="font-bold">Sign Up</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Navbar;
