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
import EditChartModal from '../EditChartModal/EditChartModal';

export const Settings = () => {
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [chartId, setChartId] = useState('');
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
        title={'Open modal window to create a new Chart'}
      >
        <AddIcon /> Add new Chart
      </Button>
      <AddChartModal open={open} setOpen={setOpen} />

      {charts.map((chart, index) => (
        <div className={'chart-and-edit-block'} key={chart.name}>
          <Chart
            chartName={chart.name}
            chartType={chart.type}
            chartBgColor={chart.bgColor}
            initialSelectedDates={chart.seriesData.map(
              data => data.date
            )}
            values={chart.seriesData.map(data => data.value)}
            widthOffset={88}
          />
          <div className={'edit-block'}>
            <Button
              onClick={() => dispatch(removeChart({ index }))}
              variant={'contained'}
              sx={{ height: '64px' }}
              title={'Remove chart forever'}
            >
              <DeleteForeverIcon />
            </Button>
            <Button
              id={index.toString()}
              variant={'contained'}
              sx={{ height: '64px' }}
              onClick={event => {
                setChartId(event.currentTarget.id);
                setOpenEditModal(true);
              }}
              title={'Open modal window to edit Chart'}
            >
              <EditIcon />
            </Button>

            <EditChartModal
              chartIndex={+chartId}
              open={openEditModal}
              setOpen={setOpenEditModal}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
