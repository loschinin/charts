import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from '@mui/material';
import moment from 'moment/moment';

const getValueOfDate = (date: Date | string) => {
  return new Date(moment(date).format('ddd D MMM')).valueOf();
};

type Props = {
  dates: string[];
  setSelected(data: string[]): void;
};

export const Picker = ({ dates, setSelected }: Props) => {
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
    const filteredDates = dates.filter(date => {
      const dateValue = getValueOfDate(date);
      return (
        dateValue >= getValueOfDate(startDate) &&
        dateValue <= getValueOfDate(endDate || startDate)
      );
    });
    console.log('filteredDates', filteredDates);
    setSelected(filteredDates);
  }
};
