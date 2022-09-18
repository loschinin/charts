import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { SketchPicker } from 'react-color';
import { Chart } from '../Chart/Chart';
import { mockSeriesData1 } from '../../store/mockData';
import { useWindowWidth } from '../Charts/useWindowWidth';
import './AddChartModal.css';
import { useAppDispatch } from '../../hooks';
import { addChart, ChartType } from '../../store/chartSlice';
import PageTitle from '../PageTitle/PageTitle';

type Props = {
  open: boolean;
  setOpen(flag: boolean): void;
};
const chartTypes = ['column', 'line', 'spline', 'area', 'bar', 'pie'];

const AddChartModal = ({ open, setOpen }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };
  const initialChartName = '';
  const [chartName, setChartName] = useState(initialChartName);
  const [pickerColor, setPickerColor] = useState('#37d67a');
  const [chartType, setChartType] = useState<ChartType>('column');
  const handleChangeChartType = (event: SelectChangeEvent) =>
    setChartType(event.target.value as ChartType);
  const width = useWindowWidth({ offset: 300, breakPoint: 700 });
  const dispatch = useAppDispatch();
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width }} className={'modal-container'}>
        <PageTitle text={'Add new Chart'} />
        <div className={'adding-chart'}>
          <Input
            value={chartName}
            onChange={e => setChartName(e.target.value)}
            placeholder={'Write unique chart name'}
            className={'chart-name-input'}
            autoFocus
          />{' '}
          <FormControl variant="filled" sx={{ minWidth: 120 }}>
            <InputLabel id="select-filled-label">
              Chart Type
            </InputLabel>
            <Select
              labelId="select-filled-label"
              id="select-filled"
              value={chartType}
              onChange={handleChangeChartType}
            >
              {chartTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={'chart-and-color-picker'}>
          <SketchPicker
            color={pickerColor}
            onChange={color => {
              setPickerColor(color.hex);
            }}
          />
          <Chart
            key={chartName}
            chartName={chartName}
            chartType={chartType}
            chartBgColor={pickerColor}
            initialSelectedDates={mockSeriesData1.map(
              data => data.date
            )}
            values={mockSeriesData1.map(data => data.value)}
            widthOffset={530}
            height={305}
          />
        </div>
        <Button
          className={'add-button'}
          disabled={!chartName}
          onClick={handleConfirmAddingChart}
          variant={'contained'}
        >
          CONFIRM
        </Button>
      </Box>
    </Modal>
  );

  function handleConfirmAddingChart() {
    setChartName(initialChartName);
    setOpen(false);
    dispatch(
      addChart({ chartName, chartType, bgColor: pickerColor })
    );
  }
};

export default AddChartModal;
