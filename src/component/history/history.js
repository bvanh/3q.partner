import React, { useMemo } from "react";
import { Table, Pagination, Button, Menu, Dropdown, Icon } from "antd";
import TypeSearch from "./typeSearch";
import { Link } from "react-router-dom";
import moment from "moment";
import errorAlert from "../../utils/errorAlert";
import ReactExport from "react-export-excel";
import { getDataChart } from "../services/homeService";
import "../../static/style-history.css";
import API from "../../api/api";
import { getData, getDataAll } from "../services/historyService";
import moreitem from "../../static/img/more_item.png";
import { connect } from 'react-redux'
import { dispatchSetPartner } from '../../redux/actions/index'
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
class History extends React.Component {
  constructor(props) {
    super(props);
    const query = new URLSearchParams(this.props.location.search);
    this.state = {
      data: [],
      dataExport: [],
      dataExportForPage: [],
      dataExportAll: [],
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
      dataAll: 0,
      loading: false,
      partnerId: query.get("data"),
    };
  }
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    getData(this, this.props.location.search);
    const demo = getDataChart(
      this,
      query.get("fromDate"),
      query.get("toDate"),
      this.state.partnerId
    );
  }
  componentDidUpdate(prevProps, prevState) {
    const query = new URLSearchParams(this.props.location.search);
    const {
      type,
      fromDate,
      toDate,
      search,
      currentPage,
      totalItem,
      partnerId,
    } = this.state;
    if (prevState.totalItem !== this.state.totalItem) {
      getDataAll(
        this,
        `?currentPage=1&pageSize=${totalItem}&search=${search}&type=${type}&fromDate=${query.get(
          "fromDate"
        )}&toDate=${query.get("toDate")}&data=${partnerId}`
      );
    }
  }
  goPage = async (page) => {
    await this.setState({
      currentPage: page,
    });
    const {
      type,
      fromDate,
      toDate,
      search,
      currentPage,
      partnerId,
    } = this.state;
    await this.props.history.replace(
      `${API.HISTORY_PATHNAME}?currentPage=${currentPage}&pageSize=10&search=${search}&type=${type}&fromDate=${fromDate}&toDate=${toDate}&data=${partnerId}`
    );
    getData(this, this.props.location.search);
  };
  addTypeData = (val) => {
    this.setState({
      type: val,
    });
  };
  addDateData = (startDate, endDate) => {
    this.setState({
      fromDate: startDate,
      toDate: endDate,
    });
  };
  addTextSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };
  searchData = async () => {
    const {
      type,
      fromDate,
      toDate,
      search,
      currentPage,
      partnerId,
    } = this.state;
    this.setState({ ...this.state, currentPage: 1 });
    const fromDayValue = moment(fromDate).valueOf();
    const toDayValue = moment(toDate).valueOf();
    if (toDayValue - fromDayValue <= 2592000000) {
      await this.props.history.replace(
        `${API.HISTORY_PATHNAME}?currentPage=1&pageSize=10&search=${search}&type=${type}&fromDate=${fromDate}&toDate=${toDate}&data=${partnerId}`
      );
      getData(this, this.props.location.search);
      getDataChart(this, fromDate, toDate, partnerId);
    } else {
      errorAlert("Alert", "Between 2 dates bigger than 31 days!");
    }
  };

  menu = (
    <Menu onClick={(key) => this.changePageSize(key)}>
      <b>Show up to</b>
      <Menu.Item key="10">10 Purchase</Menu.Item>
      <Menu.Item key="25">25 Purchase</Menu.Item>
      <Menu.Item key="50">50 Purchase</Menu.Item>
    </Menu>
  );
  changePageSize = async (val) => {
    await this.setState({
      pageSize: Number(val.key),
    });
    const {
      type,
      fromDate,
      toDate,
      search,
      currentPage,
      pageSize,
      partnerId,
    } = this.state;
    await this.props.history.replace(
      `${API.HISTORY_PATHNAME}?currentPage=${currentPage}&pageSize=${pageSize}&search=${search}&type=${type}&fromDate=${fromDate}&toDate=${toDate}&data=${partnerId}`
    );
    getData(this, this.props.location.search);
  };
  setPartner = () => {
    const query = new URLSearchParams(this.props.location.search);
    dispatchSetPartner(query.get("data"))
    // dispatchSetIsHistory(false)
  }
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
      onSelect: (record, selected, selectedRows, nativeEvent) => {
        let newData = this.state.dataExport;
        switch (selected) {
          case true:
            this.setState({
              ...this.state,
              dataExport: [...this.state.dataExport, record],
            });
            break;
          case false:
            let demo = newData.filter(
              (val, i) => val.partnerChargeId !== record.partnerChargeId
            );
            this.setState({ ...this.state, dataExport: demo });
            break;
          default:
            break;
        }
      },
    };
    const columns = [
      {
        title: "Product Name",
        dataIndex: "partnerProductName",
        key: "partnerChargeId",
        width: "12%",
      },
      {
        title: "Charge ID",
        dataIndex: "partnerChargeId",
        key: "productId",
        width: "18%",
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
        width: "9%",
      },
      {
        title: "C.coin",
        dataIndex: "coin",
        key: "coin",
        width: "7%",
      },
      ,
      {
        title: "VNĐ",
        dataIndex: "vnd",
        key: "vnd",
        width: "11%",
        render: (price) => <span>{price.toLocaleString()} đ</span>,
      },
    ];
    const {
      data,
      totalRevenue,
      dataExport,
      pageSize,
      dataExportAll,
      loading,
    } = this.state;
    const hasSelected = dataExport.length > 0;
    const menu2 = (
      <Menu>
        <Menu.Item key="1">
          <ExcelFile
            element={
              <Button
                // onClick={this.exportAllData}
                icon="file-excel"
                type="primary"
                style={{ width: "100%", textAlign: "left" }}
                // id="btn_export_excel"
                disabled={dataExportAll.length < 0 ? true : false}
              >
                Export all data
              </Button>
            }
            filename="Histoty revenue 3Q_Zombie"
          >
            <ExcelSheet name="Partner_3Q" data={dataExportAll}>
              <ExcelColumn label="Product Name" value="partnerProductName" />
              <ExcelColumn label="Charge Id" value="partnerChargeId" />
              <ExcelColumn label="Time" value="createdAt" />
              <ExcelColumn label="Username" value="username" />
              <ExcelColumn label="Game User ID" value="gameUserId" />
              <ExcelColumn label="Source" value="os" />
              <ExcelColumn label="C.coin" value="coin" />
              <ExcelColumn label="Vnđ" value="vnd" />
            </ExcelSheet>
          </ExcelFile>
          {/* <Icon type="user" />
          Export all data */}
        </Menu.Item>
        <Menu.Item key="2">
          <ExcelFile
            element={
              <Button
                icon="file-excel"
                type="primary"
                // id="btn_export_excel"
                disabled={!hasSelected}
              >
                Export your selected
              </Button>
            }
            filename="Histoty revenue 3Q_Zombie"
          >
            <ExcelSheet name="Partner_3Q" data={dataExport}>
              <ExcelColumn label="Product Name" value="partnerProductName" />
              <ExcelColumn label="Charge Id" value="partnerChargeId" />
              <ExcelColumn label="Time" value="createdAt" />
              <ExcelColumn label="Username" value="username" />
              <ExcelColumn label="Game User ID" value="gameUserId" />
              <ExcelColumn label="Source" value="os" />
              <ExcelColumn label="C.coin" value="coin" />
              <ExcelColumn label="Vnđ" value="vnd" />
            </ExcelSheet>
          </ExcelFile>
        </Menu.Item>
      </Menu>
    );
    const { logoPartner } = this.props
    return (
      <div className="history_container">
        <div className="history_header">
          <img src={logoPartner === "null" ? 'https://cms.cubegame.vn/static/uploads/partner/c-coin.png' : logoPartner} alt="logo_clappigames" width="60px"></img>
          <Link to="/" onClick={this.setPartner}>
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
        <Dropdown overlay={menu2} placement="bottomRight">
          <Button id="btn_export_excel">
            Export <Icon type="down" />
          </Button>
        </Dropdown>
        <div className="table_sum">
          <span style={{ padding: "0 2rem 0 0" }}>
            Tổng doanh thu:
            <span
              style={{
                fontSize: "1.1rem",
                color: "#0085ff",
                paddingLeft: ".5rem",
              }}
            >
              {totalRevenue.toLocaleString()} VNĐ
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
        {!loading ? (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.partnerChargeId}
            pagination={false}
            bordered
            scroll={{ x: 800 }}
            loading={loading}
          />
        ) : (
            "Loading"
          )}
        <Pagination
          current={currentPage}
          // defaultCurrent={1}
          total={totalItem}
          size="small"
          // showTotal={(total, range) =>
          //   `${range[0]}-${range[1]} of ${total} Purchase`
          // }
          pageSize={pageSize}
          onChange={this.goPage}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  // console.log(state);
  return {
    logoPartner: state.logoPartner
  };
}
export default connect(mapStateToProps, null)(History);
