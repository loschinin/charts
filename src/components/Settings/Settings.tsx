import React, { useState } from 'react';
import './Settings.css';
import { Chart } from '../Chart/Chart';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import AddChartModal from '../AddChartModal/AddChartModal';
import PageTitle from '../PageTitle/PageTitle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { removeChart } from '../../store/chartSlice';

export const Settings = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const dispatch = useAppDispatch();
  const { charts } = useAppSelector(state => state.charts);

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
        <AddIcon /> Add new Chart in modal
      </Button>
      <AddChartModal open={open} setOpen={setOpen} />

      {charts.map((chart, index) => (
        <div className={'chart-and-edit-block'}>
          <Chart
            key={chart.name}
            chartName={chart.name}
            chartType={chart.type}
            chartBgColor={chart.bgColor}
            initialSelectedDates={chart.seriesData.map(
              data => data.date
            )}
            values={chart.seriesData.map(data => data.value)}
            widthOffset={220}
          />
          <div className={'edit-block'}>
            <Button
              className={'button'}
              onClick={() => dispatch(removeChart({ index }))}
              variant={'contained'}
              sx={{ justifyContent: 'flex-start' }}
            >
              <DeleteForeverIcon />
              REMOVE CHART
            </Button>
            <Button
              className={'button'}
              variant={'contained'}
              sx={{ justifyContent: 'flex-start' }}
            >
              <EditIcon />
              EDIT CHART
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
