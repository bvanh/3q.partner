import API from "../../api/apiAll";


// doi mat khau
function changePassword(thisObj, oldPassword, newPassword) {
  const getAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
  fetch(API.ROOT_URL + API.CHANGEPASSWORD_PATHNAME, {
    headers: {
      Authorization: `Bearer ${getAccessToken.accessToken}`,
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
