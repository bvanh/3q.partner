import React from "react";
import { Pie } from "react-chartjs-2";
import { Select, Icon, Row, Col } from "antd";
// import "chartjs-plugin-labels";
import { Link } from "react-router-dom";
import { getDataPieChart } from "../services/homeService";
import API from "../../api/apiAll";
import { listOptionsDates, dateValue } from "./datesInfo";
const { Option } = Select;

const legendOpts = {
  display: false,
  position: "top",
  fullWidth: true,
  padding: "0px",
  responsive: false,
  maintainAspectRatio: false,
};
class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: "",
      toDate: "",
      totalRevenue: 0,
      totalRevenueWEB: 0,
      totalRevenueAPK: 0,
      optionDates: "Last 7 days",
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
          hover: "none",
        },
      ],
    };
    return data;
  };
  changeOptionDates = (e) => {
    this.setState({
      optionDates: e,
    });
  };
  componentWillUpdate(nextProps, nextState) {
    const { partnerId } = nextProps;
    const { today, sevenDayAgo, thirtyDayAgo } = dateValue;
    const { startValue, endValue } = this.state;
    if (nextProps.partnerId !== this.props.partnerId) {
      switch (this.state.optionDates) {
        case "Today":
          getDataPieChart(this, today, today, partnerId);
          console.log("today");
          break;
        case "Last 7 days":
          getDataPieChart(this, sevenDayAgo, today, partnerId);
          console.log("7day");
          break;
        case "Last 30 days":
          getDataPieChart(this, thirtyDayAgo, today, partnerId);
          console.log("30");
          break;
        default:
          break;
      }
      console.log("run change partner id");
    } else {
      console.log("dr");
    }
  }
  componentDidMount() {
    const { partnerId } = this.props;
    const { today, sevenDayAgo } = dateValue;
    getDataPieChart(this, sevenDayAgo, today, partnerId);
  }
  render() {
    const { partnerId, userToken } = this.props;
    const { totalRevenue, fromDate, toDate, optionDates } = this.state;
    const printOptionDates = listOptionsDates.map((val, index) => (
      <Option
        value={val.dates}
        onClick={() =>
          getDataPieChart(this, val.valueDate, val.valueDateToday, partnerId)
        }
      >
        {val.dates}
      </Option>
    ));
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
                      precision: 0,
                    },
                  },
                }}
              />
            </div>
            <div className="card_footer">
              <Select
                value={optionDates}
                style={{ width: 120 }}
                onChange={this.changeOptionDates}
              >
                {printOptionDates}
              </Select>
              <Link
                to={{
                  pathname: API.HISTORY_PATHNAME,
                  search:
                    API.HISTORY_PATHSEARCH_NODATE +
                    `&fromDate=${fromDate}&toDate=${toDate}&data=${partnerId}`,
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
