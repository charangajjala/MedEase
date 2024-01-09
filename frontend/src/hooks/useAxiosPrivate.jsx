import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    console.log("Setting up interceptors");

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log("Intercepting request", config);
        if (!config.headers["Authorization"]) {
          console.log("Adding Authorization header");
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        console.log("Received response", response);
        return response;
      },
      async (error) => {
        console.error("Response error:", error);
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          console.log("Attempting token refresh");
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          console.log("Retrying request with new token", prevRequest);
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      console.log("Ejecting interceptors");
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
