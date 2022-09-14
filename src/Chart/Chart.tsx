import React, { useCallback, useEffect, useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { chartOptions } from './chartOptions';
import moment from 'moment/moment';

export type Data = { date: string; value: number };
type Props = {
  chartName: string;
  selectedDates: string[];
  values: number[];
  chartType?: 'column' | 'line' | 'spline' | 'area' | 'bar' | 'pie';
  chartBgColor?: string;
};
const OFFSET = 350;
const BREAK_POINT = 700;
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

  const [width, setWidth] = useState(0);
  const updateChartWidth = useCallback(() => {
    const clientWidth = document.documentElement.clientWidth;
    setWidth(
      clientWidth < BREAK_POINT ? clientWidth : clientWidth - OFFSET
    );
  }, []);

  useEffect(() => {
    updateChartWidth();
    window.addEventListener('resize', updateChartWidth);
    return () => {
      window.removeEventListener('resize', updateChartWidth);
    };
  }, [updateChartWidth]);

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
            width: width,
            backgroundColor: chartBgColor,
          },
          title: {
            align: 'left',
            text: 'Activity',
            style: {
              color: '#ffffff',
            },
          },
          series: [
            {
              date: chartName,
              colorByPoint: true,
              data: mergedData,
            },
          ],
        }}
      />
    </div>
  );
};
