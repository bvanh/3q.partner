import { localStorageService, valService } from "./localStorageService";
const { accessTokenPartner, tokenPartner } = valService;
const { getLocalInfo } = localStorageService;
function checkToken(thisObj) {
  const token = getLocalInfo(tokenPartner);
  const accessToken = getLocalInfo(accessTokenPartner);
  const currentTime = new Date().getTime();
  const checkExpriedToken = currentTime - token?.timestamp > 75168000000;
  if (token === null || accessToken === null || checkExpriedToken) {
    thisObj.props.logInOut(false);
    return false;
  } else {
    return true;
  }
}
export default checkToken;
