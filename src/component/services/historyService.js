import API from "../../api/api";
import errorAlert from "../../utils/errorAlert";
import checkToken from "../../utils/checkToken";
import { baseGetData } from "../../api/baseApi";

// get data for table
function getData(thisObj, pathSearch) {
  if (checkToken(thisObj)) {
    return baseGetData
      .get(API.HISTORY_PATHNAME + pathSearch)
      .then((response) => {
        // console.log(response);
        const { rows, count } = response.data;
        thisObj.setState({
          // dataExport:[],
          data: rows,
          totalItem: count,
          loading: false,
        });
      })
      .catch((e) => {
        const { status, message } = e.data;
        errorAlert(status, message);
      });
  }
}
// get data for export
function getDataAll(thisObj, pathSearch) {
  if (checkToken(thisObj)) {
    return baseGetData
      .get(API.HISTORY_PATHNAME + pathSearch)
      .then((reponse) => {
        thisObj.setState({
          dataExportAll: reponse.data.rows,
        });
      })
      .catch((e) => {
        const { status, message } = e.data;
        errorAlert(status, message);
      });
  }
}
export { getData, getDataAll };