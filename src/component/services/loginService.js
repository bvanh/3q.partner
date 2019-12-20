import API from "../../api/apiAll";
import { Modal } from "antd";

// lưu userToken vào local (lưu đăng nhập)
function saveTokenToLocal(thisObj, value, resStatus) {
  const errorAlert = (errorStatus, errorMessage) => {
    Modal.error({
      title: "SOMETHING WENT WRONG",
      content: `${errorStatus}: ${errorMessage}`
    });
  };
  fetch(API.ROOT_URL + API.LOGIN_PATHNAME, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    body: `partnerName=${value.username}&password=${value.password}`
  })
    .then(response => {
      resStatus = response.status;
      return response.json();
    })
    .then(result => {
      if (resStatus !== 200) {
        errorAlert(result.status, result.message);
        return;
      } else {
        localStorage.setItem("userToken", JSON.stringify(result));
        localStorage.setItem(
          "userAccessToken",
          JSON.stringify(result.accessToken)
        );
        thisObj.props.logInOut(true);
        return result;
      }
    })
    // get logo and fullname
    .then(value => {
      fetch(API.ROOT_URL + API.PARTNER_INFO, {
        headers: {
          Authorization: `Bearer ${value.accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET"
      })
        .then(response => {
          resStatus = response.status;
          return response.json();
        })
        .then(result => {
          if (resStatus === 200) {
            localStorage.setItem("imageLogo", result.imageUrl);
            localStorage.setItem("fullname", result.fullName);
            thisObj.props.getImgAndName(result);
          }
        })
        .catch(function(error) {
          console.log("Request failed", error);
        });
    })
    .catch(error => {
      console.log("Request failed", error);
    });
}
//  lưu userToken vào state (không lưu đăng nhập )
function saveTokenToState(thisObj, value, resStatus) {
  const errorAlert = (errorStatus, errorMessage) => {
    Modal.error({
      title: "SOMETHING WENT WRONG",
      content: `${errorStatus}: ${errorMessage}`
    });
  };
  fetch(API.ROOT_URL + API.LOGIN_PATHNAME, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    body: `partnerName=${value.username}&password=${value.password}`
  })
    .then(response => {
      resStatus = response.status;
      return response.json();
    })
    .then(result => {
      if (resStatus !== 200) errorAlert(result.status, result.message);
      else {
        thisObj.props.getTokenToState(result);
        thisObj.props.logInOut(true);
      }
      return result;
    })
    // get logo and fullname
    .then(value => {
      fetch(API.ROOT_URL + API.PARTNER_INFO, {
        headers: {
          Authorization: `Bearer ${value.accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET"
      })
        .then(response => {
          resStatus = response.status;
          return response.json();
        })
        .then(value => {
          if (resStatus === 200) {
            localStorage.setItem("imageLogo", value.imageUrl);
            localStorage.setItem("fullname", value.fullName);
            thisObj.props.getImgAndName(value);
          }
        })
        .catch(function(error) {
          console.log("Request failed", error);
        });
    })
    .catch(error => {
      errorAlert("Request failed", error);
    });
}
export { saveTokenToLocal, saveTokenToState };
