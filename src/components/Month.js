import * as React from 'react';
import {
  Paper,
  Grid,
  Typography,
  makeStyles,
  Box
} from '@material-ui/core';
import {
  setMonth,
  getMonth,
  getDate,
  isSameMonth,
  isToday,
  format,
  isWithinRange,
} from 'date-fns';
import {
  chunks,
  getDaysInMonth,
  isStartOfRange,
  isEndOfRange,
  inDateRange,
  isRangeSameDay,
} from '../utils';
import Header from './Header';
import Day from './Day';

const NavigationAction = {
  Previous: -1,
  Next: 1
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];


const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const useStyles = makeStyles((theme) => ({
  root: {
    width: 290,
  },
  weekDaysContainer: {
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "space-between",
  },
  daysContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    marginBottom: 20,
  },
  month_style: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    width: 20,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    cursor: 'pointer'
  }
}));

const Month = (props) => {
  const classes = useStyles();
  const[monthClicked, setmonthClicked] = React.useState(null)
  const {
    helpers,
    handlers,
    value: date,
    dateRange,
    marker,
    setValue: setDate,
    minDate,
    maxDate,
    onPrevIconClick,
    onNextIconClick,
    restrictDays,
  } = props;

  const onMonthClick = (data) => {
    setDate(setMonth(date, data));
    setmonthClicked(null);
  }

  const [back, forward] = props.navState;
  let startIndex = restrictDays && WEEK_DAYS.indexOf(restrictDays.firstday);
  let endIndex = restrictDays && WEEK_DAYS.indexOf(restrictDays.lastday);
  const WEEK_HEAD = restrictDays ? WEEK_DAYS.slice(startIndex, endIndex + 1) : WEEK_DAYS;
  return (
    <Paper square elevation={0} className={classes.root}>
      <Grid container>
        <Header
          date={date}
          setDate={setDate}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={onPrevIconClick}
          onClickNext={onNextIconClick}
          marker={marker}
          // monthSelClick={(event) => {setDate(setMonth(date, parseInt(event.target.value)))}}
          monthSelClick={(data) => monthClicked ? setmonthClicked(null) : setmonthClicked(data)}
        />

        <Grid
          item
          container
          direction="row"
          justify="space-between"
          className={classes.weekDaysContainer}
        >
          { monthClicked && monthClicked === marker ?
          null
          : WEEK_HEAD.map((day) => (
            <Typography color="textSecondary" key={day} variant="caption">
              {day}
            </Typography>
          ))}
        </Grid>

        <Grid
          item
          container
          direction="column"
          justify="space-between"
          className={classes.daysContainer}
        >
          {monthClicked && monthClicked === marker ?
            <Grid
              item
              container
              direction="row"
              justify="space-between"
              className={classes.weekDaysContainer}
            >
            {MONTHS.map((month, idx) => (
              <Box
                bgcolor={getMonth(date) === idx ? "info.main" : "text.disabled"}
                color="background.paper" p={2}
                onClick={() => onMonthClick(idx)}
                className={classes.month_style}
              >
              {month}
            </Box>
          ))}
            </Grid>
          : chunks(getDaysInMonth(date), 7).map((week, idx) => {
            // eslint-disable-next-line react/no-array-index-key
            // const i1 = restrictDays && week.indexOf(restrictDays.firstday);
            // const i2 = restrictDays && week.indexOf(restrictDays.lastday);
            let week_days = restrictDays ? week.slice(startIndex, endIndex+1) : week;
            return(<Grid key={idx} container direction="row" justify="space-between">
              {week_days.map((day) => {
                const isStart = isStartOfRange(dateRange, day);
                const isEnd = isEndOfRange(dateRange, day);
                const isRangeOneDay = isRangeSameDay(dateRange);
                const highlighted = inDateRange(dateRange, day) || helpers.inHoverRange(day);

                return (
                  <Day
                    key={format(day, 'MM-DD-YYYY')}
                    filled={isStart || isEnd}
                    outlined={isToday(day)}
                    highlighted={highlighted && !isRangeOneDay}
                    disabled={
                      !isSameMonth(date, day)
                      || !isWithinRange(day, minDate, maxDate)
                    }
                    startOfRange={isStart && !isRangeOneDay}
                    endOfRange={isEnd && !isRangeOneDay}
                    onClick={() => handlers.onDayClick(day)}
                    onHover={() => handlers.onDayHover(day)}
                    value={getDate(day)}
                  />
                );
              })}
            </Grid>)
        })}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Month;
