import React from "react";
import { Pie } from "react-chartjs-2";
import { Select, Icon, Row, Col } from "antd";
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
    const { valueDateToday, valueDate7DayAgo, userToken } = this.props;
    getDataPieChart(this, userToken, valueDate7DayAgo, valueDateToday);
  }
  render() {
    const {
      valueDateToday,
      valueDate7DayAgo,
      valueDate30DayAgo,
      userToken
    } = this.props;
    const { totalRevenue, fromDate, toDate } = this.state;
    return (
      <div className="card">
        <Row>
          <Col md={{ span: 8, order: 1 }} xl={{ span: 24, order: 1 }}>
            <div className="card_title">
              <p>TOTAL</p>
              <p id="value">{totalRevenue.toLocaleString()}</p>
              <p>VNĐ</p>
            </div>
          </Col>
          <Col md={{ span: 16, order: 2 }} xl={{ span: 24, order: 2 }}>
            <div className="card_content">
              <div className="tag-pie_chart">
                <p style={{ margin: "0" }}>PLATFORM</p>
                <div>
                  <div id="tag_pie_chart1"></div>
                  <span style={{ margin: "0 .5rem 0 0" }}>APK</span>
                  <div id="tag_pie_chart2"></div>WEB
                </div>
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
                  Last 7 days{" "}
                </Option>
                <Option
                  value="2"
                  onClick={() =>
                    getDataPieChart(
                      this,

                      valueDateToday,
                      valueDateToday
                    )
                  }
                >
                  Today
                </Option>
                <Option
                  value="3"
                  onClick={() =>
                    getDataPieChart(
                      this,

                      valueDate30DayAgo,
                      valueDateToday
                    )
                  }
                >
                  Last 30 days
                </Option>
              </Select>
              <Link
                to={{
                  pathname: API.HISTORY_PATHNAME,
                  search:
                    API.HISTORY_PATHSEARCH_NODATE +
                    `&fromDate=${fromDate}&toDate=${toDate}`
                }}
              >
                MORE INSIGHTS <Icon type="caret-right" />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PieChart;
