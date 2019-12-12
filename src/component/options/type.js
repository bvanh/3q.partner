import React from "react";
import DateRange from "./datePicker";
import { Button, Icon, Dropdown, Menu } from "antd";

function Type(props) {
  const optionType = (
    <Menu onClick={props.handleMenuClick}>
      <Menu.Item key="1">
        <Icon type="caret-right" />
        Partner_charge_id
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="caret-right" />
        User_id
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="caret-right" />
        Product_id
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <DateRange filterDate={props.filterDate} />
      <Dropdown overlay={optionType}>
        <Button>
          Type <Icon type="down" />
        </Button>
      </Dropdown>
    </>
  );
}

export default Type;
