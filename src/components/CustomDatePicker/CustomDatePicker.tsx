import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from '@mui/material';
import moment from 'moment/moment';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css';

const getValueOfDate = (date: Date | string) => {
  return new Date(moment(date).format('YYYY-MM-DD')).valueOf();
};

type Props = {
  dates: string[];
  setSelected(data: string[]): void;
};

export const CustomDatePicker = ({ dates, setSelected }: Props) => {
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
        className={'date-picker'}
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
      <Button onClick={handleConfirmPeriod} variant={'contained'}>
        confirm period
      </Button>
    </div>
  );

  function handleConfirmPeriod() {
    const filteredDates = dates.filter(date => {
      const dateValue = getValueOfDate(date);
      return (
        dateValue >= getValueOfDate(startDate) && dateValue <= getValueOfDate(endDate || startDate)
      );
    });
    setSelected(filteredDates);
  }
};
