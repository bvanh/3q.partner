import fetch from "isomorphic-unfetch";
import API from "../../api/apiAll";

const getToken = (thisObj, userToken, isSaveLogin) => {
  if (userToken === null) {
    return false;
  } else
    fetch(API.ROOT_URL + API.REFRESHTOKEN_PATHNAME, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      body: `refreshToken=${JSON.parse(userToken).refreshToken}`
    })
      .then(response => response.json())
      .then(result => {
        if (isSaveLogin) {
          localStorage.setItem(
            "userAccessToken",
            JSON.stringify(result.accessToken)
          );
        } else {
          thisObj.setState({
            accessToken: JSON.stringify(result.accessToken)
          });
        }
      })
      .catch(function(error) {
        console.log("Request failed", error);
      });
};
export default getToken;
