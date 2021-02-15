import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { duration, easing } from '@material-ui/core/styles/transitions'
import { getContrastRatio, fade } from '@material-ui/core/styles/colorManipulator'
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames'
import Clock from './Clock'
import { formatHours, twoDigits } from './util';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import {Event, AccessAlarm } from '@material-ui/icons';
import { DateRangePicker, DateRange } from "materialui-daterange-picker";
// import ChevronLeft from '@material-ui/icons/ChevronLeft';

const styles = (theme) => ({
  root: {
    width: "100%",
    minWidth: 250,
    fontFamily: theme.typography.fontFamily,
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    background: theme.palette.primary.main,
    color: fade(getContrastRatio(theme.palette.primary.main, theme.palette.common.black) < 7 ? theme.palette.common.white : theme.palette.common.black, 0.54),
    padding: '20px 0',
    lineHeight: '58px',
    fontSize: '58px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    userSelect: 'none',
    alignItems: 'center'
  },
  time: {
    transition: `all ${duration.short}ms ${easing.easeInOut}`,
    cursor: 'pointer',
    height: 20,
  },
  placeholder: {
    flex: 1,
  },
  ampm: {
    display: 'flex',
    flexDirection: 'column-reverse',
    flex: 1,
    // fontSize: '14px',
    // lineHeight: '20px',
    // marginLeft: 16,
    // fontWeight: 700
  },
  select: {
    color: getContrastRatio(theme.palette.primary.main, theme.palette.common.black) < 7
    ? theme.palette.common.black : theme.palette.common.black
  },
  body: {
    padding: '24px 16px',
    background: theme.palette.background.paper
  },
  flex_con: {
    display: 'flex',
    alignItems: 'center'
  },
  time_con: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginRight: 12,
    marginLeft: 12
  },
  icon_style: {
    padding: 10,
    cursor: 'pointer'
  },
  paper_con: {
    display: 'flex',
    // minWidth: 300,
    maxWidth: "50%",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginLeft: 3,
    marginRight: 3
  },
  paper_con1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    padding: 16
  },
  header_title: {
    padding: 20
  },
  divider_style: {
    width: '100%'
  },
  custombtn_style: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
    padding: 15
  },
  box_style: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  },
  textinput_style: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginRight: '20px',
    marginBottom: '5px'
  },
  timecon_style: {
    display: 'flex',
  }
})

