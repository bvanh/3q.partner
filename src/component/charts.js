import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Col, Row } from "antd";
class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ["10/12", "11/12", "12/12", "13/12", "14/12"],
        datasets: [
          {
            label: "Web",
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,0.4)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [1, 2, 3, 4, 5]
          },
          {
            label: "Apk",
            fill: false,
            backgroundColor: "#ffce56",
            borderColor: "#ffce56",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [0,0,0,1,0]
          },
          {
            label: "Total",
            fill: false,
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,0.2)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [4,7,3,4,5]
          }
        ]
      }
    };
  }
  render() {
    return (
      <>
        <Row>
          <Col span={12}>
            {" "}
            <Bar
              data={this.state.chartData}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: true,
                display: true,
                text: "Chart Demo",
                fontSize: 25
              }}
            />
          </Col>
          <Col span={12}>
            <Line
              data={this.state.chartData}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: true,
                display: false,
                text: "Chart Demo",
                fontSize: 25
              }}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Charts;
