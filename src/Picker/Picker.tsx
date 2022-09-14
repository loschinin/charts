import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from '@mui/material';
import moment from 'moment/moment';
import { Data } from '../Chart/Chart';

const getValueOfDate = (date: Date | string) => {
  return new Date(moment(date).format('ddd D MMM')).valueOf();
}

type Props = {
  mockData: Data[];
  setSelected(data: Data[]): void;
};

export const Picker = ({ mockData, setSelected }: Props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
      <Button
        className={'date-picker-button'}
        onClick={handleConfirmPeriod}
        variant={'contained'}
      >
        confirm period
      </Button>
    </div>
  );

  function handleConfirmPeriod() {
    const filteredData = mockData.filter((obj: { name: string }) => {
      const d = getValueOfDate(obj.name);
      return (
        d >= getValueOfDate(startDate) &&
        d <= getValueOfDate(endDate || startDate)
      );
    });
    setSelected(filteredData);
  }
};
