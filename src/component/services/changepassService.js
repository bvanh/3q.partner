import API from "../../api/api";
import checkToken from "../../utils/checkToken";
import qs from "qs";
import { baseGetData } from "../../api/baseApi";

// doi mat khau
function changePassword(thisObj, oldPassword, newPassword) {
  if (checkToken(thisObj)) {
    baseGetData
      .post(
        API.CHANGEPASSWORD_PATHNAME,
        qs.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
        })
      )
      .then((response) => {
        thisObj.setState({
          message: "Password updated successful !",
          statusSuccess: "mes_success",
        });
      })
      .catch((err) => {
        if (err.data) {
          const { message } = err.data;
          thisObj.setState({
            message: message,
            statusSuccess: "submit-mes",
          });
        } else {
          thisObj.setState({
            message: 'Check old password again !',
            statusSuccess: "submit-mes",
          });
        }
      });
  }
}
export default changePassword;
