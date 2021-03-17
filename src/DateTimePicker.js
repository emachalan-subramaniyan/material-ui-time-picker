import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Box, Grid, TextField } from "@material-ui/core";
import { Event, AccessAlarm } from "@material-ui/icons";
import moment from "moment";
import DateRangePickerExporter from "./components/DateRangePickerExporter";
import TimePickerExporter from "./components/TimePickerExporter";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 250,
    fontFamily: theme.typography.fontFamily,
    display: "flex",
    flexDirection: "column"
  },
  box_style: {
    display: "flex",
    width: "100%",
    justifyContent: "center"
  },
  textinput_style: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginRight: "10px",
    marginLeft: "30px",
    marginBottom: "5px",
    height: "40px"
  },
  textinput1_style: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    // marginRight: '30px',
    marginLeft: "30px",
    marginBottom: "5px"
  },
  timecon_style: {
    display: "flex",
    justifyContent: "center"
  },
  starttext_con: {
    "& input::-webkit-calendar-picker-indicator": {
      display: "none",
      background: "none"
    }
    // height: 40
  },
  close_style: {
    display: "flex",
    alignItems: "center"
  }
});

class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opendate: false,
      opentime: false,
      startdate: null,
      enddate: null,
      starttime: null,
      endtime: null,
      defaultStartValue: null,
      defaultEndVale: null,
      startTextFocused: false,
      endTextFocused: false
    };
    this.startInput = React.createRef();
    this.endInput = React.createRef();
  }

  onDateIconClick = () => {
    this.setState({ opendate: !this.state.opendate, opentime: false });
  };

  onTimeIconClick = () => {
    this.setState({ opendate: false, opentime: !this.state.opentime });
  };

  toggle = () =>
    this.setState({ opendate: !this.state.opendate, opentime: false });
  timetoggle = () => this.setState({ opentime: !this.state.opentime });

  onDateChange = data => {
    if(this.props.range){
      const { startDate, endDate } = data;
      const value = {
        startDate: startDate,
        endDate: endDate,
        startTime: this.state.starttime,
        endTime: this.state.endtime
      };
      this.setState({
        startdate: moment(data.startDate).format(this.props.dateFormat),
        enddate: moment(data.endDate).format(this.props.dateFormat)
      });
      this.props.onDateChange(value);
      this.setState({
        opendate: !this.state.opendate,
        opentime: false,
        starttime: null,
        endtime: null
      });
    }else{
      this.setState({
        startdate: moment(data.startDate).format(this.props.dateFormat),
        enddate: moment(data.startDate).format(this.props.dateFormat)
      });
      this.props.onDateChange({date: data.startDate, time: null});
      this.setState({
        opendate: !this.state.opendate,
        opentime: false,
        starttime: null,
        endtime: null
      });
    }
  };

  onTimeChange = data => {
    const { starttime, endtime } = data;
    if(this.props.range){
      const value = {
        startDate: this.state.startdate,
        endDate: this.state.enddate,
        startTime: starttime,
        endTime: endtime
      };
      this.props.onDateChange(value);
    }else{
      const value = {
        date: this.state.startdate,
        time: starttime,
      };
      this.setState({ starttime: starttime, endtime: starttime });
      this.props.onDateChange(value);
    }
  };

  onStartDateType = data => {
    this.setState({ defaultStartValue: data });
    if (this.props.includeDate) {
      let date = moment(data).format(
        this.props.dateFormat ? this.props.dateFormat : "DD/MM/YYYY"
      );
      let time = moment(data).format(
        this.props.timemode && parseInt(this.props.timemode) == 12
          ? "hh:mm a"
          : "HH:mm"
      );
      const value = {
        startdate: date,
        starttime: time,
        enddate: this.state.enddate,
        endtime: this.state.endtime
      };
      this.setState(
        {
          startdate: date,
          starttime: time,
          enddate: this.state.enddate,
          endtime: this.state.endtime
        },
        this.props.onDateChange(value)
      );
    } else {
      let starthour = null;
      if (this.props.timemode && parseInt(this.props.timemode) === 12) {
        let hour =
          Number(data.split(":")[0]) > 12
            ? Number(data.split(":")[0]) % 12
            : Number(data.split(":")[0]);
        let minute = data.split(":")[1];
        let session = Number(data.split(":")[0]) > 12 ? "  PM" : "  AM";
        starthour =
          hour <= 9
            ? "0" + hour + ":" + minute + session
            : hour + ":" + minute + session;
      } else {
        let hour = Number(data.split(":")[0]);
        let minute = data.split(":")[1];
        starthour = hour <= 9 ? "0" + hour + ":" + minute : hour + ":" + minute;
      }
      const value = {
        startdate: null,
        starttime: starthour,
        enddate: this.state.enddate,
        endtime: this.state.endtime
      };
      this.setState(
        {
          startdate: null,
          starttime: starthour,
          enddate: this.state.enddate,
          endtime: this.state.endtime
        },
        this.props.onDateChange(value)
      );
    }
    this.endInput.focus();
  };

  onEndDateType = data => {
    this.setState({ defaultEndVale: data });
    if (this.props.includeDate) {
      let date = moment(data).format(
        this.props.dateFormat ? this.props.dateFormat : "DD/MM/YYYY"
      );
      let time = moment(data).format(
        this.props.timemode && parseInt(this.props.timemode) === 12
          ? "hh:mm a"
          : "HH:mm"
      );
      const value = {
        startdate: this.state.startdate,
        starttime: this.state.starttime,
        enddate: date,
        endtime: time
      };
      this.endInput.type = "text";
      this.setState(
        {
          startdate: this.state.startdate,
          starttime: this.state.starttime,
          enddate: date,
          endtime: time
        },
        this.props.onDateChange(value)
      );
    } else {
      let endhour = null;
      if (this.props.timemode && parseInt(this.props.timemode) === 12) {
        let hour =
          Number(data.split(":")[0]) > 12
            ? Number(data.split(":")[0]) % 12
            : Number(data.split(":")[0]);
        let minute = data.split(":")[1];
        let session = Number(data.split(":")[0]) > 12 ? "  PM" : "  AM";
        endhour =
          hour <= 9
            ? "0" + hour + ":" + minute + session
            : hour + ":" + minute + session;
      } else {
        let hour = Number(data.split(":")[0]);
        let minute = data.split(":")[1];
        endhour = hour <= 9 ? "0" + hour + ":" + minute : hour + ":" + minute;
      }
      const value = {
        startdate: this.state.startdate,
        starttime: this.state.starttime,
        enddate: null,
        endtime: endhour
      };
      this.setState(
        {
          startdate: this.state.startdate,
          starttime: this.state.starttime,
          enddate: null,
          endtime: endhour
        },
        this.props.onDateChange(value)
      );
    }
    this.endInput.disabled = true;
  };

  starttextboxValue = () => {
    if (this.props.includeDate) {
      if (this.state.startdate && this.state.starttime) {
        return this.state.startdate + " " + this.state.starttime;
      } else if (this.state.startdate && this.state.starttime === null) {
        return this.state.startdate;
      } else {
        return undefined;
      }
    } else {
      if (this.state.starttime) {
        return this.state.starttime;
      } else {
        return undefined;
      }
    }
  };

  endtextboxValue = () => {
    if (this.props.includeDate) {
      if (this.state.enddate && this.state.endtime) {
        return this.state.enddate + " " + this.state.endtime;
      } else if (this.state.enddate && this.state.endtime === null) {
        return this.state.enddate;
      } else {
        return undefined;
      }
    } else {
      if (this.state.endtime) {
        return this.state.endtime;
      } else {
        return undefined;
      }
    }
  };

  onClearClick = () => {
    this.startInput.value = null;
    this.endInput.value = null;
    this.setState({
      startdate: null,
      starttime: null,
      enddate: null,
      endtime: null
    });
  };

  render() {
    const { classes, range } = this.props;
    return (
      <div className={classes.root}>
        {/* <Box borderRadius="2%" border={1} className={classes.box_style}> */}
        <Grid container direction="row" justify="center" wrap="wrap">
          <div
            className={
              this.state.opentime
                ? classes.textinput1_style
                : classes.textinput_style
            }
          >
            <TextField
              id="datetime-local"
              inputRef={d => (this.startInput = d)}
              className={classes.starttext_con}
              placeholder={
                this.props.startPlaceholder && this.props.startPlaceholder
              }
              value={this.starttextboxValue()}
              type="text"
              onFocus={() => {
                this.startInput.type = this.props.includeDate
                  ? "datetime-local"
                  : "time";
              }}
              onBlur={() => (this.startInput.type = "text")}
              name="startdate"
              onChange={event => this.onStartDateType(event.target.value)}
            />
            {this.props.includeDate && (
              <Event onClick={() => this.onDateIconClick()} />
            )}
            {this.props.includeTime && (
              <AccessAlarm onClick={() => this.onTimeIconClick()} />
            )}
          </div>
          {range && <div className={classes.textinput_style}>
            <TextField
              id="enddatetime"
              className={classes.starttext_con}
              inputRef={d => (this.endInput = d)}
              placeholder={
                this.props.endPlaceholder && this.props.endPlaceholder
              }
              type="text"
              onFocus={() => {
                (this.endInput.disabled = false),
                  (this.endInput.type = this.props.includeDate
                    ? "datetime-local"
                    : "time");
              }}
              onBlur={() => {
                (this.endInput.type = "text"), (this.endInput.disabled = false);
              }}
              value={this.endtextboxValue()}
              name="enddate"
              disabled={false}
              onChange={event => this.onEndDateType(event.target.value)}
            />
            {this.props.includeDate && (
              <Event onClick={() => this.onDateIconClick()} />
            )}
            {this.props.includeTime && (
              <AccessAlarm onClick={() => this.onTimeIconClick()} />
            )}
          </div>}
          <div className={classes.close_style}>
            <CloseIcon onClick={() => this.onClearClick()} />
          </div>
        </Grid>
        {/* </Box> */}
        {this.props.includeDate && (
          <div>
            <DateRangePickerExporter
              defaultRange={range}
              insertedStartDate={this.state.startdate}
              insertedEndDate={this.state.enddate}
              open={this.state.opendate}
              closeOnClickOutside
              toggle={this.toggle}
              maxNext={this.props.maxNext}
              maxPrev={this.props.maxPrev}
              restrictDays={this.props.restrictDays}
              onChange={range => this.onDateChange(range)}
              includeRelativeDate={this.props.includeRelativeDate}
            />
          </div>
        )}
        {this.props.includeTime && this.state.opentime && (
          <div className={classes.timecon_style}>
            <TimePickerExporter
              defaultRange={range}
              selectedDate={{
                startdate: this.state.startdate,
                enddate: this.state.enddate
              }}
              selectedTime={{
                starttime: this.state.starttime,
                endtime: this.state.endtime
              }}
              opentime={this.state.opentime}
              closeOnClickTimeOutside
              timetoggle={this.timetoggle}
              includeTime={this.props.includeTime}
              restrictToDayTime={this.props.restrictToDayTime}
              timemode={this.props.timemode}
              restrictTime={this.props.restrictTime}
              dateFormat={this.props.dateFormat}
              onChange={params => this.onTimeChange(params)}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(DateTimePicker);
