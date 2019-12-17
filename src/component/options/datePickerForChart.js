import React, { Component } from "react";
import moment from "moment";
import {
  Col,
  Row,
  Menu,
  Dropdown,
  Icon,
  Select,
  DatePicker,
  Modal,
  Input
} from "antd";

class DatePickerForChart extends Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    startOpen: true
  };
  disabledDate = current => {
    const { startValue } = this.state;
    return (
      // current > moment().endOf("day") &&
      (current &&
        current <
          moment(startValue)
            .subtract(1, "days")
            .endOf("day")) ||
      current > moment().endOf("day")
    );
  };
  // disabledStartDate = startValue => {
  //   const { endValue } = this.state;
  //   if (!startValue || !endValue) {
  //     return false;
  //   }
  //   return startValue.valueOf() > endValue.valueOf();
  // };

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

  onStartChange = (value, elm) => {
    this.onChange("startValue", value);
    console.log(elm, "onstartchange");
  };

  onEndChange = value => {
    this.onChange("endValue", value);
    console.log(value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };
  render() {
    const { startValue, endValue, endOpen, startOpen } = this.state;
    return (
      <div className="modal_datepicker">
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
            <div className='datepicker_footer'>
              <span>CLEAR</span> CANCEL <span>OK</span>
            </div>
          )}
        />
        <Input
        open={startOpen}
          value={this.endDate()}
      
          placeholder="EndDate"
          suffix={<Icon type="calendar" style={{ color: "#9e9e9e" }} />}
          style={{ width: "50%" }}
          className="input_date_chart"
        />
        {/* <DatePicker
          // disabledDate={this.disabledEndDate}
          //   showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={endValue}
          placeholder="End"
          //   onChange={e=>this.onStartChange(e,'endTime')}
          //   open={endOpen}
          //   onOpenChange={this.handleEndOpenChange}
          className="input_date_chart"
        /> */}
      </div>
    );
  }
}

export default DatePickerForChart;