class DateTimePicker extends React.Component {
  constructor (props) {
    super(props)

    const defaultValue = new Date()
    defaultValue.setSeconds(0)
    defaultValue.setMilliseconds(0)
    const time = props.value || props.defaultValue || defaultValue
    this.state = {
      select: 'h',
      starthours: time.getHours() % 12,
      endhours: time.getHours() % 12,
      startminutes: time.getMinutes(),
      endminutes: time.getMinutes(),
      startsession: time.getHours() >= 12 ? "PM" : "AM",
      endsession: time.getHours() >= 12 ? "PM" : "AM",
      opendate: false,
      opentime: false,
      startdate: null,
      enddate: null,
      starttime: null,
      endtime: null,
    }
  }

  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.value != null && (this.props.value == null || nextProps.value.getTime() !== this.props.value.getTime())) {
  //     this.setState({
  //       hours: nextProps.value.getHours(),
  //       minutes: nextProps.value.getMinutes()
  //     })
  //   }
  // }

  // handleClockChange = (value) => {
  //   if (this.state.select === 'h') {
  //     if (this.props.mode === '12h') {
  //       if (this.state.hours >= 12) {
  //         this.setState({ hours: value === 12 ? value : value + 12 }, this.propagateChange)
  //       } else {
  //         this.setState({ hours: value === 12 ? 0 : value }, this.propagateChange)
  //       }
  //     } else {
  //       this.setState({ hours: value }, this.propagateChange)
  //     }
  //   } else {
  //     this.setState({ minutes: value }, () => {
  //       this.propagateChange()
  //     })
  //   }
  // }

  // handleClockChangeDone = (e) => {
  //   e.preventDefault() // prevent mouseUp after touchEnd

  //   if (this.state.select === 'm') {
  //     if (this.props.onMinutesSelected) {
  //       setTimeout(() => {
  //         this.props.onMinutesSelected()
  //       }, 300)
  //     }
  //   } else {
  //     setTimeout(() => {
  //       this.setState({ select: 'm' })
  //     }, 300)
  //   }
  // }

  editHours = () => this.setState({ select: 'h' })

  editMinutes = () => this.setState({ select: 'm' })

  // setAm = () => {
  //   if (this.state.hours >= 12) {
  //     this.setState({ hours: this.state.hours - 12 }, this.propagateChange)
  //   }
  // }

  setPm = (data) => {
    if (data === "start") {
      this.setState({ startsession: this.state.startsession === "PM" ? "AM" : "PM" }, this.propagateChange)
    }else{
      this.setState({ endsession: this.state.endsession === "PM" ? "AM" : "PM" }, this.propagateChange)
    }
  }

  onNowPress = (data) => {
    const times = new Date();
    if(data === 'start'){
      this.setState({
        starthours: times.getHours() % 12,
        startminutes: times.getMinutes(),
        startsession: times.getHours() >= 12 ? "PM" : "AM",
      }, this.propagateChange)
    }else{
      this.setState({
        endhours: times.getHours() % 12,
        endminutes: times.getMinutes(),
        endsession: times.getHours() >= 12 ? "PM" : "AM"
      }, this.propagateChange)
    }
  }

  onHandleUpPress = (data, part) => {
    if(data === 'start' && part === 'hours'){
      this.setState({starthours: this.state.starthours + 1}, this.propagateChange)
    }else if(data === 'start' && part === 'minutes'){
      this.setState({startminutes: this.state.startminutes + 1}, this.propagateChange)
    }else if(data === "end" && part === 'hours'){
      this.setState({endhours: this.state.endhours + 1}, this.propagateChange)
    }else if(data === "end" && part === 'minutes'){
      this.setState({endminutes: this.state.endminutes + 1}, this.propagateChange)
    }
  }

  onHandleDownPress = (data, part) => {
    if(data === 'start' && part === 'hours'){
      this.setState({starthours: this.state.starthours - 1}, this.propagateChange)
    }else if(data === 'start' && part === 'minutes'){
      this.setState({startminutes: this.state.startminutes - 1}, this.propagateChange)
    }else if(data === "end" && part === 'hours'){
      this.setState({endhours: this.state.endhours - 1}, this.propagateChange)
    }else if(data === "end" && part === 'minutes'){
      this.setState({endminutes: this.state.endminutes - 1}, this.propagateChange)
    }
  }

  onTimePress = (data) => {
    if(data === 'start'){
      this.setState({
        starthours: 12,
        startminutes: 0,
        startsession: "AM",
      }, this.propagateChange)
    }else{
      this.setState({
        endhours: 12,
        endminutes: 0,
        endsession: "AM"
      }, this.propagateChange)
    }
  }

  onDateIconClick = () => {
    this.setState({ opendate: !this.state.opendate, opentime: false})
  }

  onTimeIconClick = () => {
    this.setState({ opendate: false, opentime: !this.state.opentime})
  }

  toggle = () => this.setState({ opendate: !this.state.opendate, opentime: false});


  onDateChange = (data) => {
    this.setState({startdate: data.startDate.toLocaleDateString(), enddate: data.endDate.toLocaleDateString()});
    this.props.onDateChange(data);
    this.setState({ opendate: !this.state.opendate, opentime: false});
  }

  propagateChange = () => {
    const {starthours, startminutes, startsession, endhours, endminutes, endsession} = this.state;
    this.setState({
      starttime: `${twoDigits(starthours)}:${twoDigits(startminutes)} ${startsession}`,
      endtime: `${twoDigits(endhours)}:${twoDigits(endminutes)} ${endsession}`
    })
    if (this.props.onChange != null) {
      const date = {
      starttime: `${twoDigits(starthours)}:${twoDigits(startminutes)} ${startsession}`,
      endtime: `${twoDigits(endhours)}:${twoDigits(endminutes)} ${endsession}`
      }
      this.props.onChange(date)
    }
  }

  render () {
    const {
      classes,
      ClockProps
    } = this.props
    const {  isPm } = formatHours(this.state.hours, '12')

    return (
      <div className={classes.root}>
        <Box borderRadius="2%" border={1} className={classes.box_style}>
          <div className={classes.textinput_style}>
            <TextField
              id="startdatetime"
              label={ this.state.startdate === null && "Start Date & Time"}
              value={this.state.startdate && this.state.starttime ?
                this.state.startdate + ' ' + this.state.starttime :
                this.state.startdate && this.state.starttime === null ? this.state.startdate : null}
            />
            <Event onClick={() => this.onDateIconClick()} />
            {this.props.enableTimePicker && <AccessAlarm onClick={() => this.onTimeIconClick()} />}
          </div>
          <div className={classes.textinput_style}>
            <TextField
              id="enddatetime"
              label={this.state.enddate === null && "End Date & Time"}
              value={this.state.enddate && this.state.endtime ?
                this.state.enddate + ' ' + this.state.endtime :
                this.state.enddate && this.state.endtime === null ? this.state.enddate : null}
            />
            <Event onClick={() => this.onDateIconClick()} />
            {this.props.enableTimePicker && <AccessAlarm onClick={() => this.onTimeIconClick()} />}
          </div>
        </Box>
        <div>
          <DateRangePicker
            open={this.state.opendate}
            closeOnClickOutside
            toggle={this.toggle}
            onChange={(range) => this.onDateChange(range)}
          />
        </div>
        {this.props.enableTimePicker && this.state.opentime && <div className={classes.timecon_style}>
          <Paper elevation={3} className={classes.paper_con}>
          <Typography variant="body2" align="center" className={classes.header_title}>
            Start Time
          </Typography>
          <Divider orientation="horizontal" variant="fullWidth" light={true} className={classes.divider_style} />
          <div className={classes.custombtn_style}>
            <Typography variant="body2" align="left" onClick={() => this.onTimePress('start')}>
              12:00 AM
            </Typography>
            <Typography variant="body2" align="right" onClick={() => this.onNowPress('start')}>
              Now
            </Typography>
          </div>
          <Divider orientation="horizontal" variant="fullWidth" light={true} className={classes.divider_style} />
          <div className={classes.paper_con1}>
          <div className={classes.time_con}>
            <Typography align="center">
              Hours
            </Typography>
            <svg onClick={() => this.state.starthours <= 11 && this.onHandleUpPress("start", "hours")}xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
               id="up" size="16" color="currentColor" viewBox="0 0 24 24" className={classes.icon_style}>
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
            <span
              className={classNames(classes.time, { [classes.select]:  'active' })}
              // onClick={this.editHours}
            >
              {twoDigits(this.state.starthours)}
            </span>
            <svg onClick={() => this.state.starthours >= 1 &&  this.onHandleDownPress("start", "hours")} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
               id="down" size="16" color="currentColor" viewBox="0 0 24 24" className={classes.icon_style}>
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
              <path fill="none" d="M0 0h24v24H0V0z"></path>
            </svg>
          </div> :
          <div className={classes.time_con}>
            <Typography align="center">
                Minutes
              </Typography>
              <svg  onClick={() => this.state.startminutes <= 58 && this.onHandleUpPress("start", "minutes")} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                 id="up" size="16" color="currentColor" viewBox="0 0 24 24" className={classes.icon_style}>
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </svg>
              <span
                className={classNames(classes.time, { [classes.select]:'active' })}
                // onClick={this.editMinutes}
              >
                {twoDigits(this.state.startminutes)}
              </span>
              <svg  onClick={() => this.state.startminutes >= 1 &&  this.onHandleDownPress("start", "minutes")} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                 id="up" size="16" color="currentColor" viewBox="0 0 24 24" className={classes.icon_style}>
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                <path fill="none" d="M0 0h24v24H0V0z"></path>
              </svg>
            </div>:
              <div className={classes.time_con}>
                <Typography align="center">
                AM/PM
              </Typography>
              <svg  onClick={() => this.setPm("start")} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                 id="up" size="16" color="currentColor" viewBox="0 0 24 24" className={classes.icon_style}>
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </svg>
              <span
                className={classNames(classes.time, { [classes.select]: isPm })}
                onClick={this.setPm}
              >
                <Typography variant="body2" align="center">
                  {this.state.startsession}
                </Typography>
              </span>
              <svg  onClick={() => this.setPm("start")} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                 id="up" size="16" color="currentColor" viewBox="0 0 24 24" className={classes.icon_style}>
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                <path fill="none" d="M0 0h24v24H0V0z"></path>
              </svg>
              </div>
              </div>
        </Paper>
        <Paper elevation={3} className={classes.paper_con}>
          <Typography variant="body2" align="center" className={classes.header_title}>
            End Time
          </Typography>
          <Divider orientation="horizontal" variant="fullWidth" light={true} className={classes.divider_style} />
          <div className={classes.custombtn_style}>
            <Typography variant="body2" align="left" onClick={() => this.onTimePress('end')}>
              12:00 AM
            </Typography>
            <Typography variant="body2" align="right" onClick={() => this.onNowPress('end')}>
              Now
            </Typography>
          </div>
          <Divider orientation="horizontal" variant="fullWidth" light={true} className={classes.divider_style} />
          <div className={classes.paper_con1}>
          <div className={classes.time_con}>
            <Typography align="center">
              Hours
            </Typography>
            <svg onClick={() => this.state.endhours <= 11 && this.onHandleUpPress("end", "hours")}xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
               id="up" size="16" color="currentColor" viewBox="0 0 24 24" className={classes.icon_style}>
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
            <span
              className={classNames(classes.time, { [classes.select]:  'active' })}
              onClick={this.editHours}
            >
              {twoDigits(this.state.endhours)}
            </span>
            <svg onClick={() => this.state.endhours >= 1 && this.onHandleDownPress("end", "hours")} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                id="down" size="16" color="currentColor" viewBox="0 0 24 24" className={classes.icon_style}>
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
              <path fill="none" d="M0 0h24v24H0V0z"></path>
            </svg>
          </div> :
          <div className={classes.time_con}>
            <Typography align="center">
                Minutes
              </Typography>
              <svg  onClick={() => this.state.endminutes <= 58 && this.onHandleUpPress("end", "minutes")} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                 id="up" size="16" color="currentColor" viewBox="0 0 24 24" className={classes.icon_style}>
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </svg>
              <span
                className={classNames(classes.time, { [classes.select]:'active' })}
                // onClick={this.editMinutes}
              >
                {twoDigits(this.state.endminutes)}
              </span>
              <svg  onClick={() => this.state.endminutes >= 1 && this.onHandleDownPress("end", "minutes")} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                 id="up" size="16" color="currentColor" viewBox="0 0 24 24" className={classes.icon_style}>
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                <path fill="none" d="M0 0h24v24H0V0z"></path>
              </svg>
            </div>:
              <div className={classes.time_con}>
              <Typography align="center">
                AM/PM
              </Typography>
              <svg  onClick={() => this.setPm("end")} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                 id="up" size="16" color="currentColor" viewBox="0 0 24 24" className={classes.icon_style}>
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </svg>
              <span
                className={classNames(classes.time, { [classes.select]: isPm })}
                onClick={this.setPm}
              >
                <Typography color={'textPrimary'} variant="body2" align="center">
                  {this.state.endsession}
                </Typography>
              </span>
              <svg  onClick={() => this.setPm("end")} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                 id="up" size="16" color="currentColor" viewBox="0 0 24 24" className={classes.icon_style}>
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                <path fill="none" d="M0 0h24v24H0V0z"></path>
              </svg>
              </div>
              </div>
      </Paper></div> }
      </div>
    )
  }
}

DateTimePicker.propTypes = {
  /** The initial value of the time picker. */
  defaultValue: PropTypes.instanceOf(Date),
  /** Sets the clock mode, 12-hour or 24-hour clocks are supported. */
  /** Callback that is called with the new date (as Date instance) when the value is changed. */
  onDateChange: PropTypes.func,
  onChange: PropTypes.func,
  /** Callback that is called when the minutes are changed. Can be used to automatically hide the picker after selecting a time. */
  onMinutesSelected: PropTypes.func,
  /** The value of the time picker, for use in controlled mode. */
  value: PropTypes.instanceOf(Date),
  /** Properties to pass down to the Clock component */
  ClockProps: PropTypes.object
}

export default withStyles(styles)(DateTimePicker)
