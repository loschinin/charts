import { DataType, SeriesData } from './chartSlice';

export const mockSeriesData1: SeriesData[] = [
  {
    date: '2022-09-14T01:32:21.196Z',
    value: 3,
  },
  {
    date: '2022-09-15T01:32:21.196Z',
    value: 4,
  },
  {
    date: '2022-09-16T01:32:21.196Z',
    value: 3,
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
    name: 'chart1',
    type: 'column',
    bgColor: '#afafaf',
    seriesData: mockSeriesData1,
  },
  {
    name: 'chart2',
    type: 'area',
    bgColor: '#343434',
    seriesData: mockSeriesData2,
  },
];
