import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Col, Row } from "antd";
import API from "../api/apiAll";
class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  chartCoinData = () => {
    const data = {
      labels: this.state.xAxis,
      datasets: [
        {
          label: "Web",
          fill: false,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,0.4)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.yAxisWeb
        },
        {
          label: "Apk",
          fill: false,
          backgroundColor: "#ffce56",
          borderColor: "#ffce56",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.yAxisApk
        },
        {
          label: "Total",
          fill: false,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,0.2)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.yAxisTotal
        }
      ]
    };
    return data;
  };
  chartVndData = () => {
    const data = {
      labels: this.state.vndChartxAxis,
      datasets: [
        {
          label: "Web",
          fill: false,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,0.4)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.vndChartyAxisWeb
        },
        {
          label: "Apk",
          fill: false,
          backgroundColor: "#ffce56",
          borderColor: "#ffce56",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.vndChartyAxisApk
        },
        {
          label: "Total",
          fill: false,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,0.2)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.vndChartyAxisTotal
        }
      ]
    };
    return data;
  };
  getCoinData = type => {
    let userAccessToken = localStorage.getItem("user");
    fetch(
      API.ROOT_URL +
        API.CHARTS_PATHNAME +
        `?type=${type}` +
        API.CHARTS_PATHSEARCH_DATE,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(userAccessToken).accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(result =>
        this.setState({
          xAxis: result.xAxis,
          yAxisWeb: result.yAxis.WEB,
          yAxisApk: result.yAxis.APK,
          yAxisTotal: result.yAxis.TOTAL
        })
      )
      .catch(function(error) {
        console.log("Request failed", error);
      });
  };
  getVndData = type => {
    let userAccessToken = localStorage.getItem("user");
    fetch(
      API.ROOT_URL +
        API.CHARTS_PATHNAME +
        `?type=${type}` +
        API.CHARTS_PATHSEARCH_DATE,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(userAccessToken).accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(result =>
        this.setState({
          vndChartxAxis: result.xAxis,
          vndChartyAxisWeb: result.yAxis.WEB,
          vndChartyAxisApk: result.yAxis.APK,
          vndChartyAxisTotal: result.yAxis.TOTAL
        })
      )
      .catch(function(error) {
        console.log("Request failed", error);
      });
  };
  componentDidMount() {
    this.getCoinData(0);
    this.getVndData(1);
  }
  render() {
    return (
      <>
        <Row>
          <Col span={12}>
            <Bar data={this.chartCoinData} width={100} height={50} />
          </Col>
          <Col span={12}>
            <Line data={this.chartVndData} width={100} height={50} />
          </Col>
        </Row>
      </>
    );
  }
}

export default Charts;
