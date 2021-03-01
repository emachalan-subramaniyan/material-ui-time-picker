import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {Box, Grid, TextField} from "@material-ui/core";
import {Event, AccessAlarm } from '@material-ui/icons';
import moment from 'moment';
import DateRangePickerExporter from './components/DateRangePickerExporter';
import TimePickerExporter from './components/TimePickerExporter';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  root: {
    width: "100%",
    minWidth: 250,
    fontFamily: theme.typography.fontFamily,
    display: 'flex',
    flexDirection: 'column'
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
    marginRight: '10px',
    marginLeft: '30px',
    marginBottom: '5px',
    height: '40px'
  },
  textinput1_style: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    // marginRight: '30px',
    marginLeft: '30px',
    marginBottom: '5px'
  },
  timecon_style: {
    display: 'flex',
    justifyContent: 'center'
  },
  starttext_con: {
    "& input::-webkit-calendar-picker-indicator, & input::-webkit-calendar-picker-indicator, & input::-webkit-calendar-picker-indicator": {
      display: "none",
      background: "none",
    },
    // height: 40
  }
})

class DateTimePicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      opendate: false,
      opentime: false,
      startdate: null,
      enddate: null,
      starttime: null,
      endtime: null,
      defaultStartVale: null,
      defaultEndVale: null,
      startTextFocused: false,
      endTextFocused: false,
    }
    this.startInput = React.createRef();
    this.endInput = React.createRef();
  }

  onDateIconClick = () => {
    this.setState({ opendate: !this.state.opendate, opentime: false})
  }

  onTimeIconClick = () => {
    this.setState({ opendate: false, opentime: !this.state.opentime})
  }

  toggle = () => this.setState({ opendate: !this.state.opendate, opentime: false});
  timetoggle = () => this.setState({ opentime: !this.state.opentime});


  onDateChange = (data) => {
    const {startDate, endDate} = data;
    const value = {
      startDate: startDate,
      endDate: endDate,
      startTime: this.state.starttime,
      endTime: this.state.endtime,
    }
    this.setState({
      startdate: moment(data.startDate).format(this.props.dateFormat),
      enddate: moment(data.endDate).format(this.props.dateFormat),
    });
    this.props.onDateChange(value);
    this.setState({ opendate: !this.state.opendate, opentime: false, starttime: null, endtime: null});
  }

  onTimeChange = (data) => {
    const {starttime, endtime} = data;
    const value = {
      startDate: this.state.startdate,
      endDate: this.state.enddate,
      startTime: starttime,
      endTime: endtime,
    }
    this.props.onDateChange(value);
    this.setState({starttime: starttime, endtime: endtime});
  }
  
  onStartDateType = (data) => {
    this.setState({defaultStartVale: data})
    this.startInput.type = "text";
    if(this.props.includeDate){
    let date = moment(data).format(this.props.dateFormat ? this.props.dateFormat : 'DD/MM/YYYY')
    let time = moment(data).format(this.props.timemode &&
    parseInt(this.props.timemode) == 12 ? "hh:mm a" : 'HH:mm')
    const value = {
      startdate: date,
      starttime: time,
      enddate: this.state.enddate,
      endtime: this.state.endtime
    };
    this.setState({
      startdate: date,
      starttime: time,
      enddate: this.state.enddate,
      endtime: this.state.endtime
    }, this.props.onDateChange(value));
  }else{
    const value = {
      startdate: this.state.startdate,
      starttime: data,
      enddate: this.state.enddate,
      endtime: this.state.endtime
    };
    this.setState({
      startdate: this.state.startdate,
      starttime: data,
      enddate: this.state.enddate,
      endtime: this.state.endtime
    }, this.props.onDateChange(value));
  }
  }

  onEndDateType = (data) => {
    this.setState({defaultEndVale: data})
    if(this.props.includeDate){
      let date = moment(data).format(this.props.dateFormat ? this.props.dateFormat : 'DD/MM/YYYY')
      let time = moment(data).format(this.props.timemode &&
        parseInt(this.props.timemode) === 12 ? "hh:mm a" : 'HH:mm')
        const value = {
          startdate: this.state.startdate,
          starttime: this.state.starttime,
          enddate: date,
          endtime: time
        };
        this.endInput.type = "text";
        this.setState({
          startdate: this.state.startdate,
          starttime: this.state.starttime,
          enddate: date,
          endtime: time
        }, this.props.onDateChange(value));
      }else{
        const value = {
          startdate: this.state.startdate,
          starttime: this.state.starttime,
          enddate: this.state.enddate,
          endtime: data
        };
        this.endInput.type = "text";
    this.setState({
      startdate: this.state.startdate,
      starttime: this.state.starttime,
      enddate: this.state.enddate,
      endtime: data
    }, this.props.onDateChange(value));
  }    
  }

  starttextboxValue = () => {
    if(this.props.includeDate){
      if(this.state.startdate && this.state.starttime){
        return this.state.startdate + ' ' + this.state.starttime;
      }else if(this.state.startdate && this.state.starttime === null){
        return this.state.startdate;
      }else{
        return undefined;
      }
    }else{
      if(this.state.starttime){
        return this.state.starttime;
      }else{
        return undefined;
      }
    }
  }

  endtextboxValue = () => {
    if(this.props.includeDate){
      if(this.state.enddate && this.state.endtime){
        return this.state.enddate + ' ' + this.state.endtime;
      }else if(this.state.enddate && this.state.endtime === null){
        return this.state.enddate;
      }else{
        return undefined;
      }
    }else{
      if(this.state.endtime){
        return this.state.endtime;
      }else{
        return undefined;
      }
    }
  }

  onClearClick = () => {
    this.startInput.value = null;
    this.endInput.value = null;
    this.setState({
      startdate: null,
      starttime: null,
      enddate: null,
      endtime: null
    })
  }

  
  render () {
    const {
      classes,
    } = this.props
    return (
      <div className={classes.root}>
        {/* <Box borderRadius="2%" border={1} className={classes.box_style}> */}
          <Grid container direction="row" justify="center" wrap="wrap">
            <div className={this.state.opentime ? classes.textinput1_style : classes.textinput_style}>
              <TextField
                id="datetime-local"
                inputRef={d => this.startInput = d}
                className={classes.starttext_con}
                placeholder={ this.props.startPlaceholder && this.props.startPlaceholder}
                value={this.starttextboxValue()}
                type="text"
                onFocus={() => {this.startInput.type = this.props.includeDate ?  "datetime-local" : "time"}}
                onBlur={() => this.startInput.type="text"}
                name="startdate"
                max={this.props.timemode &&
                  parseInt(this.props.timemode) === 12 ? "2051-01-01T12:00" : '"2051-01-01T23:59"'}
                onChange={(event) => this.onStartDateType(event.target.value)}
              />
              {this.props.includeDate &&<Event onClick={() => this.onDateIconClick()} />}
              {this.props.includeTime && <AccessAlarm onClick={() => this.onTimeIconClick()} />}
            </div>
            <div className={classes.textinput_style}> 
              <TextField
                id="enddatetime"
                className={classes.starttext_con}
                inputRef={d => this.endInput = d}
                placeholder={ this.props.endPlaceholder && this.props.endPlaceholder}
                type="text"
                onFocus={() => {this.endInput.type = this.props.includeDate ?  "datetime-local" : "time"}}
                onBlur={() => this.endInput.type="text" }
                value={this.endtextboxValue()}
                name="enddate"
                max="2051-01-01T23:59"
                onChange={(event) => this.onEndDateType(event.target.value)}
              />
              {this.props.includeDate && <Event onClick={() => this.onDateIconClick()} />}
              {this.props.includeTime && <AccessAlarm onClick={() => this.onTimeIconClick()} />}
            </div>
            <CloseIcon  onClick={() => this.onClearClick()}/>
          </Grid>
        {/* </Box> */}
        {this.props.includeDate && <div>
          <DateRangePickerExporter
            open={this.state.opendate}
            closeOnClickOutside
            toggle={this.toggle}
            maxNext={this.props.maxNext}
            maxPrev={this.props.maxPrev}
            restrictDays={this.props.restrictDays}
            onChange={(range) => this.onDateChange(range)}
            includeRelativeDate={this.props.includeRelativeDate}
          />
        </div>}
        {this.props.includeTime && this.state.opentime && <div className={classes.timecon_style}>
          <TimePickerExporter
            selectedDate={{startdate: this.state.startdate, enddate: this.state.enddate}}
            selectedTime={{starttime: this.state.starttime, endtime: this.state.endtime}}
            opentime={this.state.opentime}
            closeOnClickTimeOutside
            timetoggle={this.timetoggle}
            includeTime={this.props.includeTime}
            restrictToDayTime={this.props.restrictToDayTime}
            timemode={this.props.timemode}
            restrictTime={this.props.restrictTime}
            dateFormat={this.props.dateFormat}
            onChange={(params) => this.onTimeChange(params)}
          />
        </div> }
      </div>
    )
  }
}

export default withStyles(styles)(DateTimePicker)
