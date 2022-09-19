import React, { useCallback, useEffect, useState } from 'react';
import {
  Box, Button,
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
import './ChartModal.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addChart, ChartType, editChart } from '../../store/chartSlice';
import PageTitle from '../PageTitle/PageTitle';

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

const DEFAULT_CHART_NAME = '';
const DEFAULT_BG_COLOR = '#361659';
const DEFAULT_CHART_TYPE = 'area';
const CHART_WIDTH_OFFSET = 530;
const MODAL_CONTAINER_OFFSET = 300;
const CHART_HEIGHT = 305;
const SELECT_MIN_WIDTH = 120;
const BREAKPOINT = 700;

const chartTypes = ['column', 'line', 'spline', 'area', 'bar', 'pie'];

const ChartModal = ({ open, setOpen, idForEditableMode }: Props) => {
  const isEditableMode = idForEditableMode !== undefined;
  console.log('edit id', idForEditableMode);

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
  const width = useWindowWidth({ offset: MODAL_CONTAINER_OFFSET, breakPoint: BREAKPOINT });

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
      <Box sx={{ width }} className={'modal-container'}>
        <PageTitle text={pageTitleText} />
        <div className={'chart-and-color-picker'}>
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
            initialSelectedDates={mockSeriesData1.map(data => data.date)}
            values={mockSeriesData1.map(data => data.value)}
            widthOffset={CHART_WIDTH_OFFSET}
            height={CHART_HEIGHT}
          />
        </div>
        <div className={'tools-row'}>
          <div className={'input-and-select'}>
            <Input
              value={chartName}
              onChange={e => setOptions({ ...options, chartName: e.target.value })}
              placeholder={'Write unique chart name'}
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
          <Button
              className={'custom-button'}
              disabled={isConfirmDisabled}
              onClick={handleConfirmEditChart}
              variant={'contained'}
              sx={{paddingX: 4}}
          >
            CONFIRM
          </Button>
          <Button
              className={'custom-button'}
              onClick={() => setOpen(false)}
              variant={'contained'}
              sx={{paddingX: 4}}
          >
            CLOSE
          </Button>
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
