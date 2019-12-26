function nFormatter(num) {
  if (num >= 1000000000) {
     return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
  }
  if (num >= 1000000) {
     return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
     return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
}
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
            return nFormatter(value);
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