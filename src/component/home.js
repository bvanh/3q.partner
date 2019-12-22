import React from "react";
import { Col, Row} from "antd";
import LineChart from "./options/lineChart";
import PieChart from "./options/pieChart";
import moment from "moment";
import { getDataPieChart } from "./services/homeService";
import "../static/style-homepage.css";

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      startOpen: false,
      indexModalDatePicker: "modal_datepicker_hide"
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
            <PieChart
              valueDateToday={valueDateToday}
              valueDate7DayAgo={valueDate7DayAgo}
              valueDate30DayAgo={valueDate30DayAgo}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Charts;
