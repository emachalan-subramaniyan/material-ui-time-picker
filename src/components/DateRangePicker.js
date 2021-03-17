import * as React from 'react';
import {
  addMonths,
  isSameDay,
  isWithinRange,
  isAfter,
  isBefore,
  isSameMonth,
  addYears,
  max,
  min,
} from 'date-fns';
import moment from 'moment';

import { getValidatedMonths, parseOptionalDate } from '../utils';

import { defaultRanges } from '../defaults';

import Menu from './Menu';

export const MARKERS = {
  FIRST_MONTH: 'firstMonth',
  SECOND_MONTH: 'secondMonth',
};

const DateRangePicker = (
  props
) => {
  const today = new Date();

  const {
    open,
    onChange,
    initialDateRange,
    minDate,
    maxDate,
    definedRanges = defaultRanges,
    maxNext,
    maxPrev,
    restrictDays,
    insertedStartDate,
    insertedEndDate,
    defaultRange
  } = props;

  const minDateValid = parseOptionalDate(minDate, addYears(today, -10));
  const maxDateValid = parseOptionalDate(maxDate, addYears(today, 10));
  const [intialFirstMonth, initialSecondMonth] = getValidatedMonths(
    initialDateRange || {},
    minDateValid,
    maxDateValid,
  );
  
  const [dateRange, setDateRange] = React.useState({ ...initialDateRange });
  const [hoverDay, setHoverDay] = React.useState();
  const [firstMonth, setFirstMonth] = React.useState(intialFirstMonth || today);
  const [secondMonth, setSecondMonth] = React.useState(
    initialSecondMonth || addMonths(firstMonth, 1),
    );

  React.useEffect(() => {
    if(insertedStartDate){
      let d = new Date(insertedStartDate);
      let date = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();
      let newDate = month+'/'+date+'/'+year
      setFirstMonth(new Date(newDate))
    }
  },[insertedStartDate]);

  React.useEffect(() => {
    if(insertedStartDate && insertedEndDate){
      if(compare(insertedEndDate,insertedStartDate) >= 0 ){
        let startdates = new Date(insertedStartDate);
        let enddates = new Date(insertedEndDate);
        let startdate = startdates.getDate();
        let startmonth = startdates.getMonth() + 1;
        let startyear = startdates.getFullYear();
        let enddate = enddates.getDate();
        let endmonth = enddates.getMonth() + 1;
        let endyear = enddates.getFullYear();
        let startnewDate = startmonth+'/'+startdate+'/'+startyear  
        let endnewDate = endmonth+'/'+enddate+'/'+endyear
        let data = {
          startDate: new Date(startnewDate),
          label: null,
          endDate: new Date(endnewDate)
        }
        setDateRange(data)
        setSecondMonth(new Date(endnewDate))
      }else{
        let data = {
          startDate: null,
          label: null,
          endDate: null
        }
        setDateRange(data)
      }
    }
  },[insertedStartDate && insertedEndDate]);
  
    const { startDate, endDate } = dateRange;
    
    const compare = (dateTimeA, dateTimeB) => {
      var momentA = moment(dateTimeA,"DD/MM/YYYY");
      var momentB = moment(dateTimeB,"DD/MM/YYYY");
      if (momentA > momentB) return 1;
      else if (momentA < momentB) return -1;
      else return 0;
    }

  // handlers
  const setFirstMonthValidated = (date) => {
    if (isBefore(date, secondMonth)) {
      setFirstMonth(date);
    }
  };

  const setSecondMonthValidated = (date) => {
    if (isAfter(date, firstMonth)) {
      setSecondMonth(date);
    }
  };

  const setDateRangeValidated = (range) => {
    let { startDate: newStart, endDate: newEnd } = range;

    if (newStart && newEnd) {
      range.startDate = newStart = max(newStart, minDateValid);
      range.endDate = newEnd = min(newEnd, maxDateValid);

      setDateRange(range);
      onChange(range);

      setFirstMonth(newStart);
      setSecondMonth(isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd);
    } else {
      const emptyRange = {};

      setDateRange(emptyRange);
      onChange(emptyRange);

      setFirstMonth(today);
      setSecondMonth(addMonths(firstMonth, 1));
    }
  };

  const onDayClick = (day) => {
    if (startDate && !endDate && !isBefore(day, startDate)) {
      const newRange = { startDate, endDate: day };
      onChange(newRange);
      setDateRange(newRange);
    } else {
      setDateRange({ startDate: day, endDate: undefined });
      !defaultRange && onChange({ startDate: day, endDate: undefined });
    }
    setHoverDay(day);
  };

  const onMonthNavigate = (marker, action) => {
    if (marker === MARKERS.FIRST_MONTH) {
      const firstNew = addMonths(firstMonth, action);
      if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
    } else {
      const secondNew = addMonths(secondMonth, action);
      if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
    }
  };

  const onDayHover = (date) => {
    if (startDate && !endDate) {
      if (!hoverDay || !isSameDay(date, hoverDay)) {
        setHoverDay(date);
      }
    }
  };

  // helpers
  const inHoverRange = (day) => (startDate
      && !endDate
      && hoverDay
      && isAfter(hoverDay, startDate)
      && isWithinRange(day, startDate, hoverDay));

  const helpers = {
    inHoverRange,
  };

  const handlers = {
    onDayClick,
    onDayHover,
    onMonthNavigate,
  };

  return open ? (
    <Menu
      range={defaultRange}
      dateRange={dateRange}
      minDate={minDateValid}
      maxDate={maxDateValid}
      ranges={definedRanges}
      firstMonth={firstMonth}
      secondMonth={secondMonth}
      setFirstMonth={setFirstMonthValidated}
      setSecondMonth={setSecondMonthValidated}
      setDateRange={setDateRangeValidated}
      helpers={helpers}
      handlers={handlers}
      maxNextProps={maxNext}
      maxPrevProps={maxPrev}
      restrictDaysProps={restrictDays}
      includeRelativeDate={props.includeRelativeDate}
    />
  ) : null;
};

export default DateRangePicker;
