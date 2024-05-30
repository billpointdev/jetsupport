import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: false,
});

// Retrieve user token from localStorage
const userToken = localStorage.getItem("access_token");

// Set the Authorization header if the token is available
// if (userToken) {
  axiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${userToken}`;
// } else {
//   console.log( "No Access Token found" );
 
// }

// Request interceptor to attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log( "Session expired. Redirecting to login page..." );
       console.log("axcess token", userToken);
      // Handle the session expiry case
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
