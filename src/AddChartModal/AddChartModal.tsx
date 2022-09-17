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
import {Chart, ChartType} from '../Chart/Chart';
import {DataType, mockData} from '../mockData';
import {useWindowWidth} from "../Charts/useWindowWidth";
import './AddChartModal.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type Props = {
  open: boolean;
  charts: DataType;
  setCharts(charts: DataType): void;
  setOpen(flag: boolean): void;
};
const chartTypes = ['column', 'line', 'spline', 'area', 'bar', 'pie'];

const AddChartModal = ({
  open,
  charts,
  setCharts,
  setOpen,
}: Props) => {
  const handleClose = () => {
    setOpen(false);
  };
  const initialChartName = '';
  const [chartName, setChartName] = useState(initialChartName);
  const [pickerColor, setPickerColor] = useState('#37d67a');
  const [chartType, setChartType] = useState<ChartType>('column');
  const handleChangeChartType = (event: SelectChangeEvent) => {
    console.log('value', event.target.value);
    setChartType(event.target.value as ChartType);
  };
  const width = useWindowWidth({offset: 300, breakPoint: 700})
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={{ ...style, width }} className={'modal-container'}>
        <h2 className={'modal-title'}>Add new Chart</h2>
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
        <div className={'chart-and-picker'}>
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
              selectedDates={mockData['chart1'].seriesData.map(
                  data => data.date
              )}
              values={mockData['chart1'].seriesData.map(data => data.value)}
              widthOffset={520}
          />
        </div>
        <Button
            className={'add-button'}
            disabled={!chartName}
            onClick={() => {
              setCharts({
                [chartName]: {
                  type: chartType,
                  bgColor: pickerColor,
                  seriesData: [
                    {
                      date: '2022-09-14T01:32:21.196Z',
                      value: 3,
                    },
                    {
                      date: '2022-09-15T01:32:21.196Z',
                      value: 4,
                    },
                  ],
                },
                ...charts,
              });
              setChartName(initialChartName);
              setOpen(false);
            }}
            variant={'contained'}
        >
          CONFIRM
        </Button>
      </Box>
    </Modal>
  );
};

export default AddChartModal;
