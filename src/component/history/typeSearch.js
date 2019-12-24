import React from "react";
import moment from "moment";
import { DatePicker, Select, Input } from "antd";
const { Option } = Select;
export default class TypeSearch extends React.Component {
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
      <>
        <div className="btn_checksearch">
          <Input
            className="input_search"
            placeholder="Search by products, name, etc..."
            onChange={this.props.addTextSearch}
          />
          <Select
            defaultValue="0"
            onChange={this.props.addTypeData}
            className="btn-checktype"
          >
            <Option value="0"> All</Option>
            <Option value="1"> Partner_charge_ID</Option>
            <Option value="2">User_ID</Option>
            <Option value="3">Product_ID</Option>
          </Select>
          <Select
            defaultValue="4"
            onChange={this.props.addUserTypeData}
            className="btn-checktype checkusertype"
          >
            <Option value="4">TYPE</Option>
            <Option value="0">ALL</Option>
            <Option value="1">TEST</Option>
            <Option value="2">LIVE</Option>
          </Select>
        </div>
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
          <span style={{ padding: ".3rem" }} id="toDate">
            To
          </span>
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
      </>
    );
  }
}
