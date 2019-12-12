import React from "react";
import { Table, Input } from "antd";
import Type from "./options/type";
import fetch from "isomorphic-unfetch";
import { url } from "./api";
const { Search } = Input;
class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currentPage: 1,
      pageSize: 10,
      userToken: JSON.parse(this.props.userToken),
      type: 1,
      search: "",
      startTime: "2019-10-1",
      endTime: "2019-12-30"
    };
  }
  getData = (pathName, pathSearch) => {
    let userAccessToken = localStorage.getItem("user");
    fetch(url + pathName + pathSearch, {
      headers: {
        Authorization: `Bearer ${JSON.parse(userAccessToken).accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET"
    })
      .then(response => response.json())
      .then(result =>
        this.setState({
          data: result.rows
        })
      )
      .catch(function(error) {
        console.log("Request failed", error);
      });
  };
  componentDidMount() {
    console.log(this.props.location);
    this.getData(this.props.location.pathname, this.props.location.search);
  }
  handleMenuClick = async e => {
    const { type, startTime, endTime, search } = this.state;
    await this.setState({
      type: Number(e.key)
    });
    await this.props.history.replace(
      `/charges/list?currentPage=1&pageSize=10&search=${search}&type=${type}&fromDate=${startTime}&toDate=${endTime}`
    );
    this.getData(this.props.location.pathname, this.props.location.search);
    console.log(e);
  };
  filterDate = async (startDate, endDate, value) => {
    await this.setState({
      startTime: startDate,
      endTime: endDate,
      search: value
    });
    const { type, startTime, endTime, search } = this.state;
    await this.props.history.replace(
      `/charges/list?currentPage=1&pageSize=10&search=${search}&type=${type}&fromDate=${startTime}&toDate=${endTime}`
    );
    this.getData(
      this.props.location.pathname,
      this.props.location.search
    );
  };
  // filterPartnerId=(value)=>{
  //   const {type, startTime, endTime, search } = this.state;
  //   this.setState({
  //     search:value
  //   });
  //   await this.props.history.replace(
  //     `/charges/list?currentPage=1&pageSize=10&search=${search}&type=${type}&fromDate=${startTime}&toDate=${endTime}`
  //   );
  //   await this.getData(
  //     this.props.location.pathname,
  //     this.props.location.search
  //   );
  // }
  render() {
    const columns = [
      {
        title: "PartnerChargeId",
        dataIndex: "partnerChargeId",
        key: "partnerChargeId",
        width: "25%"
      },
      {
        title: "ProductId",
        dataIndex: "productId",
        key: "productId",
        width: "20%"
      },
      {
        title: "UserId",
        dataIndex: "userId",
        key: "userId",
        width: "20%"
      },
      {
        title: "Coin",
        dataIndex: "coin",
        key: "coin",
        width: "5%"
      },
      ,
      {
        title: "Value",
        dataIndex: "vnd",
        key: "vnd",
        width: "10%",
        render: price => <span>{price.toLocaleString()} đ</span>
      },
      {
        title: "CreateAt",
        dataIndex: "createAt",
        key: "createAt",
        width: "20%"
      }
    ];
    // let total = 0;
    // for (let i = 0; i < data.length; i++) {
    //   total += data[i].value;
    // }
    const { data, startTime, endTime } = this.state;
    return (
      <>
        {/* <span>Total: {total} </span> */}
        <div className="btn-check">
          <Type
            handleMenuClick={this.handleMenuClick}
            filterDate={this.filterDate}
          />
          <Search
            placeholder="Search..."
            onSearch={value=>this.filterDate(startTime,endTime,value)}
            enterButton
          />
        </div>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={record => record.partnerChargeId}
        />
      </>
    );
  }
}

export default History;
