import React, { useState } from 'react';
import './Settings.css';
import { Chart } from '../Chart/Chart';
import { mockData } from '../mockData';
import { Button } from '@mui/material';
import AddChartModal from '../AddChartModal/AddChartModal';

export const Settings = () => {
  const [charts, setCharts] = useState(mockData);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={'settings'}>
      <h1>
        On this page you can add a new chart or edit an existing one
      </h1>
      <Button onClick={handleOpen} className={'open-modal-button'} variant={'contained'}>Add new Chart in modal</Button>
      <AddChartModal
        open={open}
        charts={charts}
        setCharts={setCharts}
        setOpen={setOpen}
      />

      {Object.keys(charts).map(chart => (
        <Chart
          key={chart}
          chartName={chart}
          chartType={charts[chart].type}
          chartBgColor={charts[chart].bgColor}
          selectedDates={charts[chart].seriesData.map(
            data => data.date
          )}
          values={charts[chart].seriesData.map(data => data.value)}
          widthOffset={0}
        />
      ))}
    </div>
  );
};
