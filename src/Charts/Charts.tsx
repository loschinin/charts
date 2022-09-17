import React, { useState } from 'react';
import './Chars.css';
import { Chart } from '../Chart/Chart';
import 'react-datepicker/dist/react-datepicker.css';
import { Picker } from '../Picker/Picker';
import {initialDates1, initialDates2, mockData} from "../mockData";

export const Charts = () => {
  const [selectedDates, setSelectedDates] =
    useState<string[]>(initialDates1);

  const [selectedDates2, setSelectedDates2] =
    useState<string[]>(initialDates2);

  return mockData['chart1'].seriesData.length || mockData['chart2'].seriesData.length ? (
    <div className={'charts-page'}>
      <h1>On this page you can change the date on the charts</h1>
      <div className={'chart-with-picker'}>
        <Picker
          setSelected={setSelectedDates}
          dates={initialDates1}
        />
        <Chart
          chartName={'Chart1'}
          selectedDates={selectedDates}
          values={mockData['chart1'].seriesData.map(data => data.value)}
        />
      </div>
      <div className={'chart-with-picker'}>
        <Picker
          setSelected={setSelectedDates2}
          dates={initialDates2}
        />
        <Chart
          chartName={'Chart2'}
          selectedDates={selectedDates2}
          values={mockData['chart2'].seriesData.map(data => data.value)}
        />
      </div>
    </div>
  ) : (
    <>No data for charts</>
  );
};
