import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {Box, Grid, TextField} from "@material-ui/core";
import {Event, AccessAlarm } from '@material-ui/icons';
import moment from 'moment';
import DateRangePickerExporter from './components/DateRangePickerExporter';
import TimePickerExporter from './components/TimePickerExporter'

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
    marginRight: '20px',
    marginLeft: '20px',
    marginBottom: '5px'
  },
  timecon_style: {
    display: 'flex',
    justifyContent: 'center'
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
    }
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
    this.setState({
      startdate: moment(data.startDate).format(this.props.dateFormat),
      enddate: moment(data.endDate).format(this.props.dateFormat),
    });
    this.props.onDateChange(data);
    this.setState({ opendate: !this.state.opendate, opentime: false, starttime: null, endtime: null});
  }

  onTimeChange = (data) => {
    const {starttime, endtime} = data;
    this.setState({starttime: starttime, endtime: endtime});
    this.props.onChange(data)
  }

  render () {
    const {
      classes,
    } = this.props
    return (
      <div className={classes.root}>
        <Box borderRadius="2%" border={1} className={classes.box_style}>
          <Grid container direction="row" justify="center" wrap="wrap">
            <div className={classes.textinput_style}>
              <TextField
                id="startdatetime"
                label={ this.state.startdate === null && this.props.startPlaceholder && this.props.startPlaceholder}
                value={this.state.startdate && this.state.starttime ?
                  this.state.startdate + ' ' + this.state.starttime :
                  this.state.startdate && this.state.starttime === null ? this.state.startdate : null}
              />
              <Event onClick={() => this.onDateIconClick()} />
              {this.props.includeTime && <AccessAlarm onClick={() => this.onTimeIconClick()} />}
            </div>
            <div className={classes.textinput_style}>
              <TextField
                id="enddatetime"
                label={this.state.enddate === null && this.props.endPlaceholder && this.props.endPlaceholder}
                value={this.state.enddate && this.state.endtime ?
                  this.state.enddate + ' ' + this.state.endtime :
                  this.state.enddate && this.state.endtime === null ? this.state.enddate : null}
              />
              <Event onClick={() => this.onDateIconClick()} />
              {this.props.includeTime && <AccessAlarm onClick={() => this.onTimeIconClick()} />}
            </div>
          </Grid>
        </Box>
        <div>
          <DateRangePickerExporter
            open={this.state.opendate}
            closeOnClickOutside
            toggle={this.toggle}
            maxNext={this.props.maxNext}
            maxPrev={this.props.maxPrev}
            restrictDays={this.props.restrictDays}
            onChange={(range) => this.onDateChange(range)}
          />
        </div>
        {this.props.includeTime && this.state.opentime && <div className={classes.timecon_style}>
          <TimePickerExporter
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
