import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Default, ChangePass, Login, Start } from "./subcontent/default";
import "../../static/style-support.css";
import {
  NavigationBar,
  OverviewDashboard,
  LeftChart,
  RightChart
} from "./subcontent/overviewAndNav";
import {
  Showup,
  Export,
  Search,
  OverviewDetail
} from "./subcontent/overviewData";

import { BrowserRouter as Router } from "react-router-dom";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;
function Support() {
  const [content, setContent] = useState(Default);
  const titleContent = {
    first: [
      ["Getting started", Start],
      ["Log in to CCR", Login],
      ["Change Password", ChangePass]
    ],
    overviewDashboard: [
      ["Overview of the CCR dashboard", OverviewDashboard],
      [" Navigation bar", NavigationBar],
      ["Left Chart", LeftChart],
      ["Right chart", RightChart]
    ],
    overviewData: [
      ["Overview of Data details", OverviewDetail],
      ["Search for Purchase", Search],
      ["Export Excel", Export],
      ["Show up to", Showup]
    ]
  };
  const changeContent = val => {
    setContent(val);
  };
  const printContent = (content, vals) => {
    const newContent = content.map((val, index1) => {
      return (
        <Menu.Item
          key={index1 + vals}
          onClick={() => changeContent(val[1])}
          style={{ background: "#f0f2f5",margin:'0'}}
        >
          <span>{val[0]}</span>
        </Menu.Item>
      );
    });
    return newContent;
  };
  const printRouter = printContent(titleContent.first, "a");
  const printOverviewMenu = printContent(titleContent.overviewDashboard, "b");
  const printOverviewDetail = printContent(titleContent.overviewData, "c");
  return (
    <Layout>
      <Router>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Sider width={200} style={{ background: "#f0f2f5" }}>
            <Menu
              mode="inline"
              style={{ height: "100%", background: "#f0f2f5" }}
              id='menu_support'
            >
              {printRouter}
              <SubMenu
                key="222"
                title={<span>Take a Tour of the CCR Interface</span>}
                style={{ background: "#f0f2f5", margin: "0" }}
              >
                {printOverviewMenu}
              </SubMenu>
              <SubMenu key="99" title={<span>Working with data details</span>}>
                {printOverviewDetail}
              </SubMenu>
              <SubMenu key="99" title={<span>Working with data details</span>}>
                <a href='../Guide_partner.docx' download='Guide_partner.docx'>download</a>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {content}
          </Content>
        </Layout>
      </Router>
    </Layout>
  );
}
export default Support;
