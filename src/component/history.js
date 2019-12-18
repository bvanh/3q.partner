import React from "react";
import { Table, Input, Pagination, Button } from "antd";
import Type from "./options/type";
import fetch from "isomorphic-unfetch";
import { Link } from "react-router-dom";
import { getDataPieChart } from "./services/homeService";
import "../static/style-history.css";
import API from "../api/apiAll";
const { Search } = Input;
class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      totalRevenue: 0,
      totalRevenueWEB: 0,
      totalRevenueAPK:0,
      totalItem: null,
      currentPage: 1,
      pageSize: 10,
      userToken: JSON.parse(this.props.userToken),
      type: 1,
      search: "",
      startTime: "2019-10-1",
      endTime: "2019-12-30"
    };
  }
  getData = pathSearch => {
    let userAccessToken = localStorage.getItem("userAccessToken");
    fetch(API.ROOT_URL + API.HISTORY_PATHNAME + pathSearch, {
      headers: {
        Authorization: `Bearer ${JSON.parse(userAccessToken)}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET"
    })
      .then(response => response.json())
      .then(result =>
        this.setState({
          data: result.rows,
          totalItem: result.count
        })
      )
      .catch(function(error) {
        console.log("Request failed", error);
      });
  };
  componentDidMount() {
    const { startTime, endTime } = this.state;
    this.getData(this.props.location.search);
    getDataPieChart(this, '2019-10-17', "2019-10-25");
  }
  handleMenuClick = async e => {
    const { type, startTime, endTime, search } = this.state;
    await this.setState({
      type: Number(e.key)
    });
    await this.props.history.replace(
      `${API.HISTORY_PATHNAME}?currentPage=1&pageSize=10&search=${search}&type=${type}&fromDate=${startTime}&toDate=${endTime}`
    );
    this.getData(this.props.location.search);
  };
  filterDateAndText = async (startDate, endDate, value) => {
    await this.setState({
      startTime: startDate,
      endTime: endDate,
      search: value
    });
    const { type, startTime, endTime, search, currentPage } = this.state;
    await this.props.history.replace(
      `${API.HISTORY_PATHNAME}?currentPage=${currentPage}&pageSize=10&search=${search}&type=${type}&fromDate=${startTime}&toDate=${endTime}`
    );
    this.getData(this.props.location.search);
  };
  goPage = async page => {
    await this.setState({
      currentPage: page
    });
    const { type, startTime, endTime, search, currentPage } = this.state;
    await this.props.history.replace(
      `${API.HISTORY_PATHNAME}?currentPage=${currentPage}&pageSize=10&search=${search}&type=${type}&fromDate=${startTime}&toDate=${endTime}`
    );
    this.getData(this.props.location.search);
  };
  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: record => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name
      })
    };
    const columns = [
      {
        title: "PartnerChargeId",
        dataIndex: "partnerChargeId",
        key: "partnerChargeId",
        width: "25%",
        // render:<Link to >``</Link>
        render: ChargeId => (
          <Link to={API.HISTORY_DETAIL_PATHNAME + "?chargeId=" + ChargeId}>
            {ChargeId}
          </Link>
        )
      },
      {
        title: "UserID",
        dataIndex: "userId",
        key: "userId",
        width: "20%"
      },
      {
        title: "Time",
        dataIndex: "createdAt",
        key: "createAt",
        width: "13%"
      },
      {
        title: "Username",
        dataIndex: "payload",
        key: "productId",
        width: "13%",
        render: index => JSON.parse(index).gameUserName
      },
      {
        title: "Source",
        dataIndex: "os",
        key: "os",
        width: "10%"
      },
      {
        title: "C.coin",
        dataIndex: "coin",
        key: "coin",
        width: "7%"
      },
      ,
      {
        title: "VNĐ",
        dataIndex: "vnd",
        key: "vnd",
        width: "12%",
        render: price => <span>{price.toLocaleString()} đ</span>
      }
    ];
    const { data, startTime, endTime, totalItem, totalRevenue } = this.state;
    return (
      <div className="history_container">
        {/* <span>Total: {total} </span> */}
        <div className="btn-check">
          <Search
            className="input_search"
            placeholder="Search..."
            onSearch={value =>
              this.filterDateAndText(startTime, endTime, value)
            }
          />
          <Type
            handleMenuClick={this.handleMenuClick}
            filterDate={this.filterDate}
          />
          <Button id="btn_search">SEARCH</Button>
        </div>
        <div className="table_sum">
          <div>
            <span style={{ padding: "0 2rem 0 0" }}>
              Tổng doanh thu:
              <span style={{ fontSize: "1.1rem", color: "#0085ff",paddingLeft:'.5rem' }}>
              {totalRevenue.toLocaleString()} VNĐ
              </span>
            </span>
            <span>
              Lượt giao dịch:{" "}
              <span style={{ fontSize: "1.1rem", color: "#0085ff" }}>123</span>
            </span>
          </div>
          <Button icon="file-excel">Export Excel</Button>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          rowKey={record => record.partnerChargeId}
          pagination={false}
          bordered
        />
        <Pagination
          defaultCurrent={1}
          total={totalItem}
          size="small"
          onChange={this.goPage}
        />
        <Button type="primary" icon="caret-left">
          <Link to="/" style={{ color: "white" }}>
            Back
          </Link>
        </Button>
      </div>
    );
  }
}

export default History;
