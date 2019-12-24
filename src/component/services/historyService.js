import API from "../../api/apiAll";
import errorAlert from "../../utils/errorAlert";

// get data for table
function getData(thisObj, pathSearch) {
  let resStatus = 0;
  let accessToken = localStorage.getItem("userAccessToken");
  fetch(API.ROOT_URL + API.HISTORY_PATHNAME + pathSearch, {
    headers: {
      Authorization: `Bearer ${JSON.parse(accessToken)}`,
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

export { getData };
