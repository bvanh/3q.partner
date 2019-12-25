const optionLine = {
  maintainAspectRatio: false,
  scaleStartValue: 0,
  scales: {
    yAxes: [
      {
        ticks: {
          steps: 10,
          stepValue: 10000,
          beginAtZero: true,
          min: 0,
          gridLines: {
            drawTicks: true
          },
          callback: function(value, index) {
            return `${value.toLocaleString()}`;
          }
        },
        scaleLabel: {
          display: true,
          labelString: "Tiền (VNĐ)"
        }
      }
    ]
  },
  legend: {
    position: "top",
    display: true
  }
};
export default optionLine;
