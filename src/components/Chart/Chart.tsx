import React, { useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import moment from 'moment/moment';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { CustomDatePicker } from '../CustomDatePicker/CustomDatePicker';
import './Chart.css';
import { ChartType } from '../../store/chartSlice';
import {
  COMMON_CHART_OPTIONS,
  BREAK_POINT,
  DEFAULT_BG_COLOR,
  DEFAULT_HEIGHT,
  DEFAULT_OFFSET,
  MIN_PADDING,
} from '../constants';

type Props = {
  chartName: string;
  initialSelectedDates: string[];
  values: number[];
  chartType?: ChartType;
  chartBgColor?: string;
  widthOffset?: number;
  withDatePicker?: boolean;
  height?: number;
};

export const Chart = ({
  chartName,
  initialSelectedDates,
  values,
  chartType = 'column',
  chartBgColor = DEFAULT_BG_COLOR,
  widthOffset = DEFAULT_OFFSET,
  withDatePicker,
  height = DEFAULT_HEIGHT,
}: Props) => {
  const formatDate = (date: string) => moment(date).format('MMMM DD YYYY');

  const [selectedDates, setSelectedDates] = useState<string[]>(initialSelectedDates);
  const width = useWindowWidth();
  const calculatedWidth = width < BREAK_POINT ? width - MIN_PADDING : width - widthOffset;
  const mergedData = selectedDates.map((date, index) => ({
    name: formatDate(date),
    y: values[index],
  }));
  return (
    <div className={'chart'}>
      {withDatePicker && (
        <CustomDatePicker setSelected={setSelectedDates} dates={initialSelectedDates} />
      )}
      <HighchartsReact highcharts={Highcharts} options={getOptions()} />
    </div>
  );

  function getOptions() {
    return {
      ...COMMON_CHART_OPTIONS,
      chart: {
        type: chartType,
        animation: false,
        height,
        width: calculatedWidth,
        backgroundColor: chartBgColor,
      },
      title: {
        align: 'left',
        text: chartName,
        style: {
          color: '#ffffff',
          fontSize: 30,
        },
      },
      series: [
        {
          colorByPoint: true,
          data: mergedData,
          fillColor: {
            linearGradient: [0, 0, 0, 300],
            stops: [
              [0, '#7442f4'],
              [1, 'rgba(255,255,255,0.19)'],
            ],
          },
        },
      ],
    };
  }
};
