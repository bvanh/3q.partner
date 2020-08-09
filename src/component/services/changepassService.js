import API from "../../api/api";
import checkToken from "../../utils/checkToken";
import { baseGetData } from "../../api/baseApi";

// doi mat khau
function changePassword(thisObj, oldPassword, newPassword) {
  if (checkToken(thisObj)) {
    baseGetData
      .post(API.CHANGEPASSWORD_PATHNAME, {
        params: {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
      })
      .then((response) => {
        thisObj.setState({
          message: "Password updated successful !",
          statusSuccess: "mes_success",
        });
      })
      .catch((err) => {
        const { message } = err.data;
        thisObj.setState({
          message: message,
          statusSuccess: "submit-mes",
        });
      });
  }
}
export default changePassword;
