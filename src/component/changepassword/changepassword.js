import React, { useState } from "react";
import imgChangepass from "../../static/img/changepassword.svg";
import changePassword from "../services/changepassService";
import "../../static/style-changepass.css";
import { Form, Input, Button, Avatar, Row, Col } from "antd";
import { Link } from "react-router-dom";
class ChangePass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      message: ""
    };
  }
  handleSubmit = async () => {
    const {
      newPassword,
      oldPassword,
      confirmNewPassword,
      message
    } = this.state;
    if (newPassword !== confirmNewPassword) {
      this.setState({
        message: "Password Not Equal !Try Again"
      });
      return;
    } else {
      const mes = changePassword(this,oldPassword,newPassword);
      // mes.then(newMes =>
      //   this.setState({
      //     message: newMes.message
      //   })
      // );
      console.log(mes)
    }
  };
  getTextPassword = e => {
    if (e.target.name === "oldPassword") {
      this.setState({
        oldPassword: e.target.value
      });
    } else if (e.target.name === "confirmNewPassword") {
      this.setState({
        confirmNewPassword: e.target.value
      });
    } else
      this.setState({
        newPassword: e.target.value
      });
  };
  render() {
    const { message } = this.state;
    return (
      <Row className="changepass_container">
        <Col lg={{ span: 16, order: 1 }} className="changepassword_img">
          <img
            src={imgChangepass}
            alt="logo_clappigames"
            className="img_changepass"
            style={{ width: "100%" }}
          ></img>
        </Col>
        <Col lg={{ span: 8, order: 2 }} className="changepassword-form">
          <Form>
            <div className="changepass_header">
              <h2>Change Password</h2>
              <p>
                In order to <b>protect your account</b>, make sure your
                password:
              </p>
              <ul>
                <li>Is longer than 6 characters</li>
                <li>
                  Does not match or significantly contain your username, e.g. do
                  not use “username123”
                </li>
              </ul>
            </div>
            <Form.Item label="Old Password:">
              <Input.Password
                name="oldPassword"
                onChange={this.getTextPassword}
              />
            </Form.Item>
            <Form.Item label="New Password:">
              <Input.Password
                name="newPassword"
                onChange={this.getTextPassword}
              />
            </Form.Item>
            <Form.Item label="Re-enter Your New Password:">
              <Input.Password
                name="confirmNewPassword"
                onChange={this.getTextPassword}
              />
            </Form.Item>
            <p className="submit-mes">{message}</p>
            <Button
              type="primary"
              className="login-form-button btn_changepass"
              onClick={this.handleSubmit}
            >
              Change Password
            </Button>
          </Form>
          <Link to="/">
            <Avatar size="large" icon="home" id="btn_backhome" />
            <br />
          </Link>
          <span>Back to Home</span>
        </Col>
      </Row>
    );
  }
}
export default ChangePass;
