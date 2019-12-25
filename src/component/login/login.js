import React from "react";
import { saveTokenToLocal } from "../services/loginService";
import "../../static/style-login.css";
import logoclappigames from "../../static/img/logoclappigames.png";
import imgLogin from "../../static/img/Group 1.svg";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";

class NormalLoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    isRemember: true,
    validateStatus: "",
    message: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    const { username, password, isRemember } = this.state;
    saveTokenToLocal(this, username, password, isRemember);
  };
  addText = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  isRemember = e => {
    this.setState({
      isRemember: e.target.checked
    });
  };
  resetStatus = () => {
    this.setState({
      validateStatus: "",
      message: ""
    });
  };
  render() {
    const { validateStatus, message, isRemember } = this.state;
    return (
      <Row id="login_container">
        <img
          src={logoclappigames}
          alt="logo_clappigames"
          className="logo_mobile"
        ></img>
        <Col lg={{ span: 14, order: 1 }}>
          <img
            src={logoclappigames}
            alt="logo_clappigames"
            className="logo"
          ></img>
          <img
            src={imgLogin}
            alt="logo_clappigames"
            className="logo"
            style={{ width: "100%" }}
          ></img>
        </Col>
        <Col lg={{ span: 10, order: 2 }}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <span className="login_text">LOGIN</span>
            <div className="input_form">
              <Form.Item
                label="Username"
                className="ant-input-login"
                validateStatus={validateStatus}
              >
                <Input
                  placeholder="Username"
                  name="username"
                  className="ant-input-login"
                  onFocus={this.resetStatus}
                  onChange={this.addText}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                className="ant-input-login"
                validateStatus={validateStatus}
              >
                <Input.Password
                  type="password"
                  name="password"
                  placeholder="Password"
                  onFocus={this.resetStatus}
                  onChange={this.addText}
                />
              </Form.Item>
              <p className="submit-mes">{message}</p>
              <Form.Item className="btn-submit">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                <Checkbox checked={isRemember} onChange={this.isRemember}>
                  Remember me
                </Checkbox>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    );
  }
}

const LoginForm = Form.create({ name: "normal_login" })(NormalLoginForm);
export default LoginForm;
