import React, { useState, useEffect } from "react";
import { Descriptions, Badge } from "antd";
import { url } from "./api";
export default function Detail(props) {
  const [data, setData] = useState({ dataDetail: {}, dataPayload: {} });
  useEffect(() => {
    let userAccessToken = localStorage.getItem("user");
    fetch(url + props.location.pathname + props.location.search, {
      headers: {
        Authorization: `Bearer ${JSON.parse(userAccessToken).accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET"
    })
      .then(response => response.json())
      .then(result =>
        setData({ dataDetail: result, dataPayload: JSON.parse(result.payload) })
      )
      .catch(function(error) {
        console.log("Request failed", error);
      });
  }, []);
  const entriesDataPayload = Object.entries(data.dataPayload);
  let listItemPayload = [];
  for (const [keysOfDataPayload, valueOfDataPayload] of entriesDataPayload) {
    listItemPayload.push(
      <Descriptions.Item label={keysOfDataPayload} key={keysOfDataPayload}>
        {valueOfDataPayload}
      </Descriptions.Item>
    );
  }
  return (
    <div className="listDetail">
      <Descriptions title="User Info" bordered>
        <Descriptions.Item label="PartnerChargeId">
          {data.dataDetail.partnerChargeId}
        </Descriptions.Item>
        <Descriptions.Item label="PartnerId">
          {data.dataDetail.partnerId}
        </Descriptions.Item>
        <Descriptions.Item label="UserId">
          {data.dataDetail.userId}
        </Descriptions.Item>
        <Descriptions.Item label="Coin">
          {data.dataDetail.coin}
        </Descriptions.Item>
        <Descriptions.Item label="CreatAt">
          {data.dataDetail.createAt}
        </Descriptions.Item>
        <Descriptions.Item label="Os">{data.dataDetail.os}</Descriptions.Item>
        <Descriptions.Item label="UserType">
          {data.dataDetail.userType}
        </Descriptions.Item>
        {listItemPayload}
      </Descriptions>
      ,
    </div>
  );
}
