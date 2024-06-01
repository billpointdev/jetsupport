import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { MdOutlineErrorOutline } from "react-icons/md";

const ErrorBot = ({ error }) => {
  return (
    <motion.div
      transition={{ duration: 1, ease: "easeOut" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileInView={{ y: [0, -10, 10, 0] }}
      className="fixed bottom-3 flex flex-col items-start leading-4 justify-center p-3 left-1 lg:left-3 text-white text-md font-[501] bg-red-600 rounded-md  max-w-md min-h-[90px]"
    >
      <p className="text-lg font-[501] flex items-center gap-2">
        <MdOutlineErrorOutline />
        Error
      </p>
      <p className="text-md">Hey there! 👋 </p>
      <p className="text-sm text-start leading-4 mb-2 mt-1">{error}</p>
    </motion.div>
  );
};

ErrorBot.propTypes = {
  error: PropTypes.string,
};
export default ErrorBot;
