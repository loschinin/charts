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
  MIN_PADDING, DEFAULT_CHART_TYPE, COMMON_CHART_SERIES,
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
  chartType = DEFAULT_CHART_TYPE,
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
        height,
        width: calculatedWidth,
        backgroundColor: chartBgColor,
        ...COMMON_CHART_OPTIONS.chart
      },
      title: {
        text: chartName,
        ...COMMON_CHART_OPTIONS.title
      },
      series: [
        {
          data: mergedData,
          ...COMMON_CHART_SERIES,
        },
      ],
    };
  }
};
