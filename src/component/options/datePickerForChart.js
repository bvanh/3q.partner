import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import API from "../../api/apiAll";
import { Icon, DatePicker, Input, Select } from "antd";
const { Option } = Select;

class DatePickerForChart extends React.Component {
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
  handleChange = elm => {
    console.log(elm);
  };
  demo = e => {
    console.log(e);
  };
  render() {
    const {
      startValue,
      startOpen,
      endValue,
      indexModalDatePicker
    } = this.state;
    const fromDateValue = moment(startValue).format("YYYY-MM-DD");
    const toDateValue = moment(endValue).format("YYYY-MM-DD");
    const { valueDateToday, valueDate7DayAgo, valueDate30DayAgo } = this.props;
    return (
      <>
        <Select defaultValue="2" style={{ width: 120 }}>
          <Option
            value="2"
            onClick={() =>
              this.props.getLineData(valueDate7DayAgo, valueDateToday)
            }
          >
            7 Ngày qua
          </Option>
          <Option
            value="3"
            onClick={() =>
            this.props.getLineData(valueDateToday, valueDateToday)
            }
          >
            Hôm nay
          </Option>
          <Option
            value="4"
            onClick={() =>
              this.props.getLineData(valueDate30DayAgo, valueDateToday)
            }
          >
            Một tháng qua
          </Option>
          <Option value="5" onClick={this.props.showModalPicker}>
            Tùy chọn
          </Option>
        </Select>
        <Link to={API.HISTORY_PATHNAME + API.HISTORY_PATHSEARCH_DEFAULT}>
          CHI TIẾT GIAO DỊCH <Icon type="caret-right" />
        </Link>
        <div className={this.props.indexModalDatePicker}>
          <DatePicker
            allowClear={false}
            disabledDate={this.disabledDate}
            format="YYYY-MM-DD"
            value={startValue}
            placeholder="Start"
            onChange={e => this.onStartChange(e, "startTime")}
            className="input_date_chart"
            open={this.props.startOpen}
            renderExtraFooter={() => (
              <div className="datepicker_footer">
                <span onClick={this.clearInputDate}>CLEAR</span>
                <span onClick={this.props.hideModalPicker}>CANCEL</span>
                <span
                  onClick={() =>
                    this.props.getLineData(fromDateValue, toDateValue)
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
      </>
    );
  }
}
export default DatePickerForChart;
