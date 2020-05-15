import React from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { getDataLineChart } from "../services/homeService";
import { Link } from "react-router-dom";
import API from "../../api/apiAll";
import optionLine from './lineChartOptions'
import { Icon, DatePicker, Input, Select } from "antd";
const { Option } = Select;

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: null,
      endValue: null
    };
  }
  disabledDate = current => {
    const { startValue } = this.state;
    return (
      (current &&
        current <
          moment(startValue)
            .subtract(1, "days")
            .endOf("day")) ||
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
        startValue: value
      });
    } else {
      this.setState({
        endValue: value
      });
    }
  };
  onStartChange = value => {
    this.onChange("startValue", value);
  };
  clearInputDate = () => {
    this.setState({
      startValue: null,
      endValue: null
    });
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
        },
        {
          label: "WEB",
          fill: false,
          backgroundColor: "#ffd54f",
          borderColor: "#ffd54f",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.vndChartyAxisWeb
        },
        {
          label: "APK",
          fill: false,
          backgroundColor: "#fcaf18",
          borderColor: "#fcaf18",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.vndChartyAxisApk
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
  componentDidMount() {
    const { valueDateToday, valueDate7DayAgo } = this.props;
    getDataLineChart(this, valueDate7DayAgo, valueDateToday);
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
      toDate
    } = this.state;
    const fromDateValue = moment(startValue).format("YYYY-MM-DD");
    const toDateValue = moment(endValue).format("YYYY-MM-DD");
    const { valueDateToday, valueDate7DayAgo, valueDate30DayAgo } = this.props;
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
            <img
              src={this.props.imageLogo}
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
          <Select defaultValue="2" style={{ width: 120 }}>
          <Option
              value="3"
              onClick={() =>
                getDataLineChart(
                  this,
                  valueDateToday,
                  valueDateToday
                )
              }
            >
              Today
            </Option>
            <Option
              value="2"
              onClick={() =>
                getDataLineChart(this, valueDate7DayAgo, valueDateToday)
              }
            >
              Last 7 days
            </Option>
            <Option
              value="4"
              onClick={() =>
                getDataLineChart(
                  this,
                  valueDate30DayAgo,
                  valueDateToday
                )
              }
            >
              Last 30 days
            </Option>
            <Option value="5" onClick={this.showModalPicker}>
              Custom...
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
          <div className={indexModalDatePicker}>
            <DatePicker
              allowClear={false}
              disabledDate={this.disabledDate}
              format="YYYY-MM-DD"
              value={startValue}
              placeholder="StartDate"
              onChange={e => this.onStartChange(e, "startTime")}
              className="input_date_chart"
              open={startOpen}
              renderExtraFooter={() => (
                <div className="datepicker_footer">
                  <span onClick={this.clearInputDate}>CLEAR</span>
                  <span onClick={this.hideModalPicker}>CANCEL</span>
                  <span
                    onClick={() =>
                      getDataLineChart(
                        this,
                        fromDateValue,
                        toDateValue
                      )
                    }
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
export default LineChart;
