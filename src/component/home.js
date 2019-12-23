import React from "react";
import { Col, Row } from "antd";
import LineChart from "./options/lineChart";
import PieChart from "./options/pieChart";
import moment from "moment";
import imgTitle from "../static/img/img_title.png";
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
        <Row
          className="main_content"
          type="flex"
          gutter={[16, 8]}
          justify="space-around"
        >
          <Col span={24}>
            <div className="title_dashboard">
              <div className="title_dashboard_text">
                <h2>Welcome back Clappigames dashboard!</h2>
                <p>
                  We support to follow C.coin revenue form Clappigame Platform!
                </p>
                <p>Keep it up!</p>
              </div>
              
                <img
                  src={imgTitle}
                  alt="img_title"
                  id='img_title'
                  // style={{ width: "2rem", height: "2rem" }}
                ></img>
            </div>
          </Col>
          <Col xl={{ span: 16, order: 1 }} xs={{ span: 24, order: 2 }}>
            <LineChart
              valueDateToday={valueDateToday}
              valueDate7DayAgo={valueDate7DayAgo}
              valueDate30DayAgo={valueDate30DayAgo}
              imageLogo={this.props.imageLogo}
            />
          </Col>
          <Col xl={{ span: 8, order: 2 }} xs={{ span: 24, order: 1 }}>
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
