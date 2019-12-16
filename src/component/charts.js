import React from "react";
import { Pie, Line } from "react-chartjs-2";
import { Col, Row, Menu, Dropdown, Icon } from "antd";
import "../static/style-chartpage.css";
import API from "../api/apiAll";
const data = {
  labels: ["WEB", "APK"],
  datasets: [
    {
      data: [300, 50],
      backgroundColor: ["#FFD54F","#FCAF18"],
      hoverBackgroundColor: ["#FFD54F", "#FCAF18"]
    }
  ]
};
const menu = (
  <Menu>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);
const legendOpts = {
  display: true,
  position: 'top',
  fullWidth: true,
  padding:"0px",
  responsive:false,
  maintainAspectRatio:false,   
};
class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  chartVndData = () => {
    const data = {
      labels: this.state.vndChartxAxis,
      datasets: [
        {
          label: "Web",
          fill: false,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,0.4)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.vndChartyAxisWeb
        },
        {
          label: "Apk",
          fill: false,
          backgroundColor: "#ffce56",
          borderColor: "#ffce56",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.vndChartyAxisApk
        },
        {
          label: "Total",
          fill: false,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,0.2)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.vndChartyAxisTotal
        }
      ]
    };
    return data;
  };
  getVndData = type => {
    let userAccessToken = localStorage.getItem("user");
    fetch(
      API.ROOT_URL +
        API.CHARTS_PATHNAME +
        `?type=${type}` +
        API.CHARTS_PATHSEARCH_DATE,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(userAccessToken).accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(result =>
        this.setState({
          vndChartxAxis: result.xAxis,
          vndChartyAxisWeb: result.yAxis.WEB,
          vndChartyAxisApk: result.yAxis.APK,
          vndChartyAxisTotal: result.yAxis.TOTAL
        })
      )
      .catch(function(error) {
        console.log("Request failed", error);
      });
  };
  componentDidMount() {
    this.getVndData(1);
  }
  render() {
    return (
      <>
        <Row className="main_content">
          <Col span={16} id="chart-frame">
            <div className="sum">
              <div>
                <span>Số người mua</span>
                <br />
                <span>12345</span>
              </div>
              <div>
                <span>Số giao dịch</span>
                <br />
                <span>12345</span>
              </div>
            </div>
            <Line data={this.chartVndData} width={100} height={50} />
            <div className="chart-frame_footer">
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a className="ant-dropdown-link" href="#">
                    7 ngày qua <Icon type="caret-down" />
                  </a>
                </Dropdown>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a className="ant-dropdown-link" href="#">
                    CHI TIẾT GIAO DỊCH <Icon type="caret-right" />
                  </a>
                </Dropdown>
              </div>
          </Col>
          <Col span={8}>
            <div className="card">
              <div className="card_title">
                <p>TỔNG DOANH THU</p>
                <p id="value">7500000</p>
                <p>VNĐ</p>
              </div>
              <div className="card_content">
                <p>NGUỒN</p>
                <Pie data={data} width={100} height={75} legend={legendOpts} />
              </div>
              <div className="card_footer">
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a className="ant-dropdown-link" href="#">
                    7 ngày qua <Icon type="caret-down" />
                  </a>
                </Dropdown>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a className="ant-dropdown-link" href="#">
                    CHI TIẾT GIAO DỊCH <Icon type="caret-right" />
                  </a>
                </Dropdown>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default Charts;