import React from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Col,
  Row,
  Menu,
  Dropdown,
  Icon,
  Select,
  DatePicker,
  Modal
} from "antd";
import { Link } from "react-router-dom";
import DatePickerForChart from "../component/options/datePickerForChart";
import moment from "moment";
import "../static/style-chartpage.css";
import API from "../api/apiAll";
const { Option } = Select;
const data = {
  labels: ["WEB", "APK"],
  datasets: [
    {
      data: [70, 50],
      backgroundColor: ["#FFD54F", "#FCAF18"],
      hoverBackgroundColor: ["#FFD54F", "#FCAF18"]
    }
  ]
};
const legendOpts = {
  display: false,
  position: "top",
  fullWidth: true,
  padding: "0px",
  responsive: false,
  maintainAspectRatio: false
};
class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  chartVndData = () => {
    const data = {
      labels: this.state.vndChartxAxis,
      datasets: [
        // {
        //   label: "Web",
        //   fill: false,
        //   backgroundColor: "rgba(75,192,192,0.4)",
        //   borderColor: "rgba(75,192,192,0.4)",
        //   borderWidth: 2,
        //   hoverBackgroundColor: "rgba(255,99,132,0.4)",
        //   hoverBorderColor: "rgba(255,99,132,1)",
        //   data: this.state.vndChartyAxisWeb
        // },
        // {
        //   label: "Apk",
        //   fill: false,
        //   backgroundColor: "#ffce56",
        //   borderColor: "#ffce56",
        //   borderWidth: 2,
        //   hoverBackgroundColor: "rgba(255,99,132,0.4)",
        //   hoverBorderColor: "rgba(255,99,132,1)",
        //   data: this.state.vndChartyAxisApk
        // },
        {
          label: "Total",
          fill: false,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,0.4)",
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
          // vndChartyAxisWeb: result.yAxis.WEB,
          // vndChartyAxisApk: result.yAxis.APK,
          vndChartyAxisTotal: result.yAxis.TOTAL
        })
      )
      .catch(function(error) {
        console.log("Request failed", error);
      });
  };
  componentDidMount() {
    this.getVndData(1);
    console.log(moment());
  }
  // function handleChange(value) {
  //   console.log(`selected ${value}`);
  // }
  render() {
    return (
      <>
        <Row className="main_content">
          <Col span={16} id="chart-frame">
            <div className="sum">
              <div>
                <span>Số người mua</span>
                <br />
                <span className="chart_title_value">12345K</span>
              </div>
              <div style={{ margin: "0 4rem" }}>
                <span>Lượt giao dịch</span>
                <br />
                <span className="chart_title_value">12345K</span>
              </div>
            </div>
            <div className="line_chart">
              <Line
                data={this.chartVndData}
                width={100}
                height={50}
                options={{
                  maintainAspectRatio: false
                }}
              />
            </div>
            <div className="chart-frame_footer">
              <Select
                defaultValue="jack"
                style={{ width: 120 }}
                // onChange={handleChange}
              >
                <Option value="jack">7 Ngày qua </Option>
                <Option value="lucy">Hôm nay</Option>
                <Option value="Yiminghe">Một tháng qua</Option>
                <Option value="random" onClick={this.showModal}>
                  Tùy chọn
                  {/* <DatePicker /> */}
                </Option>
              </Select>
              <Link to={API.HISTORY_PATHNAME + API.HISTORY_PATHSEARCH_DEFAULT}>
                CHI TIẾT GIAO DỊCH <Icon type="caret-right" />
              </Link>
              <DatePickerForChart/>
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
                <Pie
                  data={data}
                  width={100}
                  height={75}
                  legend={legendOpts}
                  // options={{
                  //   maintainAspectRatio: false
                  // }}
                />
              </div>
              <div className="card_footer">
                <Select
                  defaultValue="jack"
                  style={{ width: 120 }}
                  // onChange={handleChange}
                >
                  <Option value="jack">7 Ngày qua </Option>
                  <Option value="lucy">Hôm nay</Option>
                  <Option value="Yiminghe">Một tháng qua</Option>
                  <Option value="Yiminghe">Tùy chọn</Option>
                </Select>
                <Link
                  to={API.HISTORY_PATHNAME + API.HISTORY_PATHSEARCH_DEFAULT}
                >
                  CHI TIẾT GIAO DỊCH <Icon type="caret-right" />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default Charts;
