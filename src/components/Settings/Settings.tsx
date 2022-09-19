import React, { useEffect, useState } from 'react';
import './Settings.css';
import { Chart } from '../Chart/Chart';
import { Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { removeChart } from '../../store/chartSlice';
import ChartModal from '../ChartModal/ChartModal';

export const Settings = () => {
  const { charts } = useAppSelector(state => state.charts);
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [chartId, setChartId] = useState<number | undefined>(undefined);

  useEffect(() => {
    !openModal && setChartId(undefined);
  }, [openModal]);

  return (
    <div className={'settings'}>
      <Typography variant="h4">
        On this page you can add a new chart or edit an existing one
      </Typography>
      <Button
        onClick={() => {
          setOpenModal(true);
        }}
        className={'add-button'}
        variant={'contained'}
        title={'Open modal window to create a new Chart'}
      >
        <AddIcon /> Add new Chart
      </Button>

      {charts.map((chart, index) => (
        <div className={'chart-item'} key={chart.name}>
          <Chart
            chartName={chart.name}
            chartType={chart.type}
            chartBgColor={chart.bgColor}
            initialSelectedDates={chart.seriesData.map(data => data.date)}
            values={chart.seriesData.map(data => data.value)}
            widthOffset={88}
          />
          <div className={'buttons-block'}>
            <Button
              onClick={() => dispatch(removeChart({ index }))}
              variant={'contained'}
              title={'Remove chart forever'}
            >
              <DeleteForeverIcon />
            </Button>
            <Button
              id={index.toString()}
              variant={'contained'}
              onClick={event => {
                setChartId(+event.currentTarget.id);
                setOpenModal(true);
              }}
              title={'Open modal window to edit Chart'}
            >
              <EditIcon />
            </Button>
          </div>
        </div>
      ))}
      <ChartModal open={openModal} setOpen={setOpenModal} idForEditableMode={chartId} />
    </div>
  );
};
