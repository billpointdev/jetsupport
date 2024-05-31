import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
      <>
        <div className="container mx-auto px-4">
          <section className="flex relative flex-col justify-between max-w-[1280px]">
            <Navbar/>
            <div className="p-8 mt-20">
              <div className="bg-[white] p-16 rounded-[9px]">{children}</div>
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
