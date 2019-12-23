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
        fromDate: fromDateValue,
        toDate: toDateValue,
        totalRevenueWEB: result.yAxis.WEB.reduce((x, y) => x + y),
        totalRevenueAPK: result.yAxis.APK.reduce((x, y) => x + y),
        totalRevenue: result.yAxis.TOTAL.reduce((x, y) => x + y)
      })
    )
    .catch(function(error) {
      console.log("Request failed", error);
    });
}
// lấy dữ liệu cho biểu đồ cột
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
        vndChartyAxisTotal: result.yAxis.TOTAL,
        vndChartyAxisWeb: result.yAxis.WEB,
        vndChartyAxisApk: result.yAxis.APK,
        fromDate:fromDateValue,
        toDate:toDateValue,
      })
    )
    .catch(function(error) {
      console.log("Request failed", error);
    });
  thisObj.hideModalPicker();
  getTotalPurchase(thisObj,fromDateValue,toDateValue)
}
// lấy tổng số lượng giao dịch
function getTotalPurchase(thisObj, fromDate, toDate) {
  let accessToken = localStorage.getItem("userAccessToken");
  fetch(
    API.ROOT_URL +
      API.HISTORY_PATHNAME +
      API.HISTORY_PATHSEARCH_NODATE +
      `&fromDate=${fromDate}&toDate=${toDate}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET"
    }
  )
    .then(response => response.json())
    .then(result =>
      thisObj.setState({
        totalPurchase: result.count
      })
    )
    .catch(function(error) {
      console.log("Request failed", error);
    });
}
export { getDataPieChart, getDataLineChart, getTotalPurchase };
