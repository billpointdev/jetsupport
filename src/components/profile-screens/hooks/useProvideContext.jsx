import { useContext } from "react";
import { MyContext } from "./useContext";

const useProviderContext = () => {
  return useContext(MyContext);
};

export default useProviderContext;
