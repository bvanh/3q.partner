import API from "../../api/api";
import errorAlert from "../../utils/errorAlert";
import checkToken from "../../utils/checkToken";
import { dispatchSetListPartner } from "../../redux/actions/index";
import { baseGetData } from "../../api/baseApi";


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
  response,
  partnerId
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
      getTotalPurchase(thisObj, fromDate, toDate, partnerId);
      break;
    default:
      thisObj.setState({
        fromDate: fromDate,
        toDate: toDate,
        totalRevenueWEB: yAxis.WEB.reduce((x, y) => x + y),
        totalRevenueAPK: yAxis.APK.reduce((x, y) => x + y),
        totalRevenue: yAxis.TOTAL.reduce((x, y) => x + y),
      });
      getTotalPurchase(thisObj, fromDate, toDate, partnerId);
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
        setDataToState(
          thisObj,
          isChart,
          isHour,
          fromDateValue,
          toDateValue,
          response,
          partnerId
        );
      })
      .catch((error) => {
        const { status, message } = error.data;
        errorAlert(status, message);
      });
  }
};
// get total purchase
function getTotalPurchase(thisObj, fromDate, toDate, partnerId) {
  if (checkToken(thisObj)) {
    return baseGetData
      .get(API.HISTORY_PATHNAME + API.HISTORY_PATHSEARCH_NODATE, {
        params: { fromDate: fromDate, toDate: toDate, data: partnerId },
      })
      .then((response) => {
        const { count, totalPaidUsers } = response.data;
        thisObj.setState({
          totalPurchase: count,
          totalPaidUsers: totalPaidUsers,
        });
      })
      .catch((error) => {
        const { status, message } = error.data;
        errorAlert(status, message);
      });
  }
}
// get list partners
function getListPartners(thisObj) {
  if (checkToken(thisObj)) {
    return baseGetData
      .get(API.LIST_PARTNERS)
      .then((response) => {
        dispatchSetListPartner(response.data);
      })
      .catch((error) => {
        const { status, message } = error.data;
        errorAlert(status, message);
      });
  }
}
export { getDataChart, getTotalPurchase, getListPartners };
