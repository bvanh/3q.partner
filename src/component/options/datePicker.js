import React from "react";
import moment from "moment";
import { DatePicker } from "antd";
export default class DateRange extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false
  };
  disabledDate2 = current => {
    // or (if it's a class method)
    //disabledDate = (current) => {
    let start = "2018-01-01";
    let end = "2019-01-01";
    if (current < moment(start)) {
      return true;
    } else if (current > moment(end)) {
      return true;
    } else {
      return false;
    }
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
    this.props.filterDate(startTime, endTime, "");
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
          className='input_date'
        />
        <DatePicker
          disabledDate={this.disabledDate}
          showTime
          format="YYYY-MM-DD"
          value={endValue}
          placeholder="EndTime"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
          onOk={this.filterDate}
          separator={true}
          className='input_date'
          
        />
        {/* <RangePicker
          disabledDate={this.disabledDate2}
          // defaultValue={[moment("2015/01/01"), moment("2015/01/01")]}
          format="YYYY-MM-DD"
          ranges={{
            Today: [moment(), moment()]
          }}
          showTime
          format="YYYY/MM/DD"
          // onChange={onChange}
        /> */}
      </div>
    );
  }
}
