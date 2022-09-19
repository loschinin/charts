import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockData, mockSeriesData1 } from './mockData';

export type SeriesData = { date: string; value: number };
export type ChartType = 'column' | 'line' | 'spline' | 'area' | 'bar' | 'pie';

export type DataType = {
  name: string;
  type: ChartType;
  bgColor: string;
  seriesData: SeriesData[];
};

const initialState: { charts: DataType[] } = { charts: mockData };

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
      state.charts.unshift({
        name: action.payload.chartName,
        type: action.payload.chartType,
        bgColor: action.payload.bgColor,
        seriesData: mockSeriesData1,
      });
    },
    editChart(
      state,
      action: PayloadAction<{
        chartIndex: number;
        chartName: string;
        chartType: ChartType;
        bgColor: string;
      }>
    ) {
      state.charts = state.charts.map((chart, index) => {
        if (index === action.payload.chartIndex) {
          return {
            ...chart,
            name: action.payload.chartName,
            type: action.payload.chartType,
            bgColor: action.payload.bgColor,
          };
        }
        return { ...chart };
      });
    },
    removeChart(state, action: PayloadAction<{ index: number }>) {
      state.charts = state.charts.filter((_, index) => index !== action.payload.index);
    },
  },
});

export const { addChart, editChart, removeChart } = chartSlice.actions;
export default chartSlice.reducer;
