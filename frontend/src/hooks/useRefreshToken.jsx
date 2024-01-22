import axios from "axios";
import useAuth from "./useAuth";
import endpoints from "../constants/endpoints";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get(endpoints.REFRESH_URL, {
      withCredentials: true,
    });

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(JSON.stringify(response?.data?.accessToken));
      return {
        ...prev,
        accessToken: response?.data?.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
