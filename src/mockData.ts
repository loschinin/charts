import { DataType, SeriesData } from './store/chartSlice';

export const mockSeriesData1: SeriesData[] = [
  {
    date: '2022-09-14T01:32:21.196Z',
    value: 7,
  },
  {
    date: '2022-09-15T01:32:21.196Z',
    value: 8,
  },
  {
    date: '2022-09-16T01:32:21.196Z',
    value: 9,
  },
];

export const mockSeriesData2: SeriesData[] = [
  {
    date: '2022-09-11T01:32:21.196Z',
    value: 2,
  },
  {
    date: '2022-09-12T01:32:21.196Z',
    value: 3,
  },
  {
    date: '2022-09-13T01:32:21.196Z',
    value: 1,
  },
];

export const mockSeriesData3: SeriesData[] = [
  {
    date: '2022-09-13T01:32:21.196Z',
    value: 8,
  },
  {
    date: '2022-09-14T01:32:21.196Z',
    value: 5,
  },
  {
    date: '2022-09-15T01:32:21.196Z',
    value: 7,
  },
];

export const mockData: DataType[] = [
  {
    name: 'How many hours you worked',
    type: 'area',
    bgColor: '#1f212a',
    seriesData: mockSeriesData1,
  },
  {
    name: 'How many hours of rest you had',
    type: 'column',
    bgColor: '#241f2a',
    seriesData: mockSeriesData2,
  },
  {
    name: 'How many hours you sleep',
    type: 'bar',
    bgColor: '#1f2a2a',
    seriesData: mockSeriesData3,
  },
];
