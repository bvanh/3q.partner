import React from "react";
import { Bar, Pie,Line } from "react-chartjs-2";
import { Col, Row } from "antd";
class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          'August',
          'Septemper',
          'October',
          'November',
          'December'

        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
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
