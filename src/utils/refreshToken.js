import fetch from "isomorphic-unfetch";
import API from "../api/apiAll";

const getToken = userToken => {
  const currentTime = new Date().getTime();
  if (userToken === null || currentTime - userToken.timestamp > 2588400000) {
    return false;
  } else {
    const db = fetch(API.ROOT_URL + API.REFRESHTOKEN_PATHNAME, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      body: `refreshToken=${userToken.token.refreshToken}`
    })
      .then(response => response.json())
      .then(result => {
        let userAccessToken = {
          accessToken: result.accessToken,
          timestamp: new Date().getTime()
        };
        localStorage.setItem(
          "userAccessToken",
          JSON.stringify(userAccessToken)
        );
        return result;
      })
      .catch(function(error) {
        console.log("Request failed", error);
      });
    return db;
  }
};
export default getToken;
