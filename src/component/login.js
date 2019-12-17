import React from "react";
import fetch from "isomorphic-unfetch";
import API from "../api/apiAll";
import "../static/style-login.css";
import logoclappigames from "../static/img/logoclappigames.jpg";

import { Form, Input, Button, Modal } from "antd";

class NormalLoginForm extends React.Component {
  errorAlert = (errorStatus, errorMessage) => {
    Modal.error({
      title: "SOMETHING WENT WRONG",
      content: `${errorStatus}: ${errorMessage}`
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch(API.ROOT_URL + API.LOGIN_PATHNAME, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          body: `partnerName=${values.username}&password=${values.password}`
        })
          .then(response => {
            if (response.ok === false) {
              this.errorAlert(response.status, JSON.stringify(response));
              console.log(response)
            } else {
              response.json().then(result => {
                localStorage.setItem(
                  "userToken",
                  JSON.stringify(result),
                  "user",
                  JSON.stringify(result.accessToken)
                );
                this.props.logInOut(response.ok);
              });
            }
          })
          .catch(function(error) {
            this.errorAlert("Request failed", error);
          });
      }
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
            <Form.Item label="Username" className='ant-input-login'>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your Username!" }
                ]
              })(<Input placeholder="Username" className='ant-input-login'/>)}
            </Form.Item>
            <Form.Item label="Password"className='ant-input-login'>
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
              <br />
              <a className="login-form-forgot" style={{ width: "50%" }}>
                Forgot password ?
              </a>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}

const LoginForm = Form.create({ name: "normal_login" })(NormalLoginForm);
export default LoginForm;
