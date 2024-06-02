import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { useChatContext } from "stream-chat-react";
import {
  AllSearchResultsPreview,
  SearchResultsPreview,
} from "./search/search-preview";
import { CiSearch } from "react-icons/ci";
import useProviderContext from "../profile-screens/hooks/useProvideContext";

export const CustomSearch = () => {
  const { client } = useChatContext();
  const [query, setQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [allResults, setAllResults] = useState(null);
  const [channelsResults, setChannelsResults] = useState(null);
  const [usersResults, setUsersResults] = useState(null);
  const [messagesResults, setMessagesResults] = useState(null);
  const [pending, setPending] = useState(false);
  const { setIsSearching } = useProviderContext();

 

  useEffect(() => {
    const childrenElement = document.querySelector("#children");
    const chatDisplay = document.querySelector("#chatDisplay");
    if (childrenElement) {
      if (query !== "") {
        childrenElement.classList.add("open");
      } else {
        childrenElement.classList.remove("open");
      }
    }

    if (chatDisplay) {
      if (query !== "") {
        chatDisplay.classList.remove("open");
      } else {
        chatDisplay.classList.add("open");
      }
    }
  }, [query]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      const channels = await client.queryChannels(
        {
          type: "team",
          name: { $autocomplete: query },
          members: { $in: [client.user?.id] },
          //   from the api we will get we will use to filter this later
          //   last_message_at: new Date(), // Assuming we want channels sorted by last message date
          //   updated_at: new Date(), // Assuming we want channels sorted by update date
        },
        { limit: 5 }
      );

      setChannelsResults({ entity: "channel", items: channels });

   const excludeNames = [
     "Billpoint Dev",
     "Deep Foxf",
     "Francis John",
     "Deepp Fox",
     "Reall John",
   ];

   const { users } = await client.queryUsers(
     {
       $and: [
         {
           $or: [
             { id: { $autocomplete: query } },
             { name: { $autocomplete: query } },
           ],
         },
         { role: "staff" }, 
         { id: { $ne: client.userID } }, 
       ],
     },
     {}, // No sorting options here
     { limit: 5 }
   );

   const filteredUsers = users.filter(
     (user) => !excludeNames.includes(user.name)
   );

   const sortedUsers = filteredUsers.sort((a, b) =>
     a.name.localeCompare(b.name)
   );

   setUsersResults({ entity: "user", items: sortedUsers });


      const { results } = await client.search(
        { type: "messaging", members: { $in: [client.userID] } },
        query,
        { limit: 5 }
      );

      setMessagesResults({
        entity: "message",
        items: results.map((item) => item.message),
      });

      setIsSearching(false);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    if ((channelsResults, usersResults, messagesResults)) {
      setAllResults({
        channels: channelsResults.items,
        users: usersResults?.items,
        messages: messagesResults?.items,
      });
    }
  }, [channelsResults, usersResults, messagesResults]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="search mt-8 relative h-full  px-2 ">
      <div className="border flex rounded-full items-center px-2.5">
        <CiSearch />
        <input
          type="search"
          className="w-full border-0 bg-transparent h-full outline-none text-[#757575]  text-sm py-3 px-2.5"
          value={query}
          placeholder="Search conversations"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSearch(event);
            }
          }}
        />
      </div>
      {query && (
        <>
          <div className="flex mt-2 mb-5 gap-2">
            <button
              type="button"
              className={`flex-1   outline-none   h-7 rounded-full text-xs cursor-pointer  ${
                selectedTab === "all"
                  ? "bg-primary text-white"
                  : "border border-primarylight "
              }`}
              onClick={() => handleTabClick("all")}
            >
              All
            </button>
            <button
              type="button"
              className={`flex-1  border outline-none  border-primarylight h-7 rounded-full text-xs cursor-pointer ${
                selectedTab === "channels"
                  ? "bg-primary text-white"
                  : "border border-primarylight "
              }`}
              onClick={() => handleTabClick("channels")}
            >
              Channels
            </button>
            <button
              type="button"
              className={`flex-1  border outline-none  border-primarylight h-7 rounded-full text-xs cursor-pointer ${
                selectedTab === "users"
                  ? "bg-primary text-white"
                  : "border border-primarylight "
              }`}
              onClick={() => handleTabClick("users")}
            >
              Users
            </button>
            <button
              type="button"
              className={`flex-1  border outline-none  border-primarylight h-7 rounded-full text-xs cursor-pointer ${
                selectedTab === "messages"
                  ? "bg-primary text-white"
                  : "border border-primarylight "
              }`}
              onClick={() => handleTabClick("messages")}
            >
              Messages
            </button>
          </div>
          <div id="chatDisplay">
            {pending && <>Searching...</>}
            {selectedTab === "all" && allResults && (
              <AllSearchResultsPreview results={allResults} />
            )}
            {selectedTab === "channels" && channelsResults && (
              <SearchResultsPreview results={channelsResults} />
            )}
            {selectedTab === "users" && usersResults && (
              <SearchResultsPreview results={usersResults} />
            )}
            {selectedTab === "messages" && messagesResults && (
              <SearchResultsPreview results={messagesResults} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
