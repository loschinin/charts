import React, { useState } from 'react';
import './Chars.css';
import { Chart, Data } from '../Chart/Chart';
import 'react-datepicker/dist/react-datepicker.css';
import { Picker } from '../Picker/Picker';

const mockData1: Data[] = [
  {
    date: '2022-09-14T01:32:21.196Z',
    value: 3,
  },
  {
    date: '2022-09-15T01:32:21.196Z',
    value: 4,
  },
];

const mockData2: Data[] = [
  {
    date: '2022-09-11T01:32:21.196Z',
    value: 2,
  },
  {
    date: '2022-09-12T01:32:21.196Z',
    value: 3,
  },
];

export const Charts = () => {
  const [selectedDates, setSelectedDates] = useState<
    string[]
  >(mockData1.map(data => data.date));

  const [selectedDates2, setSelectedDates2] = useState<
    string[]
  >(mockData2.map(data => data.date));


  return mockData1.length /* || mockData2.length*/ ? (
    <div className={'container'}>
      <h1>On this page you can change the date on the charts</h1>
      <div className={'chart-with-picker'}>
        <Picker
          setSelected={setSelectedDates}
          dates={mockData1.map(data => data.date)}
        />
        <Chart
          chartName={'Chart1'}
          selectedDates={selectedDates}
          values={mockData1.map(data => data.value)}
        />
      </div>
       <div className={'chart-with-picker'}>
         <Picker
             setSelected={setSelectedDates2}
             dates={mockData2.map(data => data.date)}
         />
         <Chart
             chartName={'Chart2'}
             selectedDates={selectedDates2}
             values={mockData2.map(data => data.value)}
         />
      </div>
    </div>
  ) : (
    <>No data for charts</>
  );
};
