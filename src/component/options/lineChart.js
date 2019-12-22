import React from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { getDataLineChart, getTotalPerchase } from "../services/homeService";
import { Link } from "react-router-dom";
import API from "../../api/apiAll";
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
          backgroundColor: "#ff7b00",
          borderColor: "#ff7b00",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.vndChartyAxisWeb
        },
        {
          label: "APK",
          fill: false,
          backgroundColor: "#d9ff00",
          borderColor: "#d9ff00",
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
      totalPerchase,
      fromDate,
      toDate
    } = this.state;
    const fromDateValue = moment(startValue).format("YYYY-MM-DD");
    const toDateValue = moment(endValue).format("YYYY-MM-DD");
    const { valueDateToday, valueDate7DayAgo, valueDate30DayAgo } = this.props;
    return (
      <>
        <div className="sum">
          <div>
            <span>Số người mua</span>
            <br />
            <span className="chart_title_value">12345K</span>
          </div>
          <div style={{ margin: "0 4rem" }}>
            <span>Lượt giao dịch</span>
            <br />
            <span className="chart_title_value">{totalPerchase}</span>
          </div>
        </div>
        <div className="line_chart">
          <Line
            data={this.chartLineData}
            width={100}
            height={50}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>
        <div className="chart-frame_footer">
          <Select defaultValue="2" style={{ width: 120 }}>
            <Option
              value="2"
              onClick={() =>
                getDataLineChart(this, valueDate7DayAgo, valueDateToday)
              }
            >
              7 Ngày qua
            </Option>
            <Option
              value="3"
              onClick={() =>
                getDataLineChart(this, valueDateToday, valueDateToday)
              }
            >
              Hôm nay
            </Option>
            <Option
              value="4"
              onClick={() =>
                getDataLineChart(this, valueDate30DayAgo, valueDateToday)
              }
            >
              Một tháng qua
            </Option>
            <Option value="5" onClick={this.showModalPicker}>
              Tùy chọn
            </Option>
          </Select>
          <Link
            to={{
              pathname: API.HISTORY_PATHNAME,
              search:
                API.HISTORY_PATHSEARCH_NODATE +
                `&fromDate=${fromDate}&toDate=${toDate}`,
              state: { fromDate: fromDate, toDate: toDate }
            }}
          >
            CHI TIẾT GIAO DỊCH <Icon type="caret-right" />
          </Link>
          <div className={indexModalDatePicker}>
            <DatePicker
              allowClear={false}
              disabledDate={this.disabledDate}
              format="YYYY-MM-DD"
              value={startValue}
              placeholder="Start"
              onChange={e => this.onStartChange(e, "startTime")}
              className="input_date_chart"
              open={startOpen}
              renderExtraFooter={() => (
                <div className="datepicker_footer">
                  <span onClick={this.clearInputDate}>CLEAR</span>
                  <span onClick={this.hideModalPicker}>CANCEL</span>
                  <span
                    onClick={() =>
                      getDataLineChart(this, fromDateValue, toDateValue)
                    }
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
      </>
    );
  }
}
export default LineChart;
