import React from "react";
import fetch from "isomorphic-unfetch";
import API from "../api/apiAll";

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
            localStorage.setItem("userToken", JSON.stringify(result))
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
    // const { validateStatus, help } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item
        // validateStatus={validateStatus}
        // help={help}
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item className="btn-submit">
          <a className="login-form-forgot" style={{ width: "50%" }}>
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ float: "right" }}
          >
            Log in
          </Button>
          <br />
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: "normal_login" })(NormalLoginForm);
export default LoginForm;
