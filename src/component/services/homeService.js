import API from "../../api/apiAll";

// lấy dữ liệu cho biểu đồ tròn
function getDataPieChart(thisObj, fromDateValue, toDateValue) {
  let userAccessToken = localStorage.getItem("userAccessToken");
  fetch(
    API.ROOT_URL +
      API.CHARTS_PATHNAME +
      API.CHARTS_PATHSEARCH_TYPE +
      `&fromDate=${fromDateValue}&toDate=${toDateValue}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(userAccessToken)}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET"
    }
  )
    .then(response => response.json())
    .then(result =>
      thisObj.setState({
        totalRevenueWEB: result.yAxis.WEB.reduce((x, y) => x + y),
        totalRevenueAPK: result.yAxis.APK.reduce((x, y) => x + y),
        totalRevenue: result.yAxis.TOTAL.reduce((x, y) => x + y)
      })
    )
    .catch(function(error) {
      console.log("Request failed", error);
    });
  console.log("out");
}
// lấy dữ liệu cho biểu đồ cot
function getDataLineChart(thisObj, fromDateValue, toDateValue) {
  let userAccessToken = localStorage.getItem("userAccessToken");
  fetch(
    API.ROOT_URL +
      API.CHARTS_PATHNAME +
      API.CHARTS_PATHSEARCH_TYPE +
      `&fromDate=${fromDateValue}&toDate=${toDateValue}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(userAccessToken)}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET"
    }
  )
    .then(response => response.json())
    .then(result =>
      thisObj.setState({
        vndChartxAxis: result.xAxis,
        vndChartyAxisTotal: result.yAxis.TOTAL
      })
    )
    .catch(function(error) {
      console.log("Request failed", error);
    });
  thisObj.hideModalPicker();
}

export { getDataPieChart, getDataLineChart };
