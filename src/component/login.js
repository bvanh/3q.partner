import React from "react";
import { saveTokenToLocal, saveTokenToState } from "./services/loginService";
import "../static/style-login.css";
import logoclappigames from "../static/img/logoclappigames.jpg";
import { Form, Input, Button, Modal, Checkbox } from "antd";

class NormalLoginForm extends React.Component {
  errorAlert = (errorStatus, errorMessage) => {
    Modal.error({
      title: "SOMETHING WENT WRONG",
      content: `${errorStatus}: ${errorMessage}`
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let resStatus = 0;
    this.props.form.validateFields((err, values) => {
      if (!err && values.remember) {
        saveTokenToLocal(this, values, resStatus);
      } else if (!err && !values.remember)
        saveTokenToState(this, values, resStatus);
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-form">
        <img
          src={logoclappigames}
          alt="logo_clappigames"
          className="logo"
        ></img>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <span className="login_text">LOGIN</span>
          <div className="input_form">
            <Form.Item label="Username" className="ant-input-login">
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your Username!" }
                ]
              })(<Input placeholder="Username" className="ant-input-login" />)}
            </Form.Item>
            <Form.Item label="Password" className="ant-input-login">
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(<Input type="password" placeholder="Password" />)}
            </Form.Item>
            <Form.Item className="btn-submit">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}

const LoginForm = Form.create({ name: "normal_login" })(NormalLoginForm);
export default LoginForm;
