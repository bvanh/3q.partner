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
  onChange = async (field, value) => {
    await this.setState({
      [field]: value
    });
    // console.log(this.state.endValue.toISOString().slice(0, 10));
    // this.props.handleMenuClick(this.state.startValue, this.state.endValue);
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
    let startTime = await this.state.startValue.toISOString().slice(0, 10);
    let endTime = await this.state.endValue.toISOString().slice(0, 10);
    this.props.filterDate(startTime, endTime,'');
  };
  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div>
        <DatePicker
          disabledDate={this.disabledDate}
          showTime
          format="YYYY-MM-DD"
          value={startValue}
          placeholder="Start"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        <DatePicker
          disabledDate={this.disabledDate}
          showTime
          format="YYYY-MM-DD"
          value={endValue}
          placeholder="End"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
          onOk={this.filterDate}
        />
      </div>
    );
  }
}
