import API from "../../api/apiAll";
import getToken from "../../utils/refreshToken";
import checkToken from "../../utils/checkToken";

// doi mat khau
function changePassword(thisObj, oldPassword, newPassword) {
  if (checkToken(thisObj)) {
    let checkToken = getToken(thisObj);
    if (checkToken !== false) {
      checkToken.then(newAccessToken => {
        changePasswordAfterSetCondition(
          thisObj,
          newAccessToken,
          oldPassword,
          newPassword
        );
      });
    }
  } else if (checkToken(thisObj) === false) {
    const newAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
    const res = changePasswordAfterSetCondition(
      thisObj,
      newAccessToken,
      oldPassword,
      newPassword
    );
    return res;
  }
}
function changePasswordAfterSetCondition(
  thisObj,
  accessToken,
  oldPassword,
  newPassword
) {
  let resStatus = 0;
  fetch(API.ROOT_URL + API.CHANGEPASSWORD_PATHNAME, {
    headers: {
      Authorization: `Bearer ${accessToken.accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    body: `oldPassword=${oldPassword}&newPassword=${newPassword}`
  })
    .then(response => {
      if (response.status === 200) {
        thisObj.setState({
          message: "Password updated successful !",
          statusSuccess: "mes_success"
        });
      }
      return response.json();
    })
    .then(result => {
      if (result.status === 1001) {
        thisObj.setState({
          message: "Your old password incorrect, try again!",
          statusSuccess: "submit-mes"
        });
      } else {
        thisObj.setState({
          message: result.message,
          statusSuccess: "submit-mes"
        });
      }
    })
    .catch(function(error) {
      console.log("Request failed", error);
    });
}
export default changePassword;
