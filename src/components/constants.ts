import Highcharts from 'highcharts';

export const DEFAULT_BG_COLOR = '#1f212a';
export const DEFAULT_OFFSET = 350;
export const BREAK_POINT = 700;
export const DEFAULT_HEIGHT = 295;

export const DEFAULT_CHART_NAME = '';
export const DEFAULT_CHART_TYPE = 'area';
export const CHART_WIDTH_OFFSET = 530;
export const MODAL_CONTAINER_OFFSET = 300;
export const CHART_HEIGHT = 305;
export const SELECT_MIN_WIDTH = 120;

export const MIN_PADDING = 16;

export const COMMON_CHART_SERIES = {
  colorByPoint: true,
  fillColor: {
    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
    stops: [
      [0, '#7442f4'],
      [1, 'rgba(255,255,255,0.19)'],
    ],
  },
};

export const COMMON_CHART_OPTIONS: Highcharts.Options = {
  title: {
    align: 'left',
    style: {
      color: '#ffffff',
      fontSize: '30',
    },
  },
  chart: {
    animation: false
  },
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
    },
  },

  tooltip: {
    headerFormat: '',
    pointFormat: '<span style="color:#111">{point.name}</span>: <b>{point.y:f}</b<br/>',
  },
};
