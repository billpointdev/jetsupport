import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";


const Layout = ({ children }) => {
  return (
    <>
      <section className='flex flex-col justify-between h-[90vh]'>
        <Navbar />
        <div className=" p-8 mt-20">
        <div className="bg-[white] p-16 rounded-[9px]">{children}</div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Layout;