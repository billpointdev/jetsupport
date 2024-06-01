import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import PropTypes from "prop-types";
import React from "react";

const Layout = ({ children }) => {
  return (
      <>
          <div className="bg-orange-500 text-white text-sm py-2 px-4 flex border justify-center">
                <span>
                  <strong>Important —</strong> JetSupport Launches on 01/06/2024. {" "}
                    <a href="#" className="underline">
                    Learn more →
                  </a>
                </span>
          </div>
          <div className="container mx-auto px-4">
              <section className="flex relative flex-col justify-between max-w-[1280px]">
                  <Navbar/>
                  <div className="py-8 mt-20">
                      <div className="bg-[white] rounded-[9px]">{children}</div>
                  </div>
                  <Footer/>
              </section>
          </div>
      </>
  );
};
// introduced this cause of my eslint
Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
