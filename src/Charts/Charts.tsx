import React, { useState } from 'react';
import './Chars.css';
import { Chart, Data } from '../Chart/Chart';
import 'react-datepicker/dist/react-datepicker.css';
import { Picker } from '../Picker/Picker';

const mockData1: Data[] = [
  {
    name: '2022-09-14T01:32:21.196Z',
    y: 3,
  },
  {
    name: '2022-09-15T01:32:21.196Z',
    y: 4,
  },
];

const mockData2: Data[] = [
  {
    name: '2022-09-11T01:32:21.196Z',
    y: 2,
  },
  {
    name: '2022-09-12T01:32:21.196Z',
    y: 3,
  },
];

export const Charts = () => {
  const [selectedDaysData1, setSelectedDaysData1] =
    useState<Data[]>(mockData1);
  const [selectedDaysData2, setSelectedDaysData2] =
    useState<Data[]>(mockData2);

  return (
    <div className={'container'}>
      <h1>On this page you can change the date on the charts</h1>
      <div className={'chart-with-picker'}>
        <Picker
          mockData={mockData1}
          setSelected={setSelectedDaysData1}
        />
        <Chart chartName={'Chart1'} selectedDaysData={selectedDaysData1} />
      </div>
      <div className={'chart-with-picker'}>
        <Picker
          mockData={mockData2}
          setSelected={setSelectedDaysData2}
        />
        <Chart chartName={'Chart2'} selectedDaysData={selectedDaysData2} />
      </div>
    </div>
  );
};
