export const chartOptions = {
  subtitle: {
    align: 'left',
  },
  accessibility: {
    enabled: false,
  },
  xAxis: {
    type: 'category',
    labels: {
      style: {
        color: '#ffffff',
      },
    },
  },
  yAxis: {
    title: {
      text: 'Working time',
      style: {
        color: '#ffffff',
      },
    },
    labels: {
      style: {
        color: '#ffffff',
      },
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    column: {
      colors: ['#ffadad', '#ffdead', '#ebffad', '#adffe2', '#addaff', '#cbadff', '#ffadad'],
    },
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: '{point.y:f}',
      },
      fillColor: {
        linearGradient: [0, 0, 0, 300],
        stops: [
          [0, '#7442f4'],
          [1, 'rgba(255,255,255,0.19)']
        ]
      },
    },
  },

  tooltip: {
    headerFormat: '',
    pointFormat: '<span style="color:#111">{point.name}</span>: <b>{point.y:f}</b<br/>',
  },
};
