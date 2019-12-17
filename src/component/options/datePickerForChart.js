import React, { Component } from "react";
import {
    Col,
    Row,
    Menu,
    Dropdown,
    Icon,
    Select,
    DatePicker,
    Modal
  } from "antd";

class DatePickerForChart extends Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    startOpen:true
  };

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
    console.log(this.state.startValue,'gdgsg')
  };

  onStartChange = (value,elm) => {
    this.onChange("startValue", value);
    console.log(elm)
  };

  onEndChange = value => {
    this.onChange("endValue", value);
    console.log(value)
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
    const { startValue, endValue, endOpen,startOpen } = this.state;
    return (
      <div className="modal_datepicker">
        <DatePicker
          disabledDate={this.disabledStartDate}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={startValue}
          placeholder="Start"
          onChange={e=>this.onStartChange(e,'startTime')}
          onOpenChange={this.handleStartOpenChange}
          className="input_date"
          open={startOpen}
        />
        <DatePicker
          disabledDate={this.disabledEndDate}
        //   showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={endValue}
          placeholder="End"
        //   onChange={e=>this.onStartChange(e,'endTime')}
        //   open={endOpen}
        //   onOpenChange={this.handleEndOpenChange}
          className='input_date'
        />
      </div>
    );
  }
}

export default DatePickerForChart;
