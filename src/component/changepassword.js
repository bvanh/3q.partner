import React, { useState } from "react";
import API from "../api/apiAll";
import fetch from "isomorphic-unfetch";
import imgChangepass from "../static/img/changepassword.svg";
import "../static/style-changepass.css";
import { Form, Input, Button, Avatar, Row, Col } from "antd";
import { Link } from "react-router-dom";
function ChangePass(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = () => {
    let userAccessToken = localStorage.getItem("userAccessToken");
    if (newPassword !== confirmNewPassword) {
      setMessage("Password Not Equal !Try Again");
      return;
    } else {
      fetch(API.ROOT_URL + API.CHANGEPASSWORD_PATHNAME, {
        headers: {
          Authorization: `Bearer ${JSON.parse(userAccessToken)}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        body: `oldPassword=${oldPassword}&newPassword=${newPassword}`
      })
        .then(response => response.json())
        .then(result => setMessage(result.message))
        .catch(function(error) {
          console.log("Request failed", error);
        });
      console.log(oldPassword, newPassword);
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
      <Col lg={{ span: 16, order: 1 }}>
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
