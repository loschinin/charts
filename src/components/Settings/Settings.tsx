import React, { useState } from 'react';
import './Settings.css';
import { Chart } from '../Chart/Chart';
import { Button } from '@mui/material';
import { useAppSelector } from '../../hooks';
import AddChartModal from '../AddChartModal/AddChartModal';
import PageTitle from '../PageTitle/PageTitle';

export const Settings = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const charts = useAppSelector(state => state.charts);

  return (
    <div className={'settings'}>
      <PageTitle
        text={
          'On this page you can add a new chart or edit an existing one'
        }
      />
      <Button
        onClick={handleOpen}
        className={'open-modal-button'}
        variant={'contained'}
      >
        Add new Chart in modal
      </Button>
      <AddChartModal open={open} setOpen={setOpen} />

      {charts.map(chart => (
        <Chart
          key={chart.name}
          chartName={chart.name}
          chartType={chart.type}
          chartBgColor={chart.bgColor}
          initialSelectedDates={chart.seriesData.map(
            data => data.date
          )}
          values={chart.seriesData.map(data => data.value)}
          widthOffset={0}
        />
      ))}
    </div>
  );
};
