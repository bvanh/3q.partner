import { Modal } from "antd";
const errorAlert = (errorStatus, errorMessage) => {
  Modal.error({
    title: "SOMETHING WENT WRONG",
    content: `${errorStatus}: ${errorMessage}`
  });
};
export default errorAlert;
