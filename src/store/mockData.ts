import { DataType, SeriesData } from './chartSlice';

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

export const mockData: DataType[] = [
  {
    name: 'How many hours you worked',
    type: 'column',
    bgColor: '#061d25',
    seriesData: mockSeriesData1,
  },
  {
    name: 'How many hours of rest you had',
    type: 'area',
    bgColor: '#1f121f',
    seriesData: mockSeriesData2,
  },
];
