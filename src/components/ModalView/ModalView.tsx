import React, { useCallback, useEffect, useState } from 'react';
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
import './EditChartModal.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChartType, editChart } from '../../store/chartSlice';
import PageTitle from '../PageTitle/PageTitle';

type Props = {
    open: boolean;
    chartIndex: number;
    setOpen(flag: boolean): void;
};
const chartTypes = ['column', 'line', 'spline', 'area', 'bar', 'pie'];

const ModalView = ({ open, setOpen, chartIndex }: Props) => {
    const { charts } = useAppSelector(state => state.charts);
    const handleClose = () => {
        setOpen(false);
    };

    const initialChartName = charts[chartIndex].name;
    const [chartName, setChartName] = useState(initialChartName);
    const [pickerColor, setPickerColor] = useState(
        charts[chartIndex].bgColor
    );
    const [chartType, setChartType] = useState<ChartType>(
        charts[chartIndex].type
    );
    const handleChangeChartType = (event: SelectChangeEvent) =>
        setChartType(event.target.value as ChartType);
    const width = useWindowWidth({ offset: 300, breakPoint: 700 });

    const dispatch = useAppDispatch();

    const isConfirmDisabled =
        !chartName ||
        (chartName === charts[chartIndex].name &&
            pickerColor === charts[chartIndex].bgColor &&
            chartType === charts[chartIndex].type);

    const setDefaultPreviewState = useCallback(() => {
        setChartName(initialChartName);
        setPickerColor(charts[chartIndex].bgColor);
        setChartType(charts[chartIndex].type);
    }, [chartIndex, charts, initialChartName]);

    useEffect(() => {
        setDefaultPreviewState();
    }, [setDefaultPreviewState]);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ width }} className={'modal-container'}>
                <PageTitle text={`Edit Chart "${charts[chartIndex].name}"`} />
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
                        className={'color-picker'}
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
                    disabled={isConfirmDisabled}
                    onClick={handleConfirmEditChart}
                    variant={'contained'}
                >
                    CONFIRM
                </Button>
            </Box>
        </Modal>
    );

    function handleConfirmEditChart() {
        setOpen(false);
        dispatch(
            editChart({
                chartIndex,
                chartName,
                chartType,
                bgColor: pickerColor,
            })
        );
    }
};

export default ModalView;
