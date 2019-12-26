import API from "../../api/apiAll";
import errorAlert from "../../utils/errorAlert";
import moment from "moment";

// lấy dữ liệu cho biểu đồ tròn
function getDataPieChart(thisObj, fromDateValue, toDateValue) {
  const getAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
  let resStatus = 0;
  fetch(
    API.ROOT_URL +
      API.CHARTS_PATHNAME +
      API.CHARTS_PATHSEARCH_TYPE +
      `&fromDate=${fromDateValue}&toDate=${toDateValue}`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken.accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET"
    }
  )
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
          fromDate: fromDateValue,
          toDate: toDateValue,
          totalRevenueWEB: result.yAxis.WEB.reduce((x, y) => x + y),
          totalRevenueAPK: result.yAxis.APK.reduce((x, y) => x + y),
          totalRevenue: result.yAxis.TOTAL.reduce((x, y) => x + y)
        });
      }
    })
    .catch(function(error) {
      console.log("Request failed", error);
    });
    console.log(getAccessToken.timestamp)
}
// end
// get data linechart
function getDataLineChart(thisObj, fromDateValue, toDateValue) {
  const fromDayValue = moment(fromDateValue).valueOf();
  const toDayValue = moment(toDateValue).valueOf();
  if (toDayValue - fromDayValue <= 2592000000) {
    const getAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
    let resStatus = 0;
    fetch(
      API.ROOT_URL +
        API.CHARTS_PATHNAME +
        API.CHARTS_PATHSEARCH_TYPE +
        `&fromDate=${fromDateValue}&toDate=${toDateValue}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken.accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET"
      }
    )
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
            vndChartxAxis: result.xAxis,
            vndChartyAxisTotal: result.yAxis.TOTAL,
            vndChartyAxisWeb: result.yAxis.WEB,
            vndChartyAxisApk: result.yAxis.APK,
            fromDate: fromDateValue,
            toDate: toDateValue
          });
        }
      })
      .catch(function(error) {
        console.log("Request failed", error);
      });
    thisObj.hideModalPicker();
    getTotalPurchase(thisObj, fromDateValue, toDateValue, getAccessToken);
  } else {
    errorAlert(500, "Date less than or equal 30 days");
  }
}
// lấy tổng số lượng giao dịch
function getTotalPurchase(thisObj, fromDate, toDate, token) {
  let resStatus = 0;
  fetch(
    API.ROOT_URL +
      API.HISTORY_PATHNAME +
      API.HISTORY_PATHSEARCH_NODATE +
      `&fromDate=${fromDate}&toDate=${toDate}&userType=0`,
    {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET"
    }
  )
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
          totalPurchase: result.count,
          totalPaidUsers: result.totalPaidUsers
        });
      }
    })
    .catch(function(error) {
      console.log("Request failed", error);
    });
}
export { getDataPieChart, getDataLineChart, getTotalPurchase };
