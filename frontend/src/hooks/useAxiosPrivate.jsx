import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  useEffect(() => {
    // Response interceptor to handle token refresh
    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response, // Pass through successful responses
      async (error) => {
        const prevRequest = error?.config;
        // Check for token expiration indicator (e.g., 403 status)
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await refresh(); // Attempt to refresh the token
          return axiosPrivate(prevRequest); // Retry the original request
        }
        return Promise.reject(error); // For other errors, reject the promise
      }
    );

    return () => {
      // Eject the interceptor when the component using this hook unmounts
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
