import API from "../../api/apiAll";
import getToken from "../../utils/refreshToken";

// doi mat khau
function changePassword(thisObj, oldPassword, newPassword) {
  const oldAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
  const currentTime = new Date().getTime();
  if (currentTime - oldAccessToken.timestamp > 55000) {
    let checkToken = getToken(thisObj);
    if (checkToken !== false) {
      checkToken.then(newAccessToken => {
        changePasswordWithCondition(newAccessToken, oldPassword, newPassword);
      });
    }
  } else {
    const newAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
    const res=changePasswordWithCondition(newAccessToken, oldPassword, newPassword);
    return res;
  }
}
function changePasswordWithCondition(accessToken, oldPassword, newPassword) {
  const res=fetch(API.ROOT_URL + API.CHANGEPASSWORD_PATHNAME, {
    headers: {
      Authorization: `Bearer ${accessToken.accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    body: `oldPassword=${oldPassword}&newPassword=${newPassword}`
  })
    .then(response => response.json())
    .then(result => result)
    .catch(function(error) {
      console.log("Request failed", error);
    });
    return res;
}
export default changePassword;
