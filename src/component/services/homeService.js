import API from "../../api/apiAll";
import errorAlert from "../../utils/errorAlert";
import getToken from "../../utils/refreshToken";

// lấy dữ liệu cho biểu đồ tròn
function getDataPieChartWithCondition(
  thisObj,
  fromDateValue,
  toDateValue,
  token
) {
  let resStatus = 0;
  fetch(
    API.ROOT_URL +
      API.CHARTS_PATHNAME +
      API.CHARTS_PATHSEARCH_TYPE +
      `&fromDate=${fromDateValue}&toDate=${toDateValue}`,
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
}
// condition + function
function getDataPieChart(thisObj, userToken, fromDateValue, toDateValue) {
  const oldAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
  const currentTime = new Date().getTime();
  if (currentTime - oldAccessToken.timestamp > 55000)
    getToken(userToken).then(newAccessToken => {
      getDataPieChartWithCondition(
        thisObj,
        fromDateValue,
        toDateValue,
        newAccessToken
      );
    });
  else {
    const newAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
    getDataPieChartWithCondition(
      thisObj,
      fromDateValue,
      toDateValue,
      newAccessToken
    );
  }
}
// end
// lấy dữ liệu cho biểu đồ cột

function getDataLineChartWithCondition(
  thisObj,
  fromDateValue,
  toDateValue,
  newAccessToken
) {
  let resStatus = 0;
  fetch(
    API.ROOT_URL +
      API.CHARTS_PATHNAME +
      API.CHARTS_PATHSEARCH_TYPE +
      `&fromDate=${fromDateValue}&toDate=${toDateValue}`,
    {
      headers: {
        Authorization: `Bearer ${newAccessToken.accessToken}`,
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
  getTotalPurchaseWithCondition(
    thisObj,
    fromDateValue,
    toDateValue,
    newAccessToken
  );
}
// function + condition
function getDataLineChart(thisObj, userToken, fromDateValue, toDateValue) {
  const oldAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
  const currentTime = new Date().getTime();
  if (currentTime - oldAccessToken.timestamp > 5000)
    getToken(userToken).then(newAccessToken => {
      getDataLineChartWithCondition(
        thisObj,
        fromDateValue,
        toDateValue,
        newAccessToken
      );
    });
  else {
    const newAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
    getDataLineChartWithCondition(
      thisObj,
      fromDateValue,
      toDateValue,
      newAccessToken
    );
  }
}

// lấy tổng số lượng giao dịch
function getTotalPurchaseWithCondition(thisObj, fromDate, toDate, token) {
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
function getTotalPurchase(thisObj, userToken, fromDate, toDate) {
  const oldAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
  const currentTime = new Date().getTime();
  if (currentTime - oldAccessToken.timestamp > 3000) {
    getToken(userToken).then(newAccessToken => {
      getTotalPurchaseWithCondition(thisObj, fromDate, toDate, newAccessToken);
    });
  } else {
    const newAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
    getTotalPurchaseWithCondition(thisObj, fromDate, toDate, newAccessToken);
  }
}
export { getDataPieChart, getDataLineChart, getTotalPurchase };
