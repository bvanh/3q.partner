import API from "../../api/apiAll";

// get data for table
function getData(thisObj, pathSearch) {
  let accessToken = localStorage.getItem("userAccessToken");
  fetch(API.ROOT_URL + API.HISTORY_PATHNAME + pathSearch, {
    headers: {
      Authorization: `Bearer ${JSON.parse(accessToken)}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "GET"
  })
    .then(response => response.json())
    .then(result =>
      thisObj.setState({
        data: result.rows,
        dataExport: result.rows,
        totalItem: result.count
      })
    )
    .catch(function(error) {
      console.log("Request failed", error);
    });
}

export { getData };
