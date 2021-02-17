import React, {useState} from 'react';
import {
  Paper,
  Grid,
  Typography,
  Divider,
  makeStyles,
} from '@material-ui/core';
import { format, differenceInCalendarMonths } from 'date-fns';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import Month from './Month';
import DefinedRanges from './DefinedRanges';
import { MARKERS } from './DateRangePicker';

const NavigationAction = {
  Previous: -1,
  Next: 1
}

const useStyles = makeStyles((theme) => ({
  header: {
    padding: '20px 70px',
  },
  headerItem: {
    flex: 1,
    textAlign: 'center',
  },
  divider: {
    borderLeft: `1px solid ${theme.palette.action.hover}`,
    marginBottom: 20,
  },
}));

const Menu = (props) => {
  const classes = useStyles();
  const[state, setState] = useState({
    prev: 0,
    next: 0,
  })
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
    maxNextProps,
    maxPrevProps,
    restrictDaysProps
  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange, minDate, maxDate, helpers, handlers,
  };

  const onPrevClick = (data, nav, item) => {
    item === 'second' && setState({...state, next: state.next - 1});
    if(item === 'first' && maxPrevProps < state.prev+1){
    }else{
      item === 'first' && setState({...state, prev: state.prev + 1});
      handlers.onMonthNavigate(data, nav)  
    }
  }

  const onNextClick = (data, nav, item) => {
    item === 'first' && setState({...state, prev: state.prev - 1});
    if(item === 'second' && maxNextProps < state.next + 1){
    }else{
      item === 'second' && setState({...state, next: state.next + 1});
      handlers.onMonthNavigate(data, nav)
    }
  }

  return (
    <Paper elevation={5} square>
      <Grid container direction="row" wrap="nowrap">
        <Grid>
          <Grid container className={classes.header} alignItems="center">
            <Grid item className={classes.headerItem}>
              <Typography variant="subtitle1">
                {startDate ? format(startDate, 'MMMM DD, YYYY') : 'Start Date'}
              </Typography>
            </Grid>
            <Grid item className={classes.headerItem}>
              <ArrowRightAlt color="action" />
            </Grid>
            <Grid item className={classes.headerItem}>
              <Typography variant="subtitle1">
                {endDate ? format(endDate, 'MMMM DD, YYYY') : 'End Date'}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="row" justify="center" wrap="nowrap">
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
              onPrevIconClick={() => onPrevClick(MARKERS.FIRST_MONTH, NavigationAction.Previous, 'first')}
              onNextIconClick={() => onNextClick(MARKERS.FIRST_MONTH, NavigationAction.Next, 'first')}
              restrictDays={restrictDaysProps}
            />
            <div className={classes.divider} />
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
              onPrevIconClick={() => onPrevClick(MARKERS.SECOND_MONTH, NavigationAction.Previous, 'second')}
              onNextIconClick={() => onNextClick(MARKERS.SECOND_MONTH, NavigationAction.Next, 'second')}
              restrictDays={restrictDaysProps}
            />
          </Grid>
        </Grid>
        <div className={classes.divider} />
        <Grid>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Menu;
