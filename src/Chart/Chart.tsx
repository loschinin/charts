import React, { useCallback, useEffect, useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { chartOptions } from './chartOptions';
import moment from 'moment/moment';

export type Data = { name: string; y: number };
type Props = {
  chartName: string;
  selectedDaysData?: Data[];
  chartType?: 'column' | 'line' | 'spline' | 'area' | 'bar' | 'pie';
  chartBgColor?: string;
};

export const Chart = ({
  chartName,
  selectedDaysData,
  chartType = 'column',
  chartBgColor = '#575757',
}: Props) => {
  const formatDate = (date: string) =>
    moment(date).format('MMMM DD YYYY');
  const formattedData = selectedDaysData?.map(data => ({
    name: formatDate(data.name),
    y: data.y,
  }));

  const [width, setWidth] = useState(0);
  const updateChartWidth = useCallback(() => {
    setWidth(document.documentElement.clientWidth - 400);
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
              data: formattedData,
            },
          ],
        }}
      />
    </div>
  );
};
