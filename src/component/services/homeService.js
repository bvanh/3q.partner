import API from "../../api/api";
import errorAlert from "../../utils/errorAlert";
import getToken from "../../utils/refreshToken";
import checkToken from "../../utils/checkToken";
import { dispatchSetListPartner } from "../../redux/actions/index";
import moment from "moment";
import axios from "axios";
import qs from "qs";
import {
  localStorageService,
  valService,
} from "../../utils/localStorageService";
import { baseGetData } from "../../api/baseApi";
const { getLocalInfo, setToken } = localStorageService;
const { accessTokenPartner, tokenPartner } = valService;

const checkDate = (fromDateValue, toDateValue, partnerId) => {
  let indexParams = {
    api: null,
    params: {},
  };
  if (fromDateValue === toDateValue) {
    indexParams.params = {
      date: fromDateValue,
      data: partnerId,
    };
    indexParams.api = API.CHARTS_PATH_HOUR2;
    return indexParams;
  } else {
    indexParams.params = {
      fromDate: fromDateValue,
      toDate: toDateValue,
      data: partnerId,
    };
    indexParams.api = API.CHARTS_PATHNAME;
    return indexParams;
  }
};
const setDataToState = (
  thisObj,
  isChart,
  isHour,
  fromDate,
  toDate,
  response
) => {
  const { xAxis, yAxis } = response.data;
  switch (isChart) {
    case "LINE_CHART":
      switch (isHour) {
        case true:
          let newXaxis = xAxis.map((val) => val + "h");
          thisObj.setState({
            vndChartxAxis: newXaxis,
            vndChartyAxisTotal: yAxis.TOTAL,
            vndChartyAxisWeb: yAxis.WEB,
            vndChartyAxisApk: yAxis.APK,
            fromDate: fromDate,
            toDate: toDate,
          });
          break;
        default:
          thisObj.setState({
            vndChartxAxis: xAxis,
            vndChartyAxisTotal: yAxis.TOTAL,
            vndChartyAxisWeb: yAxis.WEB,
            vndChartyAxisApk: yAxis.APK,
            fromDate: fromDate,
            toDate: toDate,
          });
          break;
      }
      break;
    default:
      thisObj.setState({
        fromDate: fromDate,
        toDate: toDate,
        totalRevenueWEB: yAxis.WEB.reduce((x, y) => x + y),
        totalRevenueAPK: yAxis.APK.reduce((x, y) => x + y),
        totalRevenue: yAxis.TOTAL.reduce((x, y) => x + y),
      });
      break;
  }
};
const getDataChart = (
  thisObj,
  isChart,
  isHour,
  fromDateValue,
  toDateValue,
  partnerId
) => {
  if (checkToken(thisObj)) {
    const isParams = checkDate(fromDateValue, toDateValue, partnerId);
    return baseGetData
      .get(isParams.api, {
        params: { ...isParams.params, type: 0 },
      })
      .then((response) => {
        console.log(response);
        setDataToState(
          thisObj,
          isChart,
          isHour,
          fromDateValue,
          toDateValue,
          response
        );
      })
      .catch((error) => {
        const { status, message } = error.data;
        errorAlert(status, message);
      });
  }
};
// const getDataLineChart = (thisObj, fromDateValue, toDateValue, partnerId) => {};
// lấy dữ liệu cho biểu đồ tròn
// function set condition
// function getDataChart(thisObj, fromDateValue, toDateValue, partnerId) {
//   if (checkToken(thisObj)) {
//     let checkToken = getToken(thisObj);
//     if (checkToken !== false) {
//       checkToken.then((newAccessToken) => {
//         getDataChartAfterSetCondition(
//           thisObj,
//           fromDateValue,
//           toDateValue,
//           newAccessToken,
//           partnerId
//         );
//       });
//     }
//   } else if (checkToken(thisObj)) {
//     const newAccessToken = JSON.parse(
//       localStorage.getItem("accessTokenPartner")
//     );
//     getDataChartAfterSetCondition(
//       thisObj,
//       fromDateValue,
//       toDateValue,
//       newAccessToken,
//       partnerId
//     );
//   }
// }
// // function callback after set condition
// function getDataChartAfterSetCondition(
//   thisObj,
//   fromDateValue,
//   toDateValue,
//   token,
//   partnerId
// ) {
//   let resStatus = 0;
//   if (fromDateValue === toDateValue) {
//     fetch(
//       API.ROOT_URL +
//         API.CHARTS_PATH_HOUR +
//         `&date=${fromDateValue}&data=${partnerId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token.accessToken}`,
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         method: "GET",
//       }
//     )
//       .then((response) => {
//         resStatus = response.status;
//         return response.json();
//       })
//       .then((result) => {
//         if (resStatus !== 200) {
//           errorAlert(result.status, result.message);
//           return;
//         } else {
//           console.log(result);
//           thisObj.setState({
//             fromDate: fromDateValue,
//             toDate: toDateValue,
//             totalRevenueWEB: result.yAxis.WEB.reduce((x, y) => x + y),
//             totalRevenueAPK: result.yAxis.APK.reduce((x, y) => x + y),
//             totalRevenue: result.yAxis.TOTAL.reduce((x, y) => x + y),
//           });
//         }
//       })
//       .catch(function (error) {
//         console.log("Request failed", error);
//       });
//   } else {
//     fetch(
//       API.ROOT_URL +
//         API.CHARTS_PATHNAME +
//         API.CHARTS_PATHSEARCH_TYPE +
//         `&fromDate=${fromDateValue}&toDate=${toDateValue}&data=${partnerId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token.accessToken}`,
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         method: "GET",
//       }
//     )
//       .then((response) => {
//         resStatus = response.status;
//         return response.json();
//       })
//       .then((result) => {
//         if (resStatus !== 200) {
//           errorAlert(result.status, result.message);
//           return;
//         } else {
//           // console.log(result)
//           thisObj.setState({
//             fromDate: fromDateValue,
//             toDate: toDateValue,
//             totalRevenueWEB: result.yAxis.WEB.reduce((x, y) => x + y),
//             totalRevenueAPK: result.yAxis.APK.reduce((x, y) => x + y),
//             totalRevenue: result.yAxis.TOTAL.reduce((x, y) => x + y),
//           });
//         }
//       })
//       .catch(function (error) {
//         console.log("Request failed", error);
//       });
//   }
// }
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
        checkToken.then((newAccessToken) => {
          getDataLineChartAfterSetCondition(
            thisObj,
            fromDateValue,
            toDateValue,
            newAccessToken,
            partnerId
          );
        });
      }
    } else if (checkToken(thisObj)) {
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
  // console.log(thisObj, fromDateValue, toDateValue, newAccessToken, partnerId);
  let resStatus = 0;
  if (fromDateValue === toDateValue) {
    fetch(
      API.ROOT_URL +
        API.CHARTS_PATH_HOUR +
        `&date=${fromDateValue}&data=${partnerId}`,
      {
        headers: {
          Authorization: `Bearer ${newAccessToken.accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "GET",
      }
    )
      .then((response) => {
        resStatus = response.status;
        return response.json();
      })
      .then((result) => {
        if (resStatus !== 200) {
          errorAlert(result.status, result.message);
          return;
        } else {
          let newXaxis = result.xAxis.map((val) => val + "h");
          thisObj.setState({
            vndChartxAxis: newXaxis,
            vndChartyAxisTotal: result.yAxis.TOTAL,
            vndChartyAxisWeb: result.yAxis.WEB,
            vndChartyAxisApk: result.yAxis.APK,
            fromDate: fromDateValue,
            toDate: toDateValue,
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
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "GET",
      }
    )
      .then((response) => {
        resStatus = response.status;
        return response.json();
      })
      .then((result) => {
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
            toDate: toDateValue,
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
      checkToken.then((newAccessToken) => {
        getTotalPurchaseAfterSetCondition(
          thisObj,
          fromDate,
          toDate,
          newAccessToken,
          partnerId
        );
      });
    }
  } else if (checkToken(thisObj)) {
    const newAccessToken = JSON.parse(
      localStorage.getItem("accessTokenPartner")
    );
    getTotalPurchaseAfterSetCondition(
      thisObj,
      fromDate,
      toDate,
      newAccessToken
    );
  }
}
// function callback after check condition
function getTotalPurchaseAfterSetCondition(
  thisObj,
  fromDate,
  toDate,
  token,
  partnerId
) {
  let resStatus = 0;
  fetch(
    API.ROOT_URL +
      API.HISTORY_PATHNAME +
      API.HISTORY_PATHSEARCH_NODATE +
      `&fromDate=${fromDate}&toDate=${toDate}&data=${partnerId}`,
    {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "GET",
    }
  )
    .then((response) => {
      resStatus = response.status;
      return response.json();
    })
    .then((result) => {
      if (resStatus !== 200) {
        errorAlert(result.status, result.message);
        return;
      } else {
        thisObj.setState({
          totalPurchase: result.count,
          totalPaidUsers: result.totalPaidUsers,
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
      checkToken.then((newAccessToken) => {
        getListPartnersAfterSetCondition(thisObj, newAccessToken);
      });
    }
  } else if (checkToken(thisObj)) {
    const newAccessToken = JSON.parse(
      localStorage.getItem("accessTokenPartner")
    );
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
        console.log(result);
        dispatchSetListPartner(result);
        // thisObj.setState({
        //   listPartners: result,
        //   // partnerId: "1BA3F861-D4F2-4D97-9F78-38633155EC27"
        // })
        //dispatchSetPartner("1BA3F861-D4F2-4D97-9F78-38633155EC27")
      }
    })
    .catch(function (error) {
      console.log("Request failed", error);
    });
}
export { getDataChart, getDataLineChart, getTotalPurchase, getListPartners };
