import React from 'react';
import './Chars.css';
import { Chart } from '../Chart/Chart';
import { useAppSelector } from '../../hooks';
import PageTitle from '../PageTitle/PageTitle';
import { Link } from 'react-router-dom';

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
          initialSelectedDates={chart.seriesData.map(data => data.date)}
          values={chart.seriesData.map(data => data.value)}
          withPicker
          widthOffset={265}
        />
      ))}
    </div>
  ) : (
    <div className={'empty-data'}>
      <div>
        No data for charts
        <br />
        You can add new charts
        <br />
        Go to <Link to={'/settings'}>Settings Page</Link>
      </div>
    </div>
  );
};
