import Proptypes from "prop-types";
import { getInitials } from "../../../utils";
import emptyChannelImg from "../../../assets/image.gif";
import useProviderContext from "../../profile-screens/hooks/useProvideContext";
export const CustomChannelList = ( { loadedChannels, children, loading } ) =>
{
  const { setIsChannelsModalOpen} = useProviderContext()
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
 
  if (loadedChannels?.length == 0) {
    return (
      <div className="justify-center h-full mb-24 flex flex-col items-center px-5 text-center">
        <img
          src={emptyChannelImg}
          alt="no conversation"
          className="w-48 h-56"
        />
        <p className="text-xl font-semibold mt-1 mb-2">No messages, yet.</p>
        <p>No messages in your chat, yet! Start chatting with our admin.</p>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setIsChannelsModalOpen(true)}
            className={`block w-full rounded-[16px]  bg-primary px-6 py-4 font-medium text-white transform  hover:scale-95 transition-transform duration-300`}
          >
            Start new Chat{" "}
          </button>
        </div>
      </div>
    );
  }

    if (!children) {
      return null; 
    }

  return (
    <div className="h-full overflow-y-auto" id="children">
      {loadedChannels && (
        <div style={{ margin: " 0 10px 8px" }} className="text-[#858688]  mt-5">
          <p className="text-sm text-[#616161] mt-5 ml-1">Conversations</p>
        </div>
      )}
      <div className="h-fit ">{children}</div>
    </div>
  );
};

CustomChannelList.propTypes = {
  loadedChannels: Proptypes.array,
  children: Proptypes.node,
  loading: Proptypes.bool,
};
