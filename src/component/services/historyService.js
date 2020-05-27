import API from "../../api/apiAll";
import errorAlert from "../../utils/errorAlert";
import getToken from "../../utils/refreshToken";
import checkToken from "../../utils/checkToken";

// get data for table
function getData(thisObj, pathSearch) {
  if (checkToken(thisObj)) {
    let checkToken = getToken(thisObj);
    if (checkToken !== false) {
      checkToken.then(newAccessToken => {
        getDataAfterSetCondition(thisObj, newAccessToken, pathSearch);
      });
    }
  } else if (checkToken(thisObj) === false) {
    const newAccessToken = JSON.parse(localStorage.getItem("accessTokenPartner"));
    getDataAfterSetCondition(thisObj, newAccessToken, pathSearch);
  }
}
function getDataAll(thisObj, pathSearch) {
  if (checkToken(thisObj)) {
    let checkToken = getToken(thisObj);
    if (checkToken !== false) {
      checkToken.then(newAccessToken => {
        getDataAllAfterSetCondition(thisObj, newAccessToken, pathSearch);
      });
    }
  } else if (checkToken(thisObj) === false) {
    const newAccessToken = JSON.parse(localStorage.getItem("accessTokenPartner"));
    getDataAllAfterSetCondition(thisObj, newAccessToken, pathSearch);
  }
}
export { getData, getDataAll };
// 
function getDataAfterSetCondition(thisObj, token, pathSearch) {
  let resStatus = 0;
  thisObj.setState({ ...thisObj.state, loading: true })
  fetch(API.ROOT_URL + API.HISTORY_PATHNAME + pathSearch, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "GET"
  })
    .then(response => {
      // console.log(response)
      resStatus = response.status;
      return response.json();
    })
    .then(result => {
      if (resStatus !== 200) {
        errorAlert(result.status, result.message);
        return;
      } else {
        thisObj.setState({
          // dataExport:[],
          data: result.rows,
          totalItem: result.count,
          loading: false
        });
      }
    })
    .catch(function (error) {
      console.log("Request failed", error);
    });
}
function getDataAllAfterSetCondition(thisObj, token, pathSearch) {
  let resStatus = 0;
  fetch(API.ROOT_URL + API.HISTORY_PATHNAME + pathSearch, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "GET"
  })
    .then(response => {
      console.log(response)
      resStatus = response.status;
      return response.json();
    })
    .then(result => {
      if (resStatus !== 200) {
        errorAlert(result.status, result.message);
        return;
      } else {
        console.log(result)
        thisObj.setState({
          dataExportAll: result.rows,
        });
        return result.rows;
      }
    })
    .catch(function (error) {
      console.log("Request failed", error);
    });
}