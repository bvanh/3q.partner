import API from "../../api/apiAll";
import errorAlert from "../../utils/errorAlert";
import getToken from "../../utils/refreshToken";
import checkToken from "../../utils/checkToken";
import moment from "moment";

// lấy dữ liệu cho biểu đồ tròn
function getDataPieChartWithCondition(
  thisObj,
  fromDateValue,
  toDateValue,
  token
) {
  if (fromDateValue === toDateValue) {
    let AxisTotal = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      18000000,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    let AxisWeb = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      900000,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    let AxisApk = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      900000,
      0,
      0,
      0
    ];
    thisObj.setState({
      fromDate: fromDateValue,
      toDate: toDateValue,
      totalRevenueWEB: AxisWeb.reduce((x, y) => x + y),
      totalRevenueAPK: AxisApk.reduce((x, y) => x + y),
      totalRevenue: AxisTotal.reduce((x, y) => x + y)
    });
  } else {
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
}
// condition + function
function getDataPieChart(thisObj, fromDateValue, toDateValue) {
  if (checkToken(thisObj)) {
    let checkToken = getToken(thisObj);
    if (checkToken !== false) {
      checkToken.then(newAccessToken => {
        getDataPieChartWithCondition(
          thisObj,
          fromDateValue,
          toDateValue,
          newAccessToken
        );
      });
    }
  } else if (checkToken(thisObj) === false) {
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
  if (fromDateValue === toDateValue) {
    thisObj.setState({
      vndChartxAxis: [
        "0h",
        "1h",
        "2h",
        "3h",
        "4h",
        "5h",
        "6h",
        "7h",
        "8h",
        "9h",
        "10h",
        "11h",
        "12h",
        "13h",
        "14h",
        "15h",
        "16h",
        "17h",
        "18h",
        "19h",
        "20h",
        "21h",
        "22h",
        "23h"
      ],
      vndChartyAxisTotal: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        18000000,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      vndChartyAxisWeb: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        900000,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      vndChartyAxisApk: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        900000,
        0,
        0,
        0
      ],
      fromDate: fromDateValue,
      toDate: toDateValue
    });
    thisObj.hideModalPicker();
    getTotalPurchaseWithCondition(
      thisObj,
      fromDateValue,
      toDateValue,
      newAccessToken
    );
  } else {
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
}
// function + condition
function getDataLineChart(thisObj, fromDateValue, toDateValue) {
  const fromDayValue = moment(fromDateValue).valueOf();
  const toDayValue = moment(toDateValue).valueOf();
  if (toDayValue - fromDayValue <= 2592000000) {
    if (checkToken(thisObj)) {
      let checkToken = getToken(thisObj);
      if (checkToken !== false) {
        checkToken.then(newAccessToken => {
          getDataLineChartWithCondition(
            thisObj,
            fromDateValue,
            toDateValue,
            newAccessToken
          );
        });
      }
    } else if (checkToken(thisObj) === false) {
      const newAccessToken = JSON.parse(
        localStorage.getItem("userAccessToken")
      );
      getDataLineChartWithCondition(
        thisObj,
        fromDateValue,
        toDateValue,
        newAccessToken
      );
    }
  } else {
    errorAlert(500, "Date less than or equal 30 days");
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
function getTotalPurchase(thisObj, fromDate, toDate) {
  if (checkToken(thisObj)) {
    let checkToken = getToken(thisObj);
    if (checkToken !== false) {
      checkToken.then(newAccessToken => {
        getTotalPurchaseWithCondition(
          thisObj,
          fromDate,
          toDate,
          newAccessToken
        );
      });
    }
  } else if (checkToken(thisObj) === false) {
    const newAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
    getTotalPurchaseWithCondition(thisObj, fromDate, toDate, newAccessToken);
  }
}
export { getDataPieChart, getDataLineChart, getTotalPurchase };
