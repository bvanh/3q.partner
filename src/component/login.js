import React from "react";
import fetch from "isomorphic-unfetch";
import API from "../api/apiAll";
import "../static/style-login.css";
import logoclappigames from "../static/img/logoclappigames.jpg";

import { Form, Icon, Input, Button } from "antd";

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
          .then(response => response.json())
          .then(result =>
            localStorage.setItem(
              "userToken",
              JSON.stringify(result),
              "user",
              JSON.stringify(result.accessToken)
            )
          )
          .then(this.props.logInOut())
          .catch(function(error) {
            console.log("Request failed", error);
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
            <Form.Item label="Username">
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your Username!" }
                ]
              })(<Input placeholder="Username" />)}
            </Form.Item>
            <Form.Item label="Password">
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
