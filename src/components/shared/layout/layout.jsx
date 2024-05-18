import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <section className="flex relative flex-col justify-between">
        <Navbar />
        <div className=" p-8 mt-20">
          <div className="bg-[white] p-16 rounded-[9px]">{children}</div>
        </div>
        <Footer />
      </section>
    </>
  );
};
// introduced this cause of my eslint
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
