import React from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { chartOptions } from './chartOptions';
import moment from 'moment/moment';
import { useWindowWidth } from '../Charts/useWindowWidth';

export type SeriesData = { date: string; value: number };
export type ChartType =
  | 'column'
  | 'line'
  | 'spline'
  | 'area'
  | 'bar'
  | 'pie';

type Props = {
  chartName: string;
  selectedDates: string[];
  values: number[];
  chartType?: ChartType;
  chartBgColor?: string;
  widthOffset?: number;
};

const DEFAULT_BG_COLOR = '#575757';
const DEFAULT_OFFSET = 350;
const BREAK_POINT = 700;

export const Chart = ({
  chartName,
  selectedDates,
  values,
  chartType = 'column',
  chartBgColor = DEFAULT_BG_COLOR,
    widthOffset = DEFAULT_OFFSET
}: Props) => {
  const formatDate = (date: string) =>
    moment(date).format('MMMM DD YYYY');
  const mergedData = selectedDates.map((date, index) => ({
    name: formatDate(date),
    y: values[index],
  }));

  const width = useWindowWidth({
    offset: widthOffset,
    breakPoint: BREAK_POINT,
  });

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        ...chartOptions,
        chart: {
          type: chartType,
          animation: true,
          height: 300,
          width,
          backgroundColor: chartBgColor,
        },
        title: {
          align: 'left',
          text: chartName,
          style: {
            color: '#ffffff',
          },
        },
        series: [
          {
            date: '',
            colorByPoint: true,
            data: mergedData,
          },
        ],
      }}
    />
  );
};
