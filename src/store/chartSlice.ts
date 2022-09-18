import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockData, mockSeriesData1 } from './mockData';

export type SeriesData = { date: string; value: number };
export type ChartType =
  | 'column'
  | 'line'
  | 'spline'
  | 'area'
  | 'bar'
  | 'pie';

export type DataType = {
  name: string;
  type: ChartType;
  bgColor: string;
  seriesData: SeriesData[];
};

const initialState: DataType[] = mockData;

const chartSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {
    addChart(
      state,
      action: PayloadAction<{
        chartName: string;
        chartType: ChartType;
        bgColor: string;
      }>
    ) {
      console.log('action', action);
      state.unshift({
        name: action.payload.chartName,
        type: action.payload.chartType,
        bgColor: action.payload.bgColor,
        seriesData: mockSeriesData1,
      });
      console.log('state', state);
    },
  },
});

export const { addChart } = chartSlice.actions;
export default chartSlice.reducer;
