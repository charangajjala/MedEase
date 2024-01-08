// import axios from "axios";
// import useAuth from "./useAuth";

// const REFRESH_URL = "http://localhost:3001/refresh";

// const useRefreshToken = () => {
//   const { setAuth } = useAuth();
//   const refresh = async () => {
//     const response = await axios.get(REFRESH_URL, {
//       withCredentials: true,
//     });

//     setAuth((prev) => {
//       console.log(JSON.stringify(prev));
//       console.log(JSON.stringify(response?.data?.accessToken));
//       return {
//         ...prev,
//         accessToken: response?.data?.accessToken,
//       };
//     });
//     return response.data.accessToken;
//   };
//   return refresh;
// };

// export default useRefreshToken;

import axios from "axios";

const REFRESH_URL = "http://localhost:3001/refresh";

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      // Make a request to the refresh endpoint.
      // The server should handle the creation of a new access token
      // and set it in an HTTP-only cookie.
      const response = await axios.get(REFRESH_URL, {
        withCredentials: true,
      });

      // Handle any additional tasks based on the server response
      // Note: The actual access token is not directly handled here,
      // as it's set as an HTTP-only cookie by the server.
      console.log("Token refreshed:", response?.data?.message);

      return response.data; // Return the response data for any further processing
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  };

  return refresh;
};

export default useRefreshToken;

