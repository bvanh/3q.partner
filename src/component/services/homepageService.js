// lấy dữ liệu cho biểu đồ tròn
import API from "../../api/apiAll";
const getPieData2 = (fromDateValue, toDateValue) => {
  // let d = null;
  let userAccessToken = localStorage.getItem("user");
  const data = fetch(
    API.ROOT_URL +
      API.CHARTS_PATHNAME +
      API.CHARTS_PATHSEARCH_TYPE +
      `&fromDate=${fromDateValue}&toDate=${toDateValue}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(userAccessToken).accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET"
    }
  )
    .then(response => response.json())
    .then(result => result)
    .catch(function(error) {
      console.log("Request failed", error);
    });
};
export default getPieData2;
