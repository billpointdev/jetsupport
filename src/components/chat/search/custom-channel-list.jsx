import Proptypes from "prop-types";
import { getInitials } from "../../../utils";
export const CustomChannelList = ({ loadedChannels, children, loading }) => {
  if (loading) {
    const items = Array.from({ length: 10 }, (_, index) => (
      <div
        key={index}
        style={{ margin: "", display: "flex", gap: "5px" }}
        className={`items-center mt-4 mx-1 px-2 rounded-md py-2 overflow-y-auto bg-[#fff] cursor-pointer`}
      >
        <div
          className={`w-10 h-10 rounded-full bg-gray-300 animate-pulse overflow-hidden border flex items-center justify-center`}
        >
          {getInitials("Unnamed Channel")}
        </div>
        <div style={{ flex: 1 }}>
          <div className="flex justify-between">
            <p className="w-44 shimmer h-3 rounded-full"></p>
            <time className="text-[#858688] text-sm w-14 shimmer h-3 rounded-full"></time>
          </div>
          <div
            className="text-[#616161] text-sm w-36 h-3 mt-0.5 rounded-full shimmer"
            style={{ fontSize: "14px" }}
          ></div>
        </div>
      </div>
    ));

    return <div>{items}</div>;
  }

  // return <div className="channel-list__placeholder">⏳ Loading...</div>;

  // if (error) {
  //   return (
  //     <div className="channel-list__placeholder">
  //       💣 Error loading channels
  //       <br />
  //       <button
  //         className="outline-none border border-[#00000014] background-[#fafafa] rounded-[4px] m-[8px] p-[8px] cursor-pointer focus:border-[#005fff] "
  //         onClick={() => window.location.reload()}
  //       >
  //         Reload page
  //       </button>
  //     </div>
  //   );
  // }

  if (loadedChannels?.length === 0) {
    return (
      <div className="py-[120px] px-5 text-center">
        🤷 You have no channels... yet
      </div>
    );
  }

  return (
    <div className="h-full  pb-24" id="children">
      {loadedChannels && (
        <div style={{ margin: " 0 10px 8px" }} className="text-[#858688] ">
          <p className="text-sm text-[#616161] mt-5 ml-1">Conversations</p>
          {/* <p>{loadedChannels.length} channels:</p> */}
        </div>
      )}
      <div className="h-full ">{children}</div>
    </div>
  );
};

CustomChannelList.propTypes = {
  loadedChannels: Proptypes.array,
  children: Proptypes.node,
  loading: Proptypes.bool,
};
