import API from "../api/api";
import axios from "axios";
import { localStorageService, valService } from "../utils/localStorageService";
const { getLocalInfo, setToken } = localStorageService;
const { accessTokenPartner, tokenPartner } = valService;

const refreshToken = axios.create({
  baseURL: API.ROOT_URL,
});
const baseGetData = axios.create({
  baseURL: API.ROOT_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
baseGetData.interceptors.request.use(
  (config) => {
    const accessToken = getLocalInfo(accessTokenPartner);
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
      return config;
    }
  },
  (error) => error
);
baseGetData.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originRequest = error.response.config;
    const token = getLocalInfo(tokenPartner);
    if (error.response.status === 401) {
      return refreshToken
        .post(API.REFRESHTOKEN_PATHNAME, {
          refreshToken: token.token.refreshToken,
        })
        .then((response) => {
          const { accessToken } = response.data;
          setToken(null, accessToken);
          originRequest.headers["Authorization"] = "Bearer " + accessToken;
          return axios(originRequest);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    } else {
      console.log(error.response);
      return Promise.reject(error.response);
    }
  }
);
export { baseGetData };
