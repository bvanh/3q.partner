import React from "react";
import fetch from "isomorphic-unfetch";

import { Form, Icon, Input, Button } from "antd";

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch("http://171.244.141.231:9001/auth/login/", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          body: `partnerName=${values.username}&password=${values.password}`
        })
          .then(function(response) {
            let res = response.json();
            // return res;
            console.log(res);
          })
          .catch(function(error) {
            console.log("Request failed", error);
          });
        // console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
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
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "Please input your Password!" },
              {
                pattern: "^(?=.{8,})",
                message: "Password must be 8 characters or longer !"
              }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item className="btn-submit">
          <a className="login-form-forgot" href="" style={{ width: "50%" }}>
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
