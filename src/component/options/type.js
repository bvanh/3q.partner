import React from "react";
import DateRange from "./datePicker";
import { Button, Icon, Dropdown, Menu } from "antd";

function Type(props) {
  const optionType = (
    <Menu onClick={props.handleMenuClick}>
      <Menu.Item key="1">
        <Icon type="caret-right" />
        Partner_charge_ID
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="caret-right" />
        User_ID
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="caret-right" />
        Product_ID
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Dropdown overlay={optionType}>
        <Button className="btn-checktype">
          Type <Icon type="down" />
        </Button>
      </Dropdown>
      <DateRange filterDate={props.filterDate} />
    </>
  );
}

export default Type;
