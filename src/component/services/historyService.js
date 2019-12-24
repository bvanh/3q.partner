import API from "../../api/apiAll";
import errorAlert from "../../utils/errorAlert";
import getToken from "../../utils/refreshToken";

// get data for table
function getDataWithCondition(thisObj, accessToken, pathSearch) {
  let resStatus = 0;
  fetch(API.ROOT_URL + API.HISTORY_PATHNAME + pathSearch, {
    headers: {
      Authorization: `Bearer ${JSON.stringify(accessToken)}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "GET"
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
        thisObj.setState({
          data: result.rows,
          dataExport: result.rows,
          totalItem: result.count
        });
      }
    })
    .catch(function(error) {
      console.log("Request failed", error);
    });
}
function getData(thisObj, userToken, pathSearch) {
  const oldAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
  const currentTime = new Date().getTime();
  if (currentTime - oldAccessToken.timestamp > 5000)
    getToken(userToken).then(newAccessToken => {
      getDataWithCondition(thisObj, newAccessToken, pathSearch);
    });
  else {
    const newAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
    getDataWithCondition(
      thisObj,
      newAccessToken,
      pathSearch
    );
  }
}

export { getData };
