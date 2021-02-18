import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogActions, Button, Input, withStyles}from '@material-ui/core';
import DateTimePicker from './TimePicker'
import { formatHours, twoDigits } from './util'

const styles = {
  header: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  body: {
    paddingBottom: 20
  }
}

class TimeInput extends React.Component {
  constructor (props) {
    super(props)
    const defaultValue = new Date()
    defaultValue.setSeconds(0)
    defaultValue.setMilliseconds(0)

    const open = !!props.openOnMount
    const value = props.value || props.defaultValue || props.initialTime || defaultValue

    this.state = {
      open,
      value,
      hasChanged: false,
      newValue: open ? value : null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value })
    }
  }

  showDialog = () => this.setState({ open: true, newValue: this.state.value })

  handleChange = (newValue) => {
    this.setState({ newValue, hasChanged: true })
  }

  handleOk = () => {
    if (this.props.onChange != null) {
      this.props.onChange(this.state.newValue)
    }
    this.setState({ open: false, value: this.state.newValue, newValue: null })
  }

  handleCancel = () => this.setState({ open: false, newValue: null })

  getFormattedValue = () => {
    const { mode, placeholder } = this.props
    const { hasChanged } = this.state

    const is12h = mode === '12h'

    if (placeholder && !hasChanged) return placeholder

    let value = this.state.value
    if (this.props.hasOwnProperty('value')) {
      if (this.props.value == null) {
        // Allow a null/undefined value for controlled inputs
        return ''
      }
      value = this.props.value
    }

    const { hours, isPm } = formatHours(value.getHours(), mode)
    const minutes = twoDigits(value.getMinutes())
    const displayHours = is12h ? hours : twoDigits(value.getHours())
    const ending = is12h ? (isPm ? ' pm' : ' am') : ''
    return `${displayHours}:${minutes}${ending}`
  }

  render () {
    const {
      autoOk,
      cancelLabel,
      classes,
      ClockProps,
      defaultValue,
      disabled: disabledProp,
      initialTime,
      inputComponent: InputComponent,
      placeholder,
      mode,
      okLabel,
      onChange,
      openOnMount,
      TimePickerProps,
      value: valueProp,
      ...other
    } = this.props

    const { newValue, open } = this.state

    const { muiFormControl } = this.context
    const disabled = disabledProp || (muiFormControl != null && muiFormControl.disabled)

    return (
      <React.Fragment>
        <InputComponent
          {...other}
          disabled={disabled}
          onClick={!disabled ? this.showDialog : null}
          value={this.getFormattedValue()}
          readOnly
        />
        <Dialog
          maxWidth='xs'
          open={open}
          onClose={this.handleCancel}
        >
          <DateTimePicker
            {...TimePickerProps}
            mode={mode}
            value={newValue}
            onChange={this.handleChange}
            onMinutesSelected={autoOk ? this.handleOk : null}
            classes={{ header: classes.header, body: classes.body }}
            ClockProps={ClockProps}
          />
          <DialogActions>
            <Button onClick={this.handleCancel} color='primary'>{cancelLabel}</Button>
            <Button onClick={this.handleOk} color='primary'>{okLabel}</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

TimeInput.propTypes = {
  /** If true, automatically accept and close the picker on set minutes. */
  autoOk: PropTypes.bool,
  /** Override the label of the cancel button. */
  cancelLabel: PropTypes.string,
  /** Properties to pass down to the Clock component. */
  ClockProps: PropTypes.object,
  /** This default value overrides initialTime and placeholder. */
  defaultValue: PropTypes.instanceOf(Date),
  /** The default value for the time picker. */
  initialTime: PropTypes.instanceOf(Date),
  /** The component used for the input. Either a string to use a DOM element or a component. */
  inputComponent: PropTypes.elementType,
  /** The placeholder value for the time picker before a time has been selected. */
  placeholder: PropTypes.string,
  /** Sets the clock mode, 12-hour or 24-hour clocks are supported. */
  mode: PropTypes.oneOf(['12h', '24h']),
  /** Override the label of the ok button. */
  okLabel: PropTypes.string,
  /** Callback that is called with the new date (as Date instance) when the value is changed. */
  onChange: PropTypes.func,
  /** If true, automatically opens the dialog when the component is mounted. */
  openOnMount: PropTypes.bool,
  /** Properties to pass down to the TimePicker component. */
  TimePickerProps: PropTypes.object,
  /** The value of the time picker, for use in controlled mode. */
  value: PropTypes.instanceOf(Date)
}

TimeInput.defaultProps = {
  autoOk: false,
  cancelLabel: 'Cancel',
  inputComponent: Input,
  mode: '12h',
  okLabel: 'Ok'
}

TimeInput.contextTypes = {
  muiFormControl: PropTypes.object
}

export default withStyles(styles)(TimeInput)
