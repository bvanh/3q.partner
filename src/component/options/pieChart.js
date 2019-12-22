import React from "react";
import { Pie } from "react-chartjs-2";
import { Select, Icon } from "antd";
import "chartjs-plugin-labels";
import { Link } from "react-router-dom";
import { getDataPieChart } from "../services/homeService";
import API from "../../api/apiAll";
const { Option } = Select;

const legendOpts = {
  display: false,
  position: "top",
  fullWidth: true,
  padding: "0px",
  responsive: false,
  maintainAspectRatio: false
};
class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: "",
      toDate: "",
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
    const { valueDateToday, valueDate7DayAgo } = this.props;
    getDataPieChart(this, valueDate7DayAgo, valueDateToday);
  }
  render() {
    const { valueDateToday, valueDate7DayAgo, valueDate30DayAgo } = this.props;
    const { totalRevenue, fromDate, toDate } = this.state;
    return (
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
            to={{
              pathname: API.HISTORY_PATHNAME,
              search: API.HISTORY_PATHSEARCH_NODATE+`&fromDate=${fromDate}&toDate=${toDate}`,
              state: { fromDate: fromDate,toDate:toDate }
            }}
          >
            CHI TIẾT GIAO DỊCH <Icon type="caret-right" />
          </Link>
        </div>
      </div>
    );
  }
}

export default PieChart;
