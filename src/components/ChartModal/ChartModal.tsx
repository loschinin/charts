import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { SketchPicker } from 'react-color';
import { Chart } from '../Chart/Chart';
import { mockData } from '../../mockData';
import { useWindowWidth } from '../hooks/useWindowWidth';
import './ChartModal.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addChart, ChartType, editChart } from '../../store/chartSlice';

import {
  BREAK_POINT,
  CHART_HEIGHT,
  CHART_WIDTH_OFFSET,
  DEFAULT_BG_COLOR,
  DEFAULT_CHART_NAME,
  DEFAULT_CHART_TYPE,
  MIN_PADDING,
  MODAL_CONTAINER_OFFSET,
  SELECT_MIN_WIDTH,
} from '../constants';

type Props = {
  open: boolean;
  setOpen(flag: boolean): void;
  idForEditableMode?: number;
};

type InitialChangeableOptions = {
  chartName: string;
  bgColor: string;
  chartType: ChartType;
};

const chartTypes = ['column', 'line', 'spline', 'area', 'bar', 'pie'];

const ChartModal = ({ open, setOpen, idForEditableMode }: Props) => {
  const isEditableMode = idForEditableMode !== undefined;

  const { charts } = useAppSelector(state => state.charts);

  const initialOptionsState = useCallback(
    () => ({
      chartName: isEditableMode ? charts[idForEditableMode].name : DEFAULT_CHART_NAME,
      bgColor: isEditableMode ? charts[idForEditableMode].bgColor : DEFAULT_BG_COLOR,
      chartType: isEditableMode ? charts[idForEditableMode].type : DEFAULT_CHART_TYPE,
    }),
    [idForEditableMode, charts, isEditableMode]
  );

  const [options, setOptions] = useState<InitialChangeableOptions>(initialOptionsState);
  const { chartName, bgColor, chartType } = options;

  const dispatch = useAppDispatch();
  const width = useWindowWidth();
  const calculatedWidth =
    width < BREAK_POINT ? width - MIN_PADDING : width - MODAL_CONTAINER_OFFSET;

  const isConfirmDisabled = isEditableMode
    ? (chartName === charts[idForEditableMode].name &&
        bgColor === charts[idForEditableMode].bgColor &&
        chartType === charts[idForEditableMode].type) ||
      !chartName
    : !chartName;

  const pageTitleText = `${isEditableMode ? 'Edit' : 'Creating'} Chart Preview`;

  const confirmButtonDispatchedAction = isEditableMode
    ? editChart({
        chartIndex: idForEditableMode,
        chartName,
        chartType,
        bgColor,
      })
    : addChart({ chartName, chartType, bgColor });

  const setDefaultPreviewState = useCallback(() => {
    setOptions(initialOptionsState);
  }, [initialOptionsState]);

  useEffect(() => {
    setDefaultPreviewState();
  }, [setDefaultPreviewState]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={{ width: calculatedWidth }} className={'modal-container'}>
        <Typography variant="h4">{pageTitleText}</Typography>
        <div className={'modal-chart'}>
          <SketchPicker
            className={'color-picker'}
            color={bgColor}
            onChange={color => {
              setOptions({ ...options, bgColor: color.hex });
            }}
          />
          <Chart
            key={chartName}
            chartName={chartName}
            chartType={chartType}
            chartBgColor={bgColor}
            initialSelectedDates={mockData[isEditableMode ? idForEditableMode : 0].seriesData.map(
              data => data.date
            )}
            values={mockData[isEditableMode ? idForEditableMode : 0].seriesData.map(
              data => data.value
            )}
            widthOffset={CHART_WIDTH_OFFSET}
            height={CHART_HEIGHT}
          />
        </div>
        <div className={'tools-row'}>
          <div className={'input-and-select'}>
            <TextField
              label="Chart Title"
              value={chartName}
              onChange={e => setOptions({ ...options, chartName: e.target.value })}
              placeholder={'Write unique chart title'}
              className={'chart-name-input'}
              autoFocus
            />{' '}
            <FormControl variant="filled" sx={{ minWidth: SELECT_MIN_WIDTH }}>
              <InputLabel id="select-filled-label">Chart Type</InputLabel>
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
          <div className={'modal-buttons'}>
            <Button
              disabled={isConfirmDisabled}
              onClick={handleConfirmEditChart}
              variant={'contained'}
              sx={{ paddingX: 4 }}
            >
              CONFIRM
            </Button>
            <Button onClick={() => setOpen(false)} variant={'contained'} sx={{ paddingX: 4 }}>
              CLOSE
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );

  function handleChangeChartType(event: SelectChangeEvent) {
    setOptions({ ...options, chartType: event.target.value as ChartType });
  }

  function handleConfirmEditChart() {
    dispatch(confirmButtonDispatchedAction);
    setOpen(false);
  }
};

export default ChartModal;
