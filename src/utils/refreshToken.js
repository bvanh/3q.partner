import fetch from "isomorphic-unfetch";
import API from "../api/apiAll";

const getToken = thisObj => {
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const currentTime = new Date().getTime();
  if (userToken === null || currentTime - userToken.timestamp > 175000) {
    thisObj.props.logInOut(false);
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
