function checkToken(thisObj) {
  const oldAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
  const currentTime = new Date().getTime();
  if (oldAccessToken === null) {
    thisObj.props.logInOut(false);   
  } else if (currentTime - oldAccessToken.timestamp > 3300000) {
    return true;
  } else {
    return false;
  }
}
export default checkToken;