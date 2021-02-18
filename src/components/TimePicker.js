import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { duration, easing } from '@material-ui/core/styles/transitions'
import { getContrastRatio } from '@material-ui/core/styles/colorManipulator'
import {Paper, Divider, Typography, Grid} from "@material-ui/core";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames'
import { formatHours, twoDigits } from '../util';

const styles = (theme) => ({
  time: {
    transition: `all ${duration.short}ms ${easing.easeInOut}`,
    cursor: 'pointer',
    height: 20,
  },
  select: {
    color: getContrastRatio(theme.palette.primary.main, theme.palette.common.black) < 7
    ? theme.palette.common.black : theme.palette.common.black
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
    minWidth: 250,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
})

class TimePicker extends React.Component {
  constructor (props) {
    super(props)
    this.wrapperRef = React.createRef();

    const defaultValue = new Date()
    defaultValue.setSeconds(0)
    defaultValue.setMilliseconds(0)
    const time = props.value || props.defaultValue || defaultValue
    this.state = {
      select: 'h',
      starthours: this.getinitialState("time"),
      endhours: this.getinitialState("time"),
      startminutes: time.getMinutes(),
      endminutes: time.getMinutes(),
      startsession: this.getinitialState("session"),
      endsession: this.getinitialState("session"),
      opendate: false,
      opentime: false,
      startdate: null,
      enddate: null,
      starttime: null,
      endtime: null,
    }
  }

  getinitialState = (data) => {
    const defaultValue = new Date()
    defaultValue.setSeconds(0)
    defaultValue.setMilliseconds(0)
    const time = this.props.value || this.props.defaultValue || defaultValue
    if(data === "time"){
      if(this.props.timemode && parseInt(this.props.timemode) === 24){
        return time.getHours();
      }else if(this.props.restrictTime){
        return this.props.restrictTime.starttime
      }else{
        return parseInt(this.props.timemode) === 12 ? time.getHours() % 12 : new Date().getHours()
      }
    }else{
      if(this.props.restrictTime){
        return this.props.restrictTime.starttime >= 12 ? "PM" : "AM";
      }else{
        return parseInt(this.props.timemode) === 12 && time.getHours() >= 12 ? "PM" : "AM"
      }
    }
  }

  setPm = (data) => {
    if (data === "start") {
      if(this.state.startsession === 'PM'){
        this.setState({
          startsession: "AM",
          starthours: this.props.restrictTime ? this.props.restrictTime.starttime : this.state.starthours,
          endhours: this.props.restrictTime ? this.props.restrictTime.starttime : this.state.starthours,
          endminutes: this.state.startminutes,
          endsession: "AM",
        }, this.propagateChange);
      }else{
        this.setState({
          startsession: "PM",
          starthours: this.props.restrictTime && this.props.restrictTime.endtime ? Number(this.props.restrictTime.endtime) - 1 : this.state.starthours,
          startminutes: 59,
          endhours: this.props.restrictTime && this.props.restrictTime.endtime ? Number(this.props.restrictTime.endtime) - 1 : this.state.starthours,
          endminutes: 59,
          endsession: "PM",
        }, this.propagateChange);
      }
    }else{
      if(this.props.restrictTime && this.state.endsession === 'AM' && this.state.starthours <= this.state.endhours){
        this.setState({endhours: this.props.restrictTime.endtime - 1, endsession: "PM"})
      }else{
        this.setState({ endsession: this.state.endsession === "PM" ? "AM" : "PM" }, this.propagateChange);
      }

    }
  }

  onNowPress = (data) => {
    const times = new Date();
    if(data === 'start'){
      if(this.props.timemode && parseInt(this.props.timemode) === 24){
        this.setState({
          starthours: times.getHours(),
          startminutes: times.getMinutes(),
        }, this.propagateChange)
      }else{
        this.setState({
          starthours: times.getHours() % 12,
          startminutes: times.getMinutes(),
          startsession: times.getHours() >= 12 ? "PM" : "AM",
        }, this.propagateChange)
      }
    }else{
      if(this.props.timemode && parseInt(this.props.timemode) === 24){
        this.setState({
          endhours: times.getHours(),
          endminutes: times.getMinutes(),
        }, this.propagateChange)
      }else{
      this.setState({
        endhours: times.getHours() % 12,
        endminutes: times.getMinutes(),
        endsession: times.getHours() >= 12 ? "PM" : "AM"
      }, this.propagateChange)
      }
    }
  }

  onHandleUpPress = (data, part) => {
    if(data === 'start' && part === 'hours'){
      this.setState({
        starthours: this.state.starthours + 1,
        endhours: this.state.starthours + 1,
        endminutes: this.state.startminutes,
        endsession: this.state.startsession
      }, this.propagateChange)
    }else if(data === 'start' && part === 'minutes'){
      this.setState({startminutes: this.state.startminutes + 1, endminutes: this.state.startminutes + 1}, this.propagateChange)
    }else if(data === "end" && part === 'hours'){
      if(this.props.timemode && parseInt(this.props.timemode) === 24 && this.props.restrictTime && this.props.restrictTime.endtime <= this.state.endhours +1 ){
        // console.log('blocked for above timemode 24 hr restriction');
      }else if(this.state.endsession === 'PM' &&
        this.props.restrictToDayTime && this.props.restrictTime &&
        this.props.restrictTime.endtime > this.state.endhours){

        }else{
        this.setState({endhours: this.state.endhours + 1}, this.propagateChange)
        }
    }else if(data === "end" && part === 'minutes'){
      this.setState({endminutes: this.state.endminutes + 1}, this.propagateChange)
    }
  }

  onHandleDownPress = (data, part) => {
    if(data === 'start' && part === 'hours'){
      if(this.props.restrictToDayTime && this.state.startdate === this.state.enddate && this.state.startsession === "AM" &&
      this.props.restrictTime && this.state.starthours - 1 < this.props.restrictTime.starttime ){
        // console.log('yes happen');
      }else if(this.props.restrictToDayTime && this.props.restrictTime && this.props.restrictTime.starttime >= this.state.starthours){
        // console.log('yes u got it');
      }else{
        // console.log('start hour', this.state.starthours -1 );
        this.setState({
          starthours: this.state.starthours - 1,
          endhours: this.state.starthours - 1,
          endminutes: this.state.startminutes,
          endsession: this.state.startsession
        }, this.propagateChange)
      }
    }else if(data === 'start' && part === 'minutes'){
      this.setState({
        startminutes: this.state.startminutes - 1,
        endhours: this.state.starthours,
        endminutes: this.state.startminutes - 1,
        endsession: this.state.startsession
      }, this.propagateChange)
    }else if(data === "end" && part === 'hours'){
      // console.log('this.state.starthours', this.state.starthours, this.state.endhours);
      if(this.state.startdate === this.state.enddate && this.state.startsession === this.state.endsession && this.state.starthours >= this.state.endhours){
        // console.log('yes end happen');
      }else{
        this.setState({
          endhours: this.state.endhours - 1,
          endminutes: this.state.startminutes
        }, this.propagateChange)
      }
    }else if(data === "end" && part === 'minutes'){
      if(this.state.startdate === this.state.enddate && this.state.startsession === this.state.endsession && this.state.starthours === this.state.endhours && this.state.startminutes >= this.state.endminutes){
        // console.log('yes end happen');
      }else{
        this.setState({endminutes: this.state.endminutes - 1}, this.propagateChange)
      }
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

  propagateChange = () => {
    const {starthours, startminutes, startsession, endhours, endminutes, endsession} = this.state;
    if(parseInt(this.props.timemode) === 12){
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
    }else{
      this.setState({
        starttime: `${twoDigits(starthours)}:${twoDigits(startminutes)}`,
        endtime: `${twoDigits(endhours)}:${twoDigits(endminutes)}`
      })
      if (this.props.onChange != null) {
        const date = {
        starttime: `${twoDigits(starthours)}:${twoDigits(startminutes)}`,
        endtime: `${twoDigits(endhours)}:${twoDigits(endminutes)}`
        }
        this.props.onChange(date)
      }
    }
  }

  render () {
    const {
      classes,
    } = this.props
    const {  isPm } = formatHours(this.state.hours, '12');
    return (
        <Grid container alignContent="stretch" direction="row" justify="center" wrap="wrap">
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
            <ExpandLessIcon
                onClick={() => this.state.starthours < parseInt(this.props.timemode) - 1 && this.onHandleUpPress("start", "hours")}
                className={classes.icon_style}  
            />
            <span
              className={classNames(classes.time, { [classes.select]:  'active' })}
            >
              {twoDigits(this.state.starthours)}
            </span>
            <ExpandMoreIcon
                onClick={() => this.state.starthours >= 1 &&  this.onHandleDownPress("start", "hours")}
                className={classes.icon_style}  
            />
          </div> :
          <div className={classes.time_con}>
            <Typography align="center">
                Minutes
              </Typography>
              <ExpandLessIcon
                onClick={() => this.state.startminutes <= 58 && this.onHandleUpPress("start", "minutes")}
                className={classes.icon_style}  
                />
                <Typography className={classNames(classes.time, { [classes.select]:'active' })} variant="body2" align="center">
                    {twoDigits(this.state.startminutes)}
                </Typography>
              <ExpandMoreIcon
                onClick={() => this.state.startminutes >= 1 &&  this.onHandleDownPress("start", "minutes")}
                className={classes.icon_style}  
                />
            </div>
            {parseInt(this.props.timemode) === 12 && ":" }
            {parseInt(this.props.timemode) === 12 && <div className={classes.time_con}>
                <Typography align="center">
                AM/PM
              </Typography>
              <ExpandLessIcon
                onClick={() => this.setPm("start")}
                className={classes.icon_style}  
                />
                <Typography className={classNames(classes.time, { [classes.select]: isPm })} variant="body2" align="center">
                  {this.state.startsession}
                </Typography>
              <ExpandMoreIcon
                onClick={() => this.setPm("start")}
                className={classes.icon_style}  
                />
              </div>}
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
            <ExpandLessIcon
                onClick={() => this.state.endhours < parseInt(this.props.timemode) - 1 && this.onHandleUpPress("end", "hours")}
                className={classes.icon_style}  
            />
            <Typography className={classNames(classes.time, { [classes.select]:  'active' })} variant="body2" align="center">
                {twoDigits(this.state.endhours)}
            </Typography>
            <ExpandMoreIcon
                onClick={() => this.state.endhours >= 1 && this.onHandleDownPress("end", "hours")}
                className={classes.icon_style}  
            />
          </div> :
          <div className={classes.time_con}>
            <Typography align="center">
                Minutes
            </Typography>
            <ExpandLessIcon
                onClick={() => this.state.endminutes <= 58 && this.onHandleUpPress("end", "minutes")}
                className={classes.icon_style}  
            />
            <Typography className={classNames(classes.time, { [classes.select]:'active' })} variant="body2" align="center">
                {twoDigits(this.state.endminutes)}
            </Typography>
              <ExpandMoreIcon
                onClick={() => this.state.endminutes >= 1 && this.onHandleDownPress("end", "minutes")}
                className={classes.icon_style}  
            />
            </div>
            {parseInt(this.props.timemode) === 12 && ":" }
            {parseInt(this.props.timemode) === 12 && <div className={classes.time_con}>
              <Typography align="center">
                AM/PM
              </Typography>
              <ExpandLessIcon
                onClick={() => this.setPm("end")}
                className={classes.icon_style}  
            />
                <Typography
                    className={classNames(classes.time, { [classes.select]: isPm })}
                    color={'textPrimary'} variant="body2" align="center"
                >
                  {this.state.endsession}
                </Typography>
              <ExpandMoreIcon
                onClick={() => this.setPm("end")}
                className={classes.icon_style}  
            />
              </div>}
              </div>
      </Paper>
      </Grid>
    )
  }
}

export default withStyles(styles)(TimePicker)
