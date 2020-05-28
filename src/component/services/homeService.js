import API from "../../api/apiAll";
import errorAlert from "../../utils/errorAlert";
import getToken from "../../utils/refreshToken";
import checkToken from "../../utils/checkToken";
import { dispatchSetPartner } from '../../redux/actions/index'
import moment from "moment";

// lấy dữ liệu cho biểu đồ tròn
// function set condition
function getDataPieChart(thisObj, fromDateValue, toDateValue, partnerId) {
  if (checkToken(thisObj)) {
    let checkToken = getToken(thisObj);
    if (checkToken !== false) {
      checkToken.then(newAccessToken => {
        getDataPieChartAfterSetCondition(
          thisObj,
          fromDateValue,
          toDateValue,
          newAccessToken,
          partnerId
        );
      });
    }
  } else if (checkToken(thisObj) === false) {
    const newAccessToken = JSON.parse(localStorage.getItem("accessTokenPartner"));
    getDataPieChartAfterSetCondition(
      thisObj,
      fromDateValue,
      toDateValue,
      newAccessToken,
      partnerId
    );
  }
}
// function callback after set condition
function getDataPieChartAfterSetCondition(
  thisObj,
  fromDateValue,
  toDateValue,
  token,
  partnerId
) {
  let resStatus = 0;
  if (fromDateValue === toDateValue) {
    fetch(API.ROOT_URL + API.CHARTS_PATH_HOUR + `&date=${fromDateValue}&data=${partnerId}`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
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
          console.log(result)
          thisObj.setState({
            fromDate: fromDateValue,
            toDate: toDateValue,
            totalRevenueWEB: result.yAxis.WEB.reduce((x, y) => x + y),
            totalRevenueAPK: result.yAxis.APK.reduce((x, y) => x + y),
            totalRevenue: result.yAxis.TOTAL.reduce((x, y) => x + y)
          });
        }
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  } else {
    fetch(
      API.ROOT_URL +
      API.CHARTS_PATHNAME +
      API.CHARTS_PATHSEARCH_TYPE +
      `&fromDate=${fromDateValue}&toDate=${toDateValue}&data=${partnerId}`,
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
          // console.log(result)
          thisObj.setState({
            fromDate: fromDateValue,
            toDate: toDateValue,
            totalRevenueWEB: result.yAxis.WEB.reduce((x, y) => x + y),
            totalRevenueAPK: result.yAxis.APK.reduce((x, y) => x + y),
            totalRevenue: result.yAxis.TOTAL.reduce((x, y) => x + y)
          });
        }
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }
}
// lấy dữ liệu cho biểu đồ cột
// function check condition
function getDataLineChart(thisObj, fromDateValue, toDateValue, partnerId) {
  // console.log(thisObj, fromDateValue, toDateValue, partnerId)
  const fromDayValue = moment(fromDateValue).valueOf();
  const toDayValue = moment(toDateValue).valueOf();
  if (toDayValue - fromDayValue <= 2592000000) {
    if (checkToken(thisObj)) {
      let checkToken = getToken(thisObj);
      if (checkToken !== false) {
        checkToken.then(newAccessToken => {
          getDataLineChartAfterSetCondition(
            thisObj,
            fromDateValue,
            toDateValue,
            newAccessToken,
            partnerId
          );
        });
      }
    } else if (checkToken(thisObj) === false) {
      const newAccessToken = JSON.parse(
        localStorage.getItem("accessTokenPartner")
      );
      getDataLineChartAfterSetCondition(
        thisObj,
        fromDateValue,
        toDateValue,
        newAccessToken,
        partnerId
      );
    }
  } else {
    errorAlert(500, "Date less than or equal 30 days");
  }
}
// function callback after condition
function getDataLineChartAfterSetCondition(
  thisObj,
  fromDateValue,
  toDateValue,
  newAccessToken,
  partnerId
) {
  console.log(thisObj,
    fromDateValue,
    toDateValue,
    newAccessToken,
    partnerId)
  let resStatus = 0;
  if (fromDateValue === toDateValue) {
    fetch(API.ROOT_URL + API.CHARTS_PATH_HOUR + `&date=${fromDateValue}&data=${partnerId}`, {
      headers: {
        Authorization: `Bearer ${newAccessToken.accessToken}`,
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
          let newXaxis = result.xAxis.map(val => val + 'h')
          thisObj.setState({
            vndChartxAxis: newXaxis,
            vndChartyAxisTotal: result.yAxis.TOTAL,
            vndChartyAxisWeb: result.yAxis.WEB,
            vndChartyAxisApk: result.yAxis.APK,
            fromDate: fromDateValue,
            toDate: toDateValue
          });
        }
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
    thisObj.hideModalPicker();
    getTotalPurchaseAfterSetCondition(
      thisObj,
      fromDateValue,
      toDateValue,
      newAccessToken,
      partnerId
    );
  } else {
    fetch(
      API.ROOT_URL +
      API.CHARTS_PATHNAME +
      API.CHARTS_PATHSEARCH_TYPE +
      `&fromDate=${fromDateValue}&toDate=${toDateValue}&data=${partnerId}`,
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
        // console.log(result)
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
      .catch(function (error) {
        console.log("Request failed", error);
      });
    thisObj.hideModalPicker();
    getTotalPurchaseAfterSetCondition(
      thisObj,
      fromDateValue,
      toDateValue,
      newAccessToken,
      partnerId
    );
  }
}
// lấy tổng số lượng giao dịch
// function check condition
function getTotalPurchase(thisObj, fromDate, toDate, partnerId) {
  if (checkToken(thisObj)) {
    let checkToken = getToken(thisObj);
    if (checkToken !== false) {
      checkToken.then(newAccessToken => {
        getTotalPurchaseAfterSetCondition(
          thisObj,
          fromDate,
          toDate,
          newAccessToken,
          partnerId
        );
      });
    }
  } else if (checkToken(thisObj) === false) {
    const newAccessToken = JSON.parse(localStorage.getItem("accessTokenPartner"));
    getTotalPurchaseAfterSetCondition(thisObj, fromDate, toDate, newAccessToken);
  }
}
// function callback after check condition
function getTotalPurchaseAfterSetCondition(thisObj, fromDate, toDate, token, partnerId) {
  let resStatus = 0;
  fetch(
    API.ROOT_URL +
    API.HISTORY_PATHNAME +
    API.HISTORY_PATHSEARCH_NODATE +
    `&fromDate=${fromDate}&toDate=${toDate}&data=${partnerId}`,
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
    .catch(function (error) {
      console.log("Request failed", error);
    });
}
// get list partners
function getListPartners(thisObj) {
  if (checkToken(thisObj)) {
    let checkToken = getToken(thisObj);
    if (checkToken !== false) {
      checkToken.then(newAccessToken => {
        getListPartnersAfterSetCondition(
          thisObj,
          newAccessToken
        );
      });
    }
  } else if (checkToken(thisObj) === false) {
    const newAccessToken = JSON.parse(localStorage.getItem("accessTokenPartner"));
    getListPartnersAfterSetCondition(thisObj, newAccessToken);
  }
}
function getListPartnersAfterSetCondition(thisObj, token) {
  let resStatus = 0;
  fetch(API.ROOT_URL + API.LIST_PARTNERS, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "GET",
  })
    .then((response) => {
      resStatus = response.status;
      return response.json();
    })
    .then((result) => {
      if (resStatus === 200) {
        console.log(result)
        thisObj.setState({
          listPartners: result,
          // partnerId: "1BA3F861-D4F2-4D97-9F78-38633155EC27"
        })
        //dispatchSetPartner("1BA3F861-D4F2-4D97-9F78-38633155EC27")
      }
    })
    .catch(function (error) {
      console.log("Request failed", error);
    });
}
export { getDataPieChart, getDataLineChart, getTotalPurchase, getListPartners };
