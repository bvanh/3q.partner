import React, { useMemo } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import { getDataChart, getListPartners } from "../services/homeService";
import { Link } from "react-router-dom";
import API from "../../api/api";
import optionLine from "./lineChartOptions";
import { listOptionsDates, dateValue } from "./datesInfo";
import { Icon, DatePicker, Input, Select } from "antd";
const { Option } = Select;

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: null,
      endValue: null,
      optionDates: "Last 7 days",
      partnerId: props.partnerId,
    };
  }
  disabledDate = (current) => {
    const { startValue } = this.state;
    return (
      (current &&
        current < moment(startValue).subtract(1, "days").endOf("day")) ||
      current > moment().endOf("day")
    );
  };
  endDate = () => {
    const { endValue } = this.state;
    if (endValue === null) {
      return null;
    } else {
      let newEndDate = moment(endValue).format("YYYY-MM-DD");
      return newEndDate;
    }
  };
  onChange = (field, value) => {
    const { startValue } = this.state;
    if (startValue === null) {
      this.setState({
        startValue: value,
      });
    } else {
      this.setState({
        endValue: value,
      });
    }
  };
  onStartChange = (value) => {
    this.onChange("startValue", value);
  };
  clearInputDate = () => {
    this.setState({
      startValue: null,
      endValue: null,
    });
  };
  chartLineData = () => {
    const data = {
      labels: this.state.vndChartxAxis,
      datasets: [
        {
          label: "WEB",
          fill: false,
          backgroundColor: "#ffd54f",
          borderColor: "#ffd54f",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.vndChartyAxisWeb,
        },
        {
          label: "APK",
          fill: false,
          backgroundColor: "#fcaf18",
          borderColor: "#fcaf18",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.vndChartyAxisApk,
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
  changeOptionDates = (e) => {
    this.setState({
      optionDates: e,
    });
  };
  componentWillUpdate(nextProps, nextState) {
    const { partnerId } = nextProps;
    const { today, sevenDayAgo, thirtyDayAgo } = dateValue;
    const { startValue, endValue } = this.state;
    const fromDateValue = moment(startValue).format("YYYY-MM-DD");
    const toDateValue = moment(endValue).format("YYYY-MM-DD");
    if (partnerId !== this.props.partnerId) {
      switch (this.state.optionDates) {
        case "Today":
          getDataChart(this, "LINE_CHART", true, today, today, partnerId);
          // console.log("today");
          break;
        case "Last 7 days":
          getDataChart(
            this,
            "LINE_CHART",
            false,
            sevenDayAgo,
            today,
            partnerId
          );
          // console.log("7day");
          break;
        case "Last 30 days":
          getDataChart(
            this,
            "LINE_CHART",
            false,
            thirtyDayAgo,
            today,
            partnerId
          );
          // console.log("30");
          break;
        case "customDates":
          getDataChart(
            this,
            "LINE_CHART",
            false,
            fromDateValue,
            toDateValue,
            partnerId
          );
          break;
        default:
          break;
      }
    } else {
      // console.log("dr");
    }
  }
  componentDidMount() {
    const { partnerId } = this.props;
    const { today, sevenDayAgo } = dateValue;
    getDataChart(this, "LINE_CHART", false, sevenDayAgo, today, partnerId);
    this.hideModalPicker();
  }
  render() {
    const {
      startValue,
      startOpen,
      endValue,
      indexModalDatePicker,
      totalPurchase,
      totalPaidUsers,
      fromDate,
      toDate,
      optionDates,
    } = this.state;
    const { partnerId, logoPartner, listPartners } = this.props;
    const fromDateValue = moment(startValue).format("YYYY-MM-DD");
    const toDateValue = moment(endValue).format("YYYY-MM-DD");
    const printOptionDates = listOptionsDates.map((val, index) => (
      <Option
        value={val.dates}
        onClick={() =>
          getDataChart(
            this,
            "LINE_CHART",
            false,
            val.valueDate,
            val.valueDateToday,
            partnerId
          )
        }
      >
        {val.dates}
      </Option>
    ));
    return (
      <div id="chart-frame">
        <div className="sum">
          <div>
            <div style={{ paddingRight: "3rem" }}>
              <span>Users Purchase</span>
              <br />
              <span className="chart_title_value">{totalPaidUsers}</span>
            </div>
            <div>
              <span>Purchase</span>
              <br />
              <span className="chart_title_value">{totalPurchase}</span>
            </div>
          </div>
          <div id="logo_title">
            <Select
              value={`{"partnerId":"${partnerId}","imageUrl":"${logoPartner}"}`}
              style={{ width: 120 }}
              onChange={(e) => this.props.handleChangePartner(e)}
              className={
                listPartners.length === 0
                  ? "hideOptionPartner"
                  : "showOptionPartner"
              }
            >
              {this.props.printPartners}
            </Select>
            <img
              src={
                logoPartner === "null"
                  ? "https://cms.cubegame.vn/static/uploads/partner/c-coin.png"
                  : logoPartner
              }
              alt="logo_clappigames"
              style={{ width: "2rem", height: "2rem" }}
            ></img>
          </div>
        </div>
        <div className="line_chart">
          <Line
            data={this.chartLineData}
            width={100}
            height={50}
            options={optionLine}
          />
        </div>
        <div className="chart-frame_footer">
          <Select
            value={optionDates}
            style={{ width: 120 }}
            onChange={this.changeOptionDates}
          >
            {printOptionDates}
            <Option value="customDates" onClick={this.showModalPicker}>
              Custom...
            </Option>
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
          <div className={indexModalDatePicker}>
            <DatePicker
              allowClear={false}
              disabledDate={this.disabledDate}
              format="YYYY-MM-DD"
              value={startValue}
              placeholder="StartDate"
              onChange={(e) => this.onStartChange(e, "startTime")}
              className="input_date_chart"
              open={startOpen}
              renderExtraFooter={() => (
                <div className="datepicker_footer">
                  <span onClick={this.clearInputDate}>CLEAR</span>
                  <span onClick={this.hideModalPicker}>CANCEL</span>
                  <span
                    onClick={() => {
                      getDataChart(
                        this,
                        "LINE_CHART",
                        false,
                        fromDateValue,
                        toDateValue,
                        partnerId
                      );
                      this.hideModalPicker();
                    }}
                    style={{ color: "#0085ff" }}
                  >
                    APPLY
                  </span>
                </div>
              )}
            />
            <Input
              open={startOpen}
              value={this.endDate()}
              placeholder="EndDate"
              suffix={<Icon type="calendar" style={{ color: "#9e9e9e" }} />}
              className="input_date_chart"
            />
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    partnerId: state.partnerId,
    logoPartner: state.logoPartner,
    listPartners: state.listPartner,
    // : state.,
  };
}
export default connect(mapStateToProps, null)(LineChart);
