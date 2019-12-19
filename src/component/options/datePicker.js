import React from "react";
import moment from "moment";
import { DatePicker } from "antd";
export default class DateRange extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false
  };
  disabledDate = current => {
    return current && current > moment().endOf("day");
  };
  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return (
      endValue.valueOf() <= startValue.valueOf() ||
      endValue > moment().endOf("day")
    );
  };
  onChange = async (field, value) => {
    await this.setState({
      [field]: value
    });
    console.log(value);
  };
  onStartChange = value => {
    this.onChange("startValue", value);
  };
  onEndChange = value => {
    this.onChange("endValue", value);
  };
  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };
  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };
  filterDate = async () => {
    const { startValue, endValue } = this.state;
    let startTime = moment(startValue).format("YYYY-MM-DD");
    let endTime = moment(endValue).format("YYYY-MM-DD");
    this.props.addDateData(startTime, endTime);
  };
  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div className="btn-checkdate">
        <DatePicker
          disabledDate={this.disabledDate}
          showTime
          format="YYYY-MM-DD"
          value={startValue}
          placeholder="StartTime"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
          className="input_date"
        />
        <span style={{padding:'.3rem'}}>To</span>
        <DatePicker
          disabledDate={this.disabledEndDate}
          showTime
          format="YYYY-MM-DD"
          value={endValue}
          placeholder="EndTime"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
          onOk={this.filterDate}
          separator={true}
          className="input_date"
        />
      </div>
    );
  }
}
