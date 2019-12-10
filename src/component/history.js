import React from "react";
import { Table, Input, Button, Icon } from "antd";
import Highlighter from "react-highlight-words";

const data = [
  {
    key: "1",
    name: "John Brown",
    date: 1,
    address: "New York No. 1 Lake Park",
    value: 100000
  },
  {
    key: "2",
    name: "Joe Black",
    date: 1,
    address: "London No. 1 Lake Park",
    value: 100000
  },
  {
    key: "3",
    name: "Jim Green",
    date: 1,
    address: "Sidney No. 1 Lake Park",
    value: 100000
  },
  {
    key: "4",
    name: "Jim Red",
    date: 1,
    address: "London No. 2 Lake Park",
    value: 100000
  }
];

class History extends React.Component {
  state = {
    searchText: "",
    searchedColumn: ""
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "30%",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        width: "20%",
        ...this.getColumnSearchProps("date")
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: "30%",
        ...this.getColumnSearchProps("address")
      },
      {
        title: "Value",
        dataIndex: "value",
        key: "value",
        width: "20%"
        // ...this.getColumnSearchProps('value'),
      }
    ];
     let total=0;
     for(let i=0;i<data.length;i++){
         total+=data[i].value;
     }
    return (
      <>
        <span>Total: {total} </span>
        <Table columns={columns} dataSource={data} />
      </>
    );
  }
}

export default History;
