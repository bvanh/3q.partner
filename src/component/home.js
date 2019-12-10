import React from "react";
import { Result, Icon, Spin } from "antd";

export default function Home() {
  return (
    <Result
      icon={<Icon type="smile" theme="twoTone" />}
      title="Hello, Welcome Here!"
      extra={<Spin size="large" />}
      style={{ height: "78vh" }}
    />
  );
}
