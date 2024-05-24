// import { useEffect } from "react";
// // import { Streami18n } from "stream-chat";
// import connectionerrorimg from "../../../assets/connecterror.png"
// import { useChatContext } from "stream-chat-react";


// const ConnectionError = () =>
// {
//     return (
//         <div>
//             <img src={connectionerrorimg} alt="connection-error" />
//         </div>
//     )
// }

// const ConnectionFailed = () => {
//   const { client } = useChatContext();
//   console.log("connection", !client.wsConnection.isHealthy);

// //   useEffect(() => {
//     if (
//       client.wsConnection.isConnecting ||
//       client.wsConnection.isDisconnected ||
//       !client.wsConnection.isHealthy
//     ) {
//       return (
//         <div className=" bg-[#000] w-full h-full flex-1  ">
//           <ConnectionError/>
//         </div>
//       );
//     }
// //   }, [client.wsConnection.isConnecting, client.wsConnection.isDisconnected, client.wsConnection.isHealthy]);
//   //   useEffect(() => {
//   //     const i18nInstance = new Streami18n({
//   //       language: "en",
//   //       translationsForLanguage: {
//   //         "Connection failure, reconnecting now...":
//   //           "Alert, connection issue happening",
//   //       },
//   //     });

//   //     // Set up event listener for connection changes
//   //     client.on("connection.changed", (event) => {
//   //       if (event.online === false) {
//   //         // Connection failure
//   //         console.log("Connection failure, reconnecting now...");
//   //         // Do whatever you need to do when connection fails, such as showing an alert
//   //       }
//   //     });
//   //   }, []);

//   return <div>{/* Your component JSX */}</div>;
// };

// export default ConnectionFailed;
