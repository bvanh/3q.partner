import API from "../../api/apiAll";
import getToken from "../../utils/refreshToken";

// doi mat khau
function changePassword(thisObj, oldPassword, newPassword) {
  const oldAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
  const currentTime = new Date().getTime();
  if (currentTime - oldAccessToken.timestamp > 3300000) {
    let checkToken = getToken(thisObj);
    if (checkToken !== false) {
      checkToken.then(newAccessToken => {
        changePasswordWithCondition(
          thisObj,
          newAccessToken,
          oldPassword,
          newPassword
        );
      });
    }
  } else {
    const newAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
    const res = changePasswordWithCondition(
      thisObj,
      newAccessToken,
      oldPassword,
      newPassword
    );
    return res;
  }
}
function changePasswordWithCondition(
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
          statusSuccess:'mes_success'
        });
      }
      return response.json();
    })
    .then(result => {
      if(result.status===1001){
        thisObj.setState({
          message: 'Your old password incorrect, try again!',
          statusSuccess:'submit-mes'
        });
      }else{
      thisObj.setState({
        message: result.message,
        statusSuccess:'submit-mes'
      });
    }
    })
    .catch(function(error) {
      console.log("Request failed", error);
    });
}
export default changePassword;
