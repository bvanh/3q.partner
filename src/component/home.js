import React from "react";
import { Pie, Line } from "react-chartjs-2";
import "chartjs-plugin-labels";
import { Col, Row, Icon, Select } from "antd";
import { Link } from "react-router-dom";
import LineChart from "./options/lineChart";
import moment from "moment";
import { getDataPieChart } from "./services/homeService";
import { demo } from "./services/homeService";
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
// const demo = getPieData;
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
  componentDidMount() {
    getDataPieChart(this, "2019-10-17", "2019-10-25");
  }
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
            <LineChart
              valueDateToday={valueDateToday}
              valueDate7DayAgo={valueDate7DayAgo}
              valueDate30DayAgo={valueDate30DayAgo}
            />
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
                      getDataPieChart(this, valueDate7DayAgo, valueDateToday)
                    }
                  >
                    7 Ngày qua{" "}
                  </Option>
                  <Option
                    value="2"
                    onClick={() =>
                      getDataPieChart(this, valueDateToday, valueDateToday)
                    }
                  >
                    Hôm nay
                  </Option>
                  <Option
                    value="3"
                    onClick={() =>
                      getDataPieChart(this, valueDate30DayAgo, valueDateToday)
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
