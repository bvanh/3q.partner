import React from "react";
import { Col, Row, Select } from "antd";
import LineChart from "./lineChart";
import PieChart from "./pieChart";
import moment from "moment";
import imgTitle from "../../static/img/img_title.png";
import "../../static/style-homepage.css";
import { getListPartners } from '../services/homeService'
const { Option } = Select
class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      startOpen: false,
      indexModalDatePicker: "modal_datepicker_hide",
      totalPaidUsers: 0,
      listPartners: [],
      partnerId: "1BA3F861-D4F2-4D97-9F78-38633155EC27"
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
  handleChangePartner = (e) => {
    this.setState({partnerId:e})
  }
  componentDidMount() {
    getListPartners(this)
  }
 
  render() {
    const {partnerId}=this.state
    const valueDateToday = moment().format("YYYY-MM-DD");
    const valueDate7DayAgo = moment()
      .subtract(6, "days")
      .format("YYYY-MM-DD");
    const valueDate30DayAgo = moment()
      .subtract(29, "days")
      .format("YYYY-MM-DD");
    const printPartners = this.state.listPartners.map((val, index) => (
      <Option value={val.partnerId}>{val.fullName}</Option>
    ))
    // console.log(this.state)
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
                id="img_title"
              // style={{ width: "2rem", height: "2rem" }}
              ></img>
            </div>
          </Col>
          <Col xl={{ span: 16, order: 1 }} xs={{ span: 24, order: 2 }}>
            <Select value={partnerId} style={{ width: 120 }} onChange={(e)=>this.handleChangePartner(e)}>
              {printPartners}
            </Select>
            <LineChart
              valueDateToday={valueDateToday}
              valueDate7DayAgo={valueDate7DayAgo}
              valueDate30DayAgo={valueDate30DayAgo}
              imageLogo={this.props.imageLogo}
              logInOut={this.props.logInOut}
              partnerId={partnerId}
            />
          </Col>
          <Col xl={{ span: 8, order: 2 }} xs={{ span: 24, order: 1 }}>
            <PieChart
              valueDateToday={valueDateToday}
              valueDate7DayAgo={valueDate7DayAgo}
              valueDate30DayAgo={valueDate30DayAgo}
              logInOut={this.props.logInOut}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Charts;
