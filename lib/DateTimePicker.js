"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _moment = _interopRequireDefault(require("moment"));

var _DateRangePickerExporter = _interopRequireDefault(require("./components/DateRangePickerExporter"));

var _TimePickerExporter = _interopRequireDefault(require("./components/TimePickerExporter"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var styles = function styles(theme) {
  return {
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
      } // height: 40

    },
    close_style: {
      display: "flex",
      alignItems: "center"
    }
  };
};

var DateTimePicker = /*#__PURE__*/function (_React$Component) {
  _inherits(DateTimePicker, _React$Component);

  var _super = _createSuper(DateTimePicker);

  function DateTimePicker(props) {
    var _this;

    _classCallCheck(this, DateTimePicker);

    _this = _super.call(this, props);

    _this.onDateIconClick = function () {
      _this.setState({
        opendate: !_this.state.opendate,
        opentime: false
      });
    };

    _this.onTimeIconClick = function () {
      _this.setState({
        opendate: false,
        opentime: !_this.state.opentime
      });
    };

    _this.toggle = function () {
      return _this.setState({
        opendate: !_this.state.opendate,
        opentime: false
      });
    };

    _this.timetoggle = function () {
      return _this.setState({
        opentime: !_this.state.opentime
      });
    };

    _this.onDateChange = function (data) {
      if (_this.props.range) {
        var startDate = data.startDate,
            endDate = data.endDate;
        var value = {
          startDate: startDate,
          endDate: endDate,
          startTime: _this.props.dateFormat ? (0, _moment["default"])(startDate).format(_this.props.dateFormat) : _this.state.starttime,
          endTime: _this.props.dateFormat ? (0, _moment["default"])(endDate).format(_this.props.dateFormat) : _this.state.endtime
        };

        _this.setState({
          selectedStartDate: startDate,
          selectedEndDate: endDate,
          startdate: (0, _moment["default"])(startDate).format(_this.props.dateFormat),
          enddate: (0, _moment["default"])(endDate).format(_this.props.dateFormat)
        });

        _this.props.onChange(value);

        _this.setState({
          opendate: !_this.state.opendate,
          opentime: false,
          starttime: null,
          endtime: null
        });
      } else {
        _this.setState({
          selectedStartDate: data.startDate,
          selectedEndDate: data.startDate,
          startdate: (0, _moment["default"])(data.startDate).format(_this.props.dateFormat),
          enddate: (0, _moment["default"])(data.startDate).format(_this.props.dateFormat)
        });

        _this.props.onChange({
          date: _this.props.dateFormat ? (0, _moment["default"])(data.startDate).format(_this.props.dateFormat) : data.startDate,
          time: null
        });

        _this.setState({
          opendate: !_this.state.opendate,
          opentime: false,
          starttime: null,
          endtime: null
        });
      }
    };

    _this.onTimeChange = function (data) {
      var starttime = data.starttime,
          endtime = data.endtime;

      if (_this.props.range) {
        var value = {
          selectedStartDate: _this.state.selectedStartDate,
          selectedEndDate: _this.state.selectedEndDate,
          startDate: _this.state.startdate,
          endDate: _this.state.enddate,
          startTime: starttime,
          endTime: endtime
        };

        _this.props.onChange(value);
      } else {
        var _value = {
          date: _this.state.startdate,
          time: starttime
        };

        _this.setState({
          starttime: starttime,
          endtime: starttime
        });

        _this.props.onChange(_value);
      }
    };

    _this.onStartDateType = function (data) {
      _this.setState({
        defaultStartValue: data
      });

      if (_this.props.includeDate) {
        var date = (0, _moment["default"])(data).format(_this.props.dateFormat ? _this.props.dateFormat : "DD/MM/YYYY");
        var time = (0, _moment["default"])(data).format(_this.props.timemode && parseInt(_this.props.timemode) == 12 ? "hh:mm a" : "HH:mm");
        var value = {
          startdate: date,
          starttime: time,
          enddate: _this.state.enddate,
          endtime: _this.state.endtime
        };

        _this.setState({
          selectedStartDate: data,
          selectedEndDate: _this.state.selectedEndDate,
          startdate: date,
          starttime: time,
          enddate: _this.state.enddate,
          endtime: _this.state.endtime
        }, _this.props.onChange(value));
      } else {
        var starthour = null;

        if (_this.props.timemode && parseInt(_this.props.timemode) === 12) {
          var hour = Number(data.split(":")[0]) > 12 ? Number(data.split(":")[0]) % 12 : Number(data.split(":")[0]);
          var minute = data.split(":")[1];
          var session = Number(data.split(":")[0]) > 12 ? "  PM" : "  AM";
          starthour = hour <= 9 ? "0" + hour + ":" + minute + session : hour + ":" + minute + session;
        } else {
          var _hour = Number(data.split(":")[0]);

          var _minute = data.split(":")[1];
          starthour = _hour <= 9 ? "0" + _hour + ":" + _minute : _hour + ":" + _minute;
        }

        var _value2 = {
          startdate: null,
          starttime: starthour,
          enddate: _this.state.enddate,
          endtime: _this.state.endtime
        };

        _this.setState({
          selectedStartDate: null,
          selectedEndDate: _this.state.selectedEndDate,
          startdate: null,
          starttime: starthour,
          enddate: _this.state.enddate,
          endtime: _this.state.endtime
        }, _this.props.onChange(_value2));
      }

      _this.endInput.focus();
    };

    _this.onEndDateType = function (data) {
      _this.setState({
        defaultEndVale: data
      });

      if (_this.props.includeDate) {
        var date = (0, _moment["default"])(data).format(_this.props.dateFormat ? _this.props.dateFormat : "DD/MM/YYYY");
        var time = (0, _moment["default"])(data).format(_this.props.timemode && parseInt(_this.props.timemode) === 12 ? "hh:mm a" : "HH:mm");
        var value = {
          startdate: _this.state.startdate,
          starttime: _this.state.starttime,
          enddate: date,
          endtime: time
        };
        _this.endInput.type = "text";

        _this.setState({
          selectedStartDate: _this.state.selectedStartDate,
          selectedEndDate: _this.state.selectedEndDate,
          startdate: _this.state.startdate,
          starttime: _this.state.starttime,
          enddate: date,
          endtime: time
        }, _this.props.onChange(value));
      } else {
        var endhour = null;

        if (_this.props.timemode && parseInt(_this.props.timemode) === 12) {
          var hour = Number(data.split(":")[0]) > 12 ? Number(data.split(":")[0]) % 12 : Number(data.split(":")[0]);
          var minute = data.split(":")[1];
          var session = Number(data.split(":")[0]) > 12 ? "  PM" : "  AM";
          endhour = hour <= 9 ? "0" + hour + ":" + minute + session : hour + ":" + minute + session;
        } else {
          var _hour2 = Number(data.split(":")[0]);

          var _minute2 = data.split(":")[1];
          endhour = _hour2 <= 9 ? "0" + _hour2 + ":" + _minute2 : _hour2 + ":" + _minute2;
        }

        var _value3 = {
          startdate: _this.state.startdate,
          starttime: _this.state.starttime,
          enddate: null,
          endtime: endhour
        };

        _this.setState({
          selectedStartDate: _this.state.selectedStartDate,
          selectedEndDate: null,
          startdate: _this.state.startdate,
          starttime: _this.state.starttime,
          enddate: null,
          endtime: endhour
        }, _this.props.onChange(_value3));
      }

      _this.endInput.disabled = true;
    };

    _this.starttextboxValue = function () {
      if (_this.props.includeDate) {
        if (_this.state.defaultValue && !_this.state.startdate && !_this.state.starttime) {
          return _this.state.defaultValue;
        } else {
          if (_this.state.startdate && _this.state.starttime) {
            return _this.state.startdate + " " + _this.state.starttime;
          } else if (_this.state.startdate && _this.state.starttime === null) {
            return _this.state.startdate;
          } else {
            return undefined;
          }
        }
      } else {
        if (_this.state.defaultValue && !_this.state.startdate && !_this.state.starttime) {
          return _this.state.defaultValue;
        } else {
          if (_this.state.starttime) {
            return _this.state.starttime;
          } else {
            return undefined;
          }
        }
      }
    };

    _this.endtextboxValue = function () {
      if (_this.props.includeDate) {
        if (_this.state.defaultValue && !_this.state.startdate && !_this.state.starttime) {
          return _this.state.defaultValue;
        } else {
          if (_this.state.enddate && _this.state.endtime) {
            return _this.state.enddate + " " + _this.state.endtime;
          } else if (_this.state.enddate && _this.state.endtime === null) {
            return _this.state.enddate;
          } else {
            return undefined;
          }
        }
      } else {
        if (_this.state.defaultValue && !_this.state.startdate && !_this.state.starttime) {
          return _this.state.defaultValue;
        } else {
          if (_this.state.endtime) {
            return _this.state.endtime;
          } else {
            return undefined;
          }
        }
      }
    };

    _this.onClearClick = function () {
      _this.startInput.value = null;
      _this.endInput.value = null;

      _this.setState({
        startdate: null,
        starttime: null,
        enddate: null,
        endtime: null,
        defaultValue: null,
        selectedStartDate: null,
        selectedEndDate: null
      });
    };

    _this.state = {
      opendate: false,
      opentime: false,
      startdate: null,
      enddate: null,
      starttime: null,
      endtime: null,
      defaultStartValue: null,
      defaultEndVale: null,
      startTextFocused: false,
      endTextFocused: false,
      selectedEndDate: null,
      selectedStartDate: null,
      defaultValue: props.defaultValue
    };
    _this.startInput = /*#__PURE__*/_react["default"].createRef();
    _this.endInput = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }

  _createClass(DateTimePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.defaultValue && this.props.includeDate && this.props.includeTime && !this.props.range) {
        this.setState({
          startdate: this.props.defaultValue.split(" ")[0],
          starttime: this.props.defaultValue.substring(this.props.defaultValue.indexOf(' ') + 1),
          selectedStartDate: new Date(this.props.defaultValue.split(" ")[0])
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          classes = _this$props.classes,
          range = _this$props.range;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.root
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        direction: "row",
        justify: "center",
        wrap: "wrap"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.state.opentime ? classes.textinput1_style : classes.textinput_style
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        id: "datetime-local",
        inputRef: function inputRef(d) {
          return _this2.startInput = d;
        },
        className: classes.starttext_con,
        placeholder: this.props.startPlaceholder && this.props.startPlaceholder,
        value: this.starttextboxValue(),
        type: "text",
        onFocus: function onFocus() {
          _this2.startInput.type = _this2.props.includeDate && _this2.props.includeTime ? "datetime-local" : _this2.props.includeDate ? "date" : "time";
        },
        onBlur: function onBlur() {
          return _this2.startInput.type = "text";
        },
        name: "startdate",
        onChange: function onChange(event) {
          return _this2.onStartDateType(event.target.value);
        }
      }), this.props.includeDate && /*#__PURE__*/_react["default"].createElement(_icons.Event, {
        onClick: function onClick() {
          return _this2.onDateIconClick();
        }
      }), this.props.includeTime && /*#__PURE__*/_react["default"].createElement(_icons.AccessAlarm, {
        onClick: function onClick() {
          return _this2.onTimeIconClick();
        }
      })), range && /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.textinput_style
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        id: "enddatetime",
        className: classes.starttext_con,
        inputRef: function inputRef(d) {
          return _this2.endInput = d;
        },
        placeholder: this.props.endPlaceholder && this.props.endPlaceholder,
        type: "text",
        onFocus: function onFocus() {
          _this2.endInput.disabled = false, _this2.endInput.type = _this2.props.includeDate && _this2.props.includeTime ? "datetime-local" : _this2.props.includeDate ? "date" : "time";
        },
        onBlur: function onBlur() {
          _this2.endInput.type = "text", _this2.endInput.disabled = false;
        },
        value: this.endtextboxValue(),
        name: "enddate",
        disabled: false,
        onChange: function onChange(event) {
          return _this2.onEndDateType(event.target.value);
        }
      }), this.props.includeDate && /*#__PURE__*/_react["default"].createElement(_icons.Event, {
        onClick: function onClick() {
          return _this2.onDateIconClick();
        }
      }), this.props.includeTime && /*#__PURE__*/_react["default"].createElement(_icons.AccessAlarm, {
        onClick: function onClick() {
          return _this2.onTimeIconClick();
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.close_style
      }, /*#__PURE__*/_react["default"].createElement(_Close["default"], {
        onClick: function onClick() {
          return _this2.onClearClick();
        }
      }))), this.props.includeDate && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_DateRangePickerExporter["default"], {
        defaultRange: range,
        defaultValue: this.props.includeDate && this.props.includeTime && this.state.defaultValue ? this.state.defaultValue.split(" ")[0] : this.state.defaultValue,
        insertedStartDate: this.state.selectedStartDate,
        insertedEndDate: this.state.selectedEndDate,
        open: this.state.opendate,
        closeOnClickOutside: true,
        toggle: this.toggle,
        maxNext: this.props.maxNext,
        maxPrev: this.props.maxPrev,
        restrictDays: this.props.restrictDays,
        onChange: function onChange(range) {
          return _this2.onDateChange(range);
        },
        dateFormat: this.props.dateFormat,
        includeRelativeDate: this.props.includeRelativeDate,
        includeTime: this.props.includeTime
      })), this.props.includeTime && this.state.opentime && /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.timecon_style
      }, /*#__PURE__*/_react["default"].createElement(_TimePickerExporter["default"], {
        defaultRange: range,
        selectedDate: {
          startdate: this.state.selectedStartDate,
          enddate: this.state.selectedEndDate
        },
        selectedTime: {
          starttime: this.state.starttime,
          endtime: this.state.endtime
        },
        opentime: this.state.opentime,
        closeOnClickTimeOutside: true,
        timetoggle: this.timetoggle,
        includeTime: this.props.includeTime,
        includeDate: this.props.includeDate,
        defaultValue: this.props.includeDate && this.props.includeTime && this.state.defaultValue ? this.state.defaultValue.substring(this.state.defaultValue.indexOf(' ') + 1) : this.state.defaultValue,
        restrictToDayTime: this.props.restrictToDayTime,
        timemode: this.props.timemode,
        restrictTime: this.props.restrictTime,
        dateFormat: this.props.dateFormat,
        onChange: function onChange(params) {
          return _this2.onTimeChange(params);
        }
      })));
    }
  }]);

  return DateTimePicker;
}(_react["default"].Component);

var _default = (0, _styles.withStyles)(styles)(DateTimePicker);

exports["default"] = _default;