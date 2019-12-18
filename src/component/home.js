import React from "react";
import { Pie, Line } from "react-chartjs-2";
import "chartjs-plugin-labels";
import { Col, Row, Icon, Select } from "antd";
import { Link } from "react-router-dom";
import DatePickerForChart from "./options/datePickerForChart";
import moment from "moment";
import getPieData2 from "./services/homepageService";
import "../static/style-homepage.css";
import API from "../api/apiAll";
const { Option } = Select;
const legendOpts = {
  display: false,
  position: "top",
  fullWidth: true,
  padding: "0px",
  responsive: false,
  maintainAspectRatio: false
};
const styles = {
  container: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#43a1c9"
  }
};
class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      startOpen: false,
      indexModalDatePicker: "modal_datepicker_hide",
      totalRevenue: 0,
      totalRevenueWEB: 0,
      totalRevenueAPK: 0
    };
  }
  chartPieData = () => {
    const { totalRevenueAPK, totalRevenueWEB } = this.state;
    const data = {
      labels: ["WEB", "APK"],
      datasets: [
        {
          data: [totalRevenueWEB, totalRevenueAPK],
          backgroundColor: ["#FFD54F", "#FCAF18"],
          hover: "none"
        }
      ]
    };
    return data;
  };
  chartLineData = () => {
    const data = {
      labels: this.state.vndChartxAxis,
      datasets: [
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
  getPieData = (fromDateValue, toDateValue) => {
    let userAccessToken = localStorage.getItem("user");
    fetch(
      API.ROOT_URL +
        API.CHARTS_PATHNAME +
        API.CHARTS_PATHSEARCH_TYPE +
        `&fromDate=${fromDateValue}&toDate=${toDateValue}`,
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
          totalRevenueWEB: result.yAxis.WEB.reduce((x, y) => x + y),
          totalRevenueAPK: result.yAxis.APK.reduce((x, y) => x + y),
          totalRevenue: result.yAxis.TOTAL.reduce((x, y) => x + y)
        })
      )
      .catch(function(error) {
        console.log("Request failed", error);
      });
  };
  getLineData = (fromDateValue, toDateValue) => {
    let userAccessToken = localStorage.getItem("user");
    fetch(
      API.ROOT_URL +
        API.CHARTS_PATHNAME +
        API.CHARTS_PATHSEARCH_TYPE +
        `&fromDate=${fromDateValue}&toDate=${toDateValue}`,
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
          vndChartyAxisTotal: result.yAxis.TOTAL
        })
      )
      .catch(function(error) {
        console.log("Request failed", error);
      });
    this.hideModalPicker();
  };
  componentDidMount() {
    this.getLineData("2019-10-17", "2019-10-25");
    this.getPieData("2019-10-17", "2019-10-25");
    let a = getPieData2("2019-10-17", "2019-10-25");
    console.log(a);
  }
  // function handleChange(value) {
  //   console.log(`selected ${value}`);
  // }
  // hideModalPicker = elm => {
  //   console.log(elm);
  // };
  showModalPicker = () => {
    this.setState({
      indexModalDatePicker: "modal_datepicker",
      startOpen: true
    });
  };
  hideModalPicker = async () => {
    await this.setState({
      startOpen: false
    });
    this.setState({
      indexModalDatePicker: "modal_datepicker_hide"
    });
  };
  render() {
    const { startOpen, indexModalDatePicker, totalRevenue } = this.state;
    const valueDateToday = moment().format("YYYY-MM-DD");
    const valueDate7DayAgo = moment()
      .subtract(7, "days")
      .format("YYYY-MM-DD");
    const valueDate30DayAgo = moment()
      .subtract(30, "days")
      .format("YYYY-MM-DD");
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
                data={this.chartLineData}
                width={100}
                height={50}
                options={{
                  maintainAspectRatio: false
                }}
              />
            </div>
            <div className="chart-frame_footer">
              <DatePickerForChart
                getLineData={this.getLineData}
                startOpen={startOpen}
                indexModalDatePicker={indexModalDatePicker}
                hideModalPicker={this.hideModalPicker}
                showModalPicker={this.showModalPicker}
                valueDateToday={valueDateToday}
                valueDate7DayAgo={valueDate7DayAgo}
                valueDate30DayAgo={valueDate30DayAgo}
              />
            </div>
          </Col>
          <Col span={8}>
            <div className="card">
              <div className="card_title">
                <p>TỔNG DOANH THU</p>
                <p id="value">{totalRevenue.toLocaleString()}</p>
                <p>VNĐ</p>
              </div>
              <div className="card_content">
                <p style={{ margin: "0" }}>NGUỒN</p>
                <div className="tag-pie_chart">
                  <div id="tag_pie_chart1"></div>
                  <span style={{ margin: "0 .5rem 0 0" }}>APK</span>
                  <div id="tag_pie_chart2"></div>WEB
                </div>

                <Pie
                  data={this.chartPieData}
                  width={100}
                  height={75}
                  legend={legendOpts}
                  options={{
                    tooltips: { enabled: false },
                    hover: { mode: null },
                    plugins: {
                      labels: {
                        render: "percentage",
                        fontColor: ["black", "white"],
                        precision: 0
                      }
                    }
                  }}
                />
              </div>
              <div className="card_footer">
                <Select
                  defaultValue="1"
                  style={{ width: 120 }}
                  // onChange={handleChange}
                >
                  <Option
                    value="1"
                    onClick={() =>
                      this.getPieData(valueDate7DayAgo, valueDate30DayAgo)
                    }
                  >
                    7 Ngày qua{" "}
                  </Option>
                  <Option
                    value="2"
                    onClick={() =>
                      this.getPieData(valueDateToday, valueDateToday)
                    }
                  >
                    Hôm nay
                  </Option>
                  <Option
                    value="3"
                    onClick={() =>
                      this.getPieData(valueDate30DayAgo, valueDate30DayAgo)
                    }
                  >
                    Một tháng qua
                  </Option>
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
