import React from 'react';
import './Chars.css';
import { Chart } from '../Chart/Chart';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppSelector } from '../../hooks';
import PageTitle from '../PageTitle/PageTitle';

export const Charts = () => {
  const { charts } = useAppSelector(state => state.charts);

  return charts.length ? (
    <div className={'charts-page'}>
      <PageTitle text={'On this page you can select time period'} />
      {charts.map(chart => (
        <Chart
          key={chart.name}
          chartName={chart.name}
          chartBgColor={chart.bgColor}
          chartType={chart.type}
          initialSelectedDates={chart.seriesData.map(
            data => data.date
          )}
          values={chart.seriesData.map(data => data.value)}
          withPicker
          widthOffset={265}
        />
      ))}
    </div>
  ) : (
    <div className={'empty-data'}>
      No data for charts
      <br /> You can add new chart in Settings Page
    </div>
  );
};
