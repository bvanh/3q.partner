import React from "react";
import {Radio} from 'antd';
function Infor() {
  return (
    <div>
      <Radio.Group
        defaultValue="a"
        buttonStyle="solid"
        style={{ padding: ".5rem 1rem" }}
      >
        <Radio.Button value="a" >
         Information
        </Radio.Button>
        <Radio.Button value="b" >
          Update
        </Radio.Button>
      </Radio.Group>
      <div style={{padding: 24,background: "#fff", height: "90vh" }}>
        <p>UserName</p>
        <p>Email</p>
        <p>Password</p>
      </div>
    </div>
  );
}
export default Infor;
