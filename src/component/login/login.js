import React from "react";
import { saveTokenToLocal, saveTokenToState } from "../services/loginService";
import "../../static/style-login.css";
import logoclappigames from "../../static/img/logoclappigames.png";
import imgLogin from "../../static/img/Group 1.svg";
import { Form, Input, Button, Modal, Checkbox, Row, Col } from "antd";

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
      if (!err && values.remember) {
        saveTokenToLocal(this, values);
      } else if (!err && !values.remember)
        saveTokenToState(this, values);
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row id='login_container'>  
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
            src={imgLogin }
            alt="logo_clappigames"
            className="logo"
            style={{width:'100%'}}
          ></img>
        </Col>
        <Col lg={{ span: 10, order: 2 }} >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <span className="login_text">LOGIN</span>
            <div className="input_form">
              <Form.Item label="Username" className="ant-input-login">
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "Please input your Username!" }
                  ]
                })(
                  <Input placeholder="Username" className="ant-input-login" />
                )}
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
        </Col>
      </Row>
    );
  }
}

const LoginForm = Form.create({ name: "normal_login" })(NormalLoginForm);
export default LoginForm;
