import React from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { chartOptions } from './chartOptions';
import moment from 'moment/moment';
import { useWindowWidth } from '../Charts/useWindowWidth';

export type Data = { date: string; value: number };
type Props = {
  chartName: string;
  selectedDates: string[];
  values: number[];
  chartType?: 'column' | 'line' | 'spline' | 'area' | 'bar' | 'pie';
  chartBgColor?: string;
};

const DEFAULT_BG_COLOR = '#575757';

export const Chart = ({
  chartName,
  selectedDates,
  values,
  chartType = 'column',
  chartBgColor = DEFAULT_BG_COLOR,
}: Props) => {
  const formatDate = (date: string) =>
    moment(date).format('MMMM DD YYYY');
  const mergedData = selectedDates.map((date, index) => ({
    name: formatDate(date),
    y: values[index],
  }));

  const width = useWindowWidth();

  return (
    <div>
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
    </div>
  );
};
