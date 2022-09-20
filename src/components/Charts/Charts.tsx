import React from 'react';
import './Chars.css';
import { Chart } from '../Chart/Chart';
import { useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Page } from '../Page/Page';

export const Charts = () => {
  const { charts } = useAppSelector(state => state.charts);

  return (
    <Page>
      <Typography variant="h4">On this page you can select time period</Typography>
      {charts.length ? (
        charts.map(chart => (
          <Chart
            key={chart.name}
            chartName={chart.name}
            chartBgColor={chart.bgColor}
            chartType={chart.type}
            initialSelectedDates={chart.seriesData.map(data => data.date)}
            values={chart.seriesData.map(data => data.value)}
            withDatePicker
            widthOffset={265}
          />
        ))
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
      )}
    </Page>
  );
};
