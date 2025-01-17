import API from "../../api/api";
import {
  localStorageService,
  valService,
} from "../../utils/localStorageService";
const { isSave } = valService;
const { saveInfo, setToken } = localStorageService;
// login
function saveTokenToLocal(thisObj, username, password, isRemember) {
  let resStatus = 0;
  fetch(API.ROOT_URL + API.LOGIN_PATHNAME, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: `partnerName=${username}&password=${password}`,
  })
    .then((response) => {
      resStatus = response.status;
      return response.json();
    })
    .then((result) => {
      if (resStatus !== 200) {
        thisObj.setState({
          validateStatus: "error",
          message: "Please doulbe check your information.",
        });
      } else {
        let userToken = { token: result, timestamp: new Date().getTime() };
        let userAccessToken = {
          accessToken: result.accessToken,
          timestamp: new Date().getTime(),
        };
        setToken(userToken, userAccessToken);
        saveInfo(isSave, isRemember);
        thisObj.props.logInOut(true);
        return result;
      }
    })
    // get logo and fullname
    .then((value) => {
      fetch(API.ROOT_URL + API.PARTNER_INFO, {
        headers: {
          Authorization: `Bearer ${value.accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "GET",
      })
        .then((response) => {
          resStatus = response.status;
          return response.json();
        })
        .then((result) => {
          if (resStatus === 200) {
            saveInfo("imageLogo", result.imageUrl);
            saveInfo("fullname", result.fullName);
            thisObj.props.getImgAndName(result);
            // console.log(result);
          }
        })
        .catch(function (error) {
          console.log("Request failed", error);
        });
    })
    .catch((error) => {
      console.log("Request failed", error);
    });
}
export { saveTokenToLocal };
