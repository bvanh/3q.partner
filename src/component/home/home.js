import React from "react";
import { Col, Row, Select } from "antd";
import LineChart from "./lineChart";
import PieChart from "./pieChart";
import moment from "moment";
import { connect } from 'react-redux'
import imgTitle from "../../static/img/img_title.png";
import "../../static/style-homepage.css";
import { getListPartners } from "../services/homeService";
import { dispatchSetPartner, dispatchSetPartnerLogo } from '../../redux/actions/index'
const { Option } = Select;
class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      startOpen: false,
      indexModalDatePicker: "modal_datepicker_hide",
      totalPaidUsers: 0,
      listPartners: [],
      partnerId: "",
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
  showModalPicker = () => {
    this.setState({
      indexModalDatePicker: "modal_datepicker",
      startOpen: true,
    });
  };
  hideModalPicker = async () => {
    await this.setState({
      startOpen: false,
    });
    this.setState({
      indexModalDatePicker: "modal_datepicker_hide",
    });
  };
  handleChangePartner = (e) => {
    const convertValue = JSON.parse(e)
    this.setState({ partnerId: convertValue.partnerId });
    dispatchSetPartner(convertValue.partnerId)
    dispatchSetPartnerLogo(convertValue.imageUrl);
  };
  componentWillMount() {
    getListPartners(this);
  }
  render() {
    const { listPartners } = this.state;
    const printPartners = this.props.listPartners.map((val, index) => (
      <Option value={`{"partnerId":"${val.partnerId}","imageUrl":"${val.imageUrl}"}`}>{val.fullName}</Option>
    ));
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
            {/* <Select
              value={partnerId}
              style={{ width: 120 }}
              onChange={(e) => this.handleChangePartner(e)}
            >
              {printPartners}
            </Select> */}
            <LineChart
              imageLogo={this.props.imageLogo}
              logInOut={this.props.logInOut}
              printPartners={printPartners}
              handleChangePartner={this.handleChangePartner}
            />
          </Col>
          <Col xl={{ span: 8, order: 2 }} xs={{ span: 24, order: 1 }}>
            <PieChart
              logInOut={this.props.logInOut}
            // partnerId={partnerId}
            />
          </Col>
        </Row>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    listPartners: state.listPartner
  };
}
export default connect(mapStateToProps, null)(Charts);

