import * as React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';

import TimePickerComponent from './TimePickerComponent';

const useStyles = makeStyles(() => ({
  dateRangePickerContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  dateRangePicker: {
    position: 'fixed',
    zIndex: 1,
  },
  dateRangeBackdrop: {
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    bottom: 0,
    zIndex: 0,
    right: 0,
    left: 0,
    top: 0,
  },
}));

const TimePickerWrapper = (
  props
) => {
  const classes = useStyles();

  const {
    closeOnClickTimeOutside,
    wrapperClassName,
    timetoggle,
    opentime,
  } = props;

  const handleToggle = () => {
    if (closeOnClickTimeOutside === false) {
      return;
    }

    timetoggle();
  };

  const handleKeyPress = (event) => event && event.key === 'Escape' && handleToggle();

  const wrapperClasses = classNames(classes.dateRangePicker, wrapperClassName);

  return (
    <div className={classes.dateRangePickerContainer}>
      {
        opentime && (
          <div
            className={classes.dateRangeBackdrop}
            onKeyPress={handleKeyPress}
            onClick={handleToggle}
          />
        )
      }

      <div className={wrapperClasses}>
        <TimePickerComponent {...props} />
      </div>
    </div>
  );
};

export default TimePickerWrapper;
