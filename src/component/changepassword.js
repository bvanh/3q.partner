import React, { useState } from "react";
import API from "../api/apiAll";
import fetch from "isomorphic-unfetch";
import { Form, Icon, Input, Button } from "antd";
function ChangePass(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = () => {
    let userAccessToken = localStorage.getItem("user");
    fetch(API.ROOT_URL + API.CHANGEPASSWORD_PATHNAME, {
      headers: {
        Authorization: `Bearer ${JSON.parse(userAccessToken).accessToken}`,
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
  };
  const getTextPassword = e => {
    if (e.target.name === "oldPassword") {
      setOldPassword(e.target.value);
    } else setNewPassword(e.target.value);
  };
  return (
    <div>
      <div style={{ padding: 24, background: "#fff", height: "90vh" }}>
        <Form className="login-form">
          <Form.Item label="OldPassword">
            <Input
              prefix={<Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="OldPassword"
              name="oldPassword"
              onChange={e => getTextPassword(e)}
            />
          </Form.Item>
          <Form.Item label="NewPassword">
            <Input
              prefix={<Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="NewPassword"
              name="newPassword"
              onChange={e => getTextPassword(e)}
            />
          </Form.Item>
          <p className="submit-mes">{message}</p>
          <Button
            type="primary"
            className="login-form-button submit-pw"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default ChangePass;
