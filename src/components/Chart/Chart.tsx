import React, { useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { chartOptions } from './chartOptions';
import moment from 'moment/moment';
import { useWindowWidth } from '../Charts/useWindowWidth';
import { Picker } from '../Picker/Picker';
import './Chart.css';
import { ChartType } from '../../store/chartSlice';

type Props = {
  chartName: string;
  initialSelectedDates: string[];
  values: number[];
  chartType?: ChartType;
  chartBgColor?: string;
  widthOffset?: number;
  withPicker?: boolean;
  height?: number;
};

const DEFAULT_BG_COLOR = '#575757';
const DEFAULT_OFFSET = 350;
const BREAK_POINT = 700;
const DEFAULT_HEIGHT = 276;

export const Chart = ({
  chartName,
  initialSelectedDates,
  values,
  chartType = 'column',
  chartBgColor = DEFAULT_BG_COLOR,
  widthOffset = DEFAULT_OFFSET,
  withPicker,
  height = DEFAULT_HEIGHT,
}: Props) => {
  const formatDate = (date: string) =>
    moment(date).format('MMMM DD YYYY');

  const [selectedDates, setSelectedDates] = useState<string[]>(
    initialSelectedDates
  );
  const width = useWindowWidth({
    offset: widthOffset,
    breakPoint: BREAK_POINT,
  });
  const mergedData = selectedDates.map((date, index) => ({
    name: formatDate(date),
    y: values[index],
  }));
  return (
    <div className={'chart-with-date-picker'}>
      {withPicker && (
        <Picker
          setSelected={setSelectedDates}
          dates={initialSelectedDates}
        />
      )}
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          ...chartOptions,
          chart: {
            type: chartType,
            animation: false,
            height: height,
            width,
            backgroundColor: chartBgColor,
          },
          title: {
            align: 'left',
            text: chartName,
            style: {
              color: '#ffffff',
              fontSize: 35,
            },
          },
          series: [
            {
              colorByPoint: true,
              data: mergedData,
            },
          ],
        }}
      />
    </div>
  );
};
