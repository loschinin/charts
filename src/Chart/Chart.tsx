import React from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { chartOptions } from './chartOptions';
import moment from "moment/moment";

export type Data = { name: string; y: number };
type Props = {
    chartName: string;
  selectedDaysData?: Data[];
};

export const Chart = ({ chartName, selectedDaysData }: Props) => {
    const formatDate = (date: string) => moment(date).format('MMMM DD YYYY');
    const formattedData = selectedDaysData?.map(data => ({
      name: formatDate(data.name),
      y: data.y,
    }));
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          ...chartOptions,
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
