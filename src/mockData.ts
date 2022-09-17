import { ChartType, SeriesData } from './Chart/Chart';

export type DataType = {
  [key: string]: { type: ChartType; bgColor: string, seriesData: SeriesData[] };
}
export const mockData: DataType = {
  chart1: {
    type: 'column',
    bgColor: '#afafaf',
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
  chart2: {
    type: 'area',
    bgColor: '#343434',
    seriesData: [
      {
        date: '2022-09-11T01:32:21.196Z',
        value: 2,
      },
      {
        date: '2022-09-12T01:32:21.196Z',
        value: 3,
      },
    ],
  },
};

export const initialDates1 = mockData['chart1'].seriesData.map(
  data => data.date
);
export const initialDates2 = mockData['chart2'].seriesData.map(
  data => data.date
);
