import React from "react";
import { Table, Pagination, Button, Menu, Dropdown, Icon } from "antd";
import TypeSearch from "./typeSearch";
import { Link } from "react-router-dom";
import moment from "moment";
import errorAlert from "../../utils/errorAlert";
import ReactExport from "react-export-excel";
import { getDataPieChart } from "../services/homeService";
import "../../static/style-history.css";
import API from "../../api/apiAll";
import { getData, getDataAll } from "../services/historyService";
import moreitem from "../../static/img/more_item.png";
import Logo from "../../static/img/Logo.png";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataExport: [],
      statusBtnExport: true,
      totalRevenue: 0,
      totalRevenueWEB: 0,
      totalRevenueAPK: 0,
      username: null,
      totalItem: 0,
      currentPage: 1,
      pageSize: 10,
      type: 0,
      search: "",
      fromDate: "",
      toDate: "",
      dataAll: 0
    };
  }
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    getData(this, this.props.location.search);
    const demo = getDataPieChart(this, query.get("fromDate"), query.get("toDate"));
  }
  goPage = async page => {
    await this.setState({
      currentPage: page
    });
    const { type, fromDate, toDate, search, currentPage } = this.state;
    await this.props.history.replace(
      `${API.HISTORY_PATHNAME}?currentPage=${currentPage}&pageSize=10&search=${search}&type=${type}&fromDate=${fromDate}&toDate=${toDate}`
    );
    getData(this, this.props.location.search);
  };
  addTypeData = val => {
    this.setState({
      type: val
    });
  };
  addDateData = (startDate, endDate) => {
    this.setState({
      fromDate: startDate,
      toDate: endDate
    });
  };
  addTextSearch = e => {
    this.setState({
      search: e.target.value
    });
  };
  searchData = async () => {
    const {
      type,
      fromDate,
      toDate,
      search,
      currentPage,
    } = this.state;
    const fromDayValue = moment(fromDate).valueOf();
    const toDayValue = moment(toDate).valueOf();
    if (toDayValue - fromDayValue <= 2592000000) {
      await this.props.history.replace(
        `${API.HISTORY_PATHNAME}?currentPage=${currentPage}&pageSize=10&search=${search}&type=${type}&fromDate=${fromDate}&toDate=${toDate}`
      );
      getData(this, this.props.location.search);
      getDataPieChart(this, fromDate, toDate);
    } else {
      errorAlert("Alert", "Between 2 dates bigger than 31 days!");
    }
  };
  menu = (
    <Menu onClick={key => this.changePageSize(key)}>
      <b>Show up to</b>
      <Menu.Item key="10">10 Purchase</Menu.Item>
      <Menu.Item key="25">25 Purchase</Menu.Item>
      <Menu.Item key="50">50 Purchase</Menu.Item>
    </Menu>
  );


  changePageSize = async val => {
    await this.setState({
      pageSize: Number(val.key)
    });
    const {
      type,
      fromDate,
      toDate,
      search,
      currentPage,
      pageSize,

    } = this.state;
    await this.props.history.replace(
      `${API.HISTORY_PATHNAME}?currentPage=${currentPage}&pageSize=${pageSize}&search=${search}&type=${type}&fromDate=${fromDate}&toDate=${toDate}`
    );
    getData(this, this.props.location.search);
  };
  render() {
    const {
      totalItem,
      type,
      fromDate,
      toDate,
      search,
      currentPage,
    } = this.state;
    const rowSelection = {
      onSelectAll: (isSelectAll) => {
        if (isSelectAll) {
          getDataAll(this, `?currentPage=1&pageSize=${totalItem}&search=${search}&type=${type}&fromDate=${fromDate}&toDate=${toDate}`)
          // this.setState({
          //   dataExport: data
          // })
        } else {
          this.setState({
            dataExport: []
          })
        }
      },

      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRows)
        this.setState({
          dataExport: selectedRows
        });
      }
    };
    const columns = [
      {
        title: "Product Name",
        dataIndex: "partnerProductName",
        key: "partnerChargeId",
        width: "12%"
      },
      {
        title: "Charge ID",
        dataIndex: "partnerChargeId",
        key: "productId",
        width: "18%"
      },
      {
        title: "Time",
        dataIndex: "createdAt",
        key: "createAt",
        width: "12%",
        // render: index => <span>{}</span>
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        width: "12%",
        // render: index => JSON.parse(index).gameUserName
      },
      {
        title: "Game user ID",
        dataIndex: "gameUserId",
        key: "gameUserId",
        width: "9%",
      },
      {
        title: "Source",
        dataIndex: "os",
        key: "os",
        width: "9%"
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
        width: "11%",
        render: price => <span>{price.toLocaleString()} đ</span>
      }
    ];
    const { data, totalRevenue, dataExport, pageSize } = this.state;
    const hasSelected = dataExport.length > 0;
    const menu2 = (
      <Menu>
        <Menu.Item key="1">
          <Icon type="user" />
          Export Item Selected
        </Menu.Item>
        <Menu.Item key="2">
          <ExcelFile
            element={
              <a
                icon="file-excel"
                type="primary"
                // id="btn_export_excel"
                disabled={!hasSelected}
              >
                Export Excel
              </a>
            }
            filename="Histoty revenue 3Q_Zombie"
          >
            <ExcelSheet name="Partner_3Q" data={dataExport}>{/*data={dataExport}*/}
              <ExcelColumn label="Product Name" value="partnerProductName" />
              <ExcelColumn label="Charge Id" value="partnerChargeId" />
              <ExcelColumn label="Time" value="createdAt" />
              <ExcelColumn
                label="Username"
                value="username"
              />
              <ExcelColumn label="Game User ID" value="gameUserId" />
              <ExcelColumn label="Source" value="os" />
              <ExcelColumn label="C.coin" value="coin" />
              <ExcelColumn label="Vnđ" value="vnd" />
            </ExcelSheet>
          </ExcelFile>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="history_container">
        <div className="history_header">
          <img src={Logo} alt="logo_clappigames"></img>
          <Link to="/">
            Chart view{" "}
            <Icon
              type="pie-chart"
              theme="filled"
              style={{ fontSize: "18px" }}
            />
          </Link>
        </div>
        <div className="btn-check">
          <TypeSearch
            addTypeData={this.addTypeData}
            addDateData={this.addDateData}
            addTextSearch={this.addTextSearch}
          />
          <Button id="btn_search" onClick={this.searchData}>
            SEARCH
          </Button>
        </div>
        <Dropdown overlay={menu2}>
          <Button>
            Button <Icon type="down" />
          </Button>
        </Dropdown>
        <div className="table_sum">
          <span style={{ padding: "0 2rem 0 0" }}>
            Tổng doanh thu:
            <span
              style={{
                fontSize: "1.1rem",
                color: "#0085ff",
                paddingLeft: ".5rem"
              }}
            >
              {(totalRevenue * 1000).toLocaleString()} VNĐ
            </span>
          </span>
          <span id="items_page">
            <span
              style={{ fontSize: "1.1rem", color: "#0085ff", padding: ".3rem" }}
            >
              {pageSize}
            </span>{" "}
            Purchase/ Page
            <Dropdown
              overlay={this.menu}
              placement="bottomRight"
              trigger={["click"]}
              overlayClassName="add_pageRange"
            >
              <span>
                <img src={moreitem} />
              </span>
            </Dropdown>
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          rowKey={record => record.partnerChargeId}
          pagination={false}
          bordered
          scroll={{ x: 800 }}
        />
        <Pagination
          defaultCurrent={1}
          total={totalItem}
          size="small"
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} Purchase`
          }
          pageSize={pageSize}
          onChange={this.goPage}
        />
      </div>
    );
  }
}

export default History;
