import React, { useState } from "react";
import imgChangepass from "../../static/img/changepassword.svg";
import changePassword from "../services/changepassService";
import "../../static/style-changepass.css";
import { Form, Input, Button, Avatar, Row, Col } from "antd";
import { Link } from "react-router-dom";
function ChangePass(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async () => {
    let userAccessToken = localStorage.getItem("userAccessToken");
    if (newPassword !== confirmNewPassword) {
      setMessage("Password Not Equal !Try Again");
      return;
    } else {
      const mes = await changePassword(
        userAccessToken,
        oldPassword,
        newPassword
      );
      setMessage(mes.message);
    }
  };
  const getTextPassword = e => {
    if (e.target.name === "oldPassword") {
      setOldPassword(e.target.value);
    } else if (e.target.name === "confirmNewPassword") {
      setConfirmNewPassword(e.target.value);
    } else setNewPassword(e.target.value);
  };
  return (
    <Row className="changepass_container">
      <Col lg={{ span: 16, order: 1 }}className='changepassword_img'>
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
              In order to <b>protect your account</b>, make sure your password:
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
              onChange={e => getTextPassword(e)}
            />
          </Form.Item>
          <Form.Item label="New Password:">
            <Input.Password
              name="newPassword"
              onChange={e => getTextPassword(e)}
            />
          </Form.Item>
          <Form.Item label="Re-enter Your New Password:">
            <Input.Password
              name="confirmNewPassword"
              onChange={e => getTextPassword(e)}
            />
          </Form.Item>
          <p className="submit-mes">{message}</p>
          <Button
            type="primary"
            className="login-form-button btn_changepass"
            onClick={handleSubmit}
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
export default ChangePass;
