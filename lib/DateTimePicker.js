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
      marginRight: '70px',
      marginLeft: '30px',
      marginBottom: '5px',
      height: '40px'
    },
    textinput1_style: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      marginRight: '30px',
      marginLeft: '30px',
      marginBottom: '5px'
    },
    timecon_style: {
      display: 'flex',
      justifyContent: 'center'
    },
    text_con: {// height: 40
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
      _this.setState({
        startdate: (0, _moment["default"])(data.startDate).format(_this.props.dateFormat),
        enddate: (0, _moment["default"])(data.endDate).format(_this.props.dateFormat)
      });

      _this.props.onDateChange(data);

      _this.setState({
        opendate: !_this.state.opendate,
        opentime: false,
        starttime: null,
        endtime: null
      });
    };

    _this.onTimeChange = function (data) {
      var starttime = data.starttime,
          endtime = data.endtime;

      _this.setState({
        starttime: starttime,
        endtime: endtime
      });

      _this.props.onChange(data);
    };

    _this.state = {
      opendate: false,
      opentime: false,
      startdate: null,
      enddate: null,
      starttime: null,
      endtime: null
    };
    return _this;
  }

  _createClass(DateTimePicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var classes = this.props.classes;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.root
      }, /*#__PURE__*/_react["default"].createElement(_core.Box, {
        borderRadius: "2%",
        border: 1,
        className: classes.box_style
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        direction: "row",
        justify: "center",
        wrap: "wrap"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.state.opentime ? classes.textinput1_style : classes.textinput_style
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        id: "startdatetime",
        className: classes.text_con,
        label: this.state.startdate === null && this.props.startPlaceholder && this.props.startPlaceholder,
        value: this.state.startdate && this.state.starttime ? this.state.startdate + ' ' + this.state.starttime : this.state.startdate && this.state.starttime === null ? this.state.startdate : undefined
      }), /*#__PURE__*/_react["default"].createElement(_icons.Event, {
        onClick: function onClick() {
          return _this2.onDateIconClick();
        }
      }), this.props.includeTime && /*#__PURE__*/_react["default"].createElement(_icons.AccessAlarm, {
        onClick: function onClick() {
          return _this2.onTimeIconClick();
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.textinput_style
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        id: "enddatetime",
        label: this.state.enddate === null && this.props.endPlaceholder && this.props.endPlaceholder,
        value: this.state.enddate && this.state.endtime ? this.state.enddate + ' ' + this.state.endtime : this.state.enddate && this.state.endtime === null ? this.state.enddate : undefined
      }), /*#__PURE__*/_react["default"].createElement(_icons.Event, {
        onClick: function onClick() {
          return _this2.onDateIconClick();
        }
      }), this.props.includeTime && /*#__PURE__*/_react["default"].createElement(_icons.AccessAlarm, {
        onClick: function onClick() {
          return _this2.onTimeIconClick();
        }
      })))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_DateRangePickerExporter["default"], {
        open: this.state.opendate,
        closeOnClickOutside: true,
        toggle: this.toggle,
        maxNext: this.props.maxNext,
        maxPrev: this.props.maxPrev,
        restrictDays: this.props.restrictDays,
        onChange: function onChange(range) {
          return _this2.onDateChange(range);
        }
      })), this.props.includeTime && this.state.opentime && /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.timecon_style
      }, /*#__PURE__*/_react["default"].createElement(_TimePickerExporter["default"], {
        opentime: this.state.opentime,
        closeOnClickTimeOutside: true,
        timetoggle: this.timetoggle,
        includeTime: this.props.includeTime,
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