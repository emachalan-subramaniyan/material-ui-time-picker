"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _transitions = require("@material-ui/core/styles/transitions");

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var _core = require("@material-ui/core");

var _ExpandLess = _interopRequireDefault(require("@material-ui/icons/ExpandLess"));

var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));

var _classnames = _interopRequireDefault(require("classnames"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    time: {
      transition: "all ".concat(_transitions.duration["short"], "ms ").concat(_transitions.easing.easeInOut),
      cursor: 'pointer',
      height: 20
    },
    select: {
      color: (0, _colorManipulator.getContrastRatio)(theme.palette.primary.main, theme.palette.common.black) < 7 ? theme.palette.common.black : theme.palette.common.black
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
    }
  };
};

var TimePickerComponent = /*#__PURE__*/function (_React$Component) {
  _inherits(TimePickerComponent, _React$Component);

  var _super = _createSuper(TimePickerComponent);

  function TimePickerComponent(props) {
    var _this;

    _classCallCheck(this, TimePickerComponent);

    _this = _super.call(this, props);

    _this.getinitialState = function (data) {
      var defaultValue = new Date();
      defaultValue.setSeconds(0);
      defaultValue.setMilliseconds(0);
      var time = _this.props.value || _this.props.defaultValue || defaultValue;

      if (data === "time") {
        if (_this.props.timemode && parseInt(_this.props.timemode) === 24) {
          if (_this.props.restrictTime && _this.props.restrictTime.starttime > time.getHours()) {
            return _this.props.restrictTime.starttime;
          } else {
            return time.getHours();
          }
        } else if (_this.props.restrictTime) {
          return _this.props.restrictTime.starttime;
        } else {
          return parseInt(_this.props.timemode) === 12 ? time.getHours() % 12 : new Date().getHours();
        }
      } else {
        if (_this.props.restrictTime) {
          return _this.props.restrictTime.starttime >= 12 ? "PM" : "AM";
        } else {
          return parseInt(_this.props.timemode) === 12 && time.getHours() >= 12 ? "PM" : "AM";
        }
      }
    };

    _this.setPm = function (data) {
      if (data === "start") {
        if (_this.state.startsession === 'PM') {
          _this.setState({
            startsession: "AM",
            starthours: _this.props.restrictTime ? _this.props.restrictTime.starttime : _this.state.starthours,
            endhours: _this.props.restrictTime ? _this.props.restrictTime.starttime : _this.state.starthours,
            endminutes: _this.state.startminutes,
            endsession: "AM"
          }, _this.propagateChange);
        } else {
          _this.setState({
            startsession: "PM",
            starthours: _this.props.restrictTime && _this.props.restrictTime.endtime ? Number(_this.props.restrictTime.endtime) - 1 : _this.state.starthours,
            startminutes: 59,
            endhours: _this.props.restrictTime && _this.props.restrictTime.endtime ? Number(_this.props.restrictTime.endtime) - 1 : _this.state.starthours,
            endminutes: 59,
            endsession: "PM"
          }, _this.propagateChange);
        }
      } else {
        if (_this.props.restrictTime && _this.state.endsession === 'AM' && _this.state.starthours <= _this.state.endhours) {
          _this.setState({
            endhours: _this.props.restrictTime.endtime - 1,
            endsession: "PM"
          });
        } else if (_this.props.restrictTime && _this.state.endsession === 'PM') {
          _this.setState({
            endhours: _this.state.starthours,
            endminutes: _this.state.endminutes,
            endsession: "AM"
          });
        } else {
          _this.setState({
            endsession: _this.state.endsession === "PM" ? "AM" : "PM"
          }, _this.propagateChange);
        }
      }
    };

    _this.onNowPress = function (data) {
      var times = new Date();

      if (data === 'start') {
        if (_this.props.timemode && parseInt(_this.props.timemode) === 24) {
          _this.setState({
            starthours: times.getHours(),
            startminutes: times.getMinutes()
          }, _this.propagateChange);
        } else {
          _this.setState({
            starthours: times.getHours() % 12,
            startminutes: times.getMinutes(),
            startsession: times.getHours() >= 12 ? "PM" : "AM"
          }, _this.propagateChange);
        }
      } else {
        if (_this.props.timemode && parseInt(_this.props.timemode) === 12 && _this.state.startdate === _this.state.enddate && _this.state.starthours > times.getHours() % 12) {
          _this.setState({
            endhours: _this.state.starthours,
            endminutes: _this.state.startminutes,
            endsession: _this.state.startsession
          }, _this.propagateChange);
        } else if (_this.props.timemode && parseInt(_this.props.timemode) === 24 && _this.state.startdate === _this.state.enddate && _this.state.starthours > times.getHours()) {
          _this.setState({
            endhours: _this.state.starthours,
            endminutes: _this.state.startminutes,
            endsession: _this.state.startsession
          }, _this.propagateChange);
        } else {
          if (_this.props.timemode && parseInt(_this.props.timemode) === 24) {
            _this.setState({
              endhours: times.getHours(),
              endminutes: times.getMinutes()
            }, _this.propagateChange);
          } else {
            _this.setState({
              endhours: times.getHours() % 12,
              endminutes: times.getMinutes(),
              endsession: times.getHours() >= 12 ? "PM" : "AM"
            }, _this.propagateChange);
          }
        }
      }
    };

    _this.onHandleUpPress = function (data, part) {
      if (data === 'start' && part === 'hours') {
        _this.setState({
          starthours: _this.state.starthours + 1,
          endhours: _this.state.starthours + 1,
          endminutes: _this.state.startminutes,
          endsession: _this.state.startsession
        }, _this.propagateChange);
      } else if (data === 'start' && part === 'minutes') {
        _this.setState({
          startminutes: _this.state.startminutes + 1,
          endminutes: _this.state.startminutes + 1
        }, _this.propagateChange);
      } else if (data === "end" && part === 'hours') {
        if (_this.props.timemode && parseInt(_this.props.timemode) === 24 && _this.props.restrictTime && _this.props.restrictTime.endtime <= _this.state.endhours + 1) {// console.log('blocked for above timemode 24 hr restriction');
        } else if (_this.state.endsession === 'PM' && _this.props.restrictToDayTime && _this.props.restrictTime && _this.props.restrictTime.endtime - 1 <= _this.state.endhours) {} else {
          _this.setState({
            endhours: _this.state.endhours + 1
          }, _this.propagateChange);
        }
      } else if (data === "end" && part === 'minutes') {
        _this.setState({
          endminutes: _this.state.endminutes + 1
        }, _this.propagateChange);
      }
    };

    _this.onHandleDownPress = function (data, part) {
      if (data === 'start' && part === 'hours') {
        if (_this.props.restrictToDayTime && _this.state.startdate === _this.state.enddate && _this.state.startsession === "AM" && _this.props.restrictTime && _this.state.starthours - 1 < _this.props.restrictTime.starttime) {// console.log('yes happen');
        } else if (_this.props.restrictToDayTime && _this.props.restrictTime && _this.props.restrictTime.starttime >= _this.state.starthours) {// console.log('yes u got it');
        } else {
          // console.log('start hour', this.state.starthours -1 );
          _this.setState({
            starthours: _this.state.starthours - 1,
            endhours: _this.state.starthours - 1,
            endminutes: _this.state.startminutes,
            endsession: _this.state.startsession
          }, _this.propagateChange);
        }
      } else if (data === 'start' && part === 'minutes') {
        _this.setState({
          startminutes: _this.state.startminutes - 1,
          endhours: _this.state.starthours,
          endminutes: _this.state.startminutes - 1,
          endsession: _this.state.startsession
        }, _this.propagateChange);
      } else if (data === "end" && part === 'hours') {
        if (_this.state.startdate === _this.state.enddate && _this.state.startsession === _this.state.endsession && _this.state.starthours >= _this.state.endhours) {// console.log('yes end happen');
        } else if (_this.state.endsession === 'AM' && _this.props.restrictToDayTime && _this.props.restrictTime && _this.props.restrictTime.starttime >= _this.state.endhours) {// console.log('yes u got it');
        } else if (_this.state.endsession === 'PM' && _this.props.restrictToDayTime && _this.props.restrictTime && _this.props.restrictTime.endtime <= _this.state.endhours) {// console.log('yes u got it');
        } else {
          _this.setState({
            endhours: _this.state.endhours - 1,
            endminutes: _this.state.startminutes
          }, _this.propagateChange);
        }
      } else if (data === "end" && part === 'minutes') {
        if (_this.state.startdate === _this.state.enddate && _this.state.startsession === _this.state.endsession && _this.state.starthours === _this.state.endhours && _this.state.startminutes >= _this.state.endminutes) {// console.log('yes end happen');
        } else if (_this.props.restrictToDayTime && _this.state.startsession === _this.state.endsession && _this.state.starthours === _this.state.endhours && _this.state.startminutes >= _this.state.endminutes) {// console.log('yes end happen');
        } else {
          _this.setState({
            endminutes: _this.state.endminutes - 1
          }, _this.propagateChange);
        }
      }
    };

    _this.onTimePress = function (data) {
      if (data === 'start') {
        _this.setState({
          starthours: 12,
          startminutes: 0,
          startsession: "AM"
        }, _this.propagateChange);
      } else {
        _this.setState({
          endhours: 12,
          endminutes: 0,
          endsession: "AM"
        }, _this.propagateChange);
      }
    };

    _this.propagateChange = function () {
      var _this$state = _this.state,
          starthours = _this$state.starthours,
          startminutes = _this$state.startminutes,
          startsession = _this$state.startsession,
          endhours = _this$state.endhours,
          endminutes = _this$state.endminutes,
          endsession = _this$state.endsession;

      if (parseInt(_this.props.timemode) === 12) {
        _this.setState({
          starttime: "".concat((0, _util.twoDigits)(starthours), ":").concat((0, _util.twoDigits)(startminutes), " ").concat(startsession),
          endtime: "".concat((0, _util.twoDigits)(endhours), ":").concat((0, _util.twoDigits)(endminutes), " ").concat(endsession)
        });

        if (_this.props.onChange != null) {
          var date = {
            starttime: "".concat((0, _util.twoDigits)(starthours), ":").concat((0, _util.twoDigits)(startminutes), " ").concat(startsession),
            endtime: "".concat((0, _util.twoDigits)(endhours), ":").concat((0, _util.twoDigits)(endminutes), " ").concat(endsession)
          };

          _this.props.onChange(date);
        }
      } else {
        _this.setState({
          starttime: "".concat((0, _util.twoDigits)(starthours), ":").concat((0, _util.twoDigits)(startminutes)),
          endtime: "".concat((0, _util.twoDigits)(endhours), ":").concat((0, _util.twoDigits)(endminutes))
        });

        if (_this.props.onChange != null) {
          var _date = {
            starttime: "".concat((0, _util.twoDigits)(starthours), ":").concat((0, _util.twoDigits)(startminutes)),
            endtime: "".concat((0, _util.twoDigits)(endhours), ":").concat((0, _util.twoDigits)(endminutes))
          };

          _this.props.onChange(_date);
        }
      }
    };

    _this.wrapperRef = /*#__PURE__*/_react["default"].createRef();

    var _defaultValue = new Date();

    _defaultValue.setSeconds(0);

    _defaultValue.setMilliseconds(0);

    var _time = props.value || props.defaultValue || _defaultValue;

    _this.state = {
      select: 'h',
      starthours: _this.getinitialState("time"),
      endhours: _this.getinitialState("time"),
      startminutes: _time.getMinutes(),
      endminutes: _time.getMinutes(),
      startsession: _this.getinitialState("session"),
      endsession: _this.getinitialState("session"),
      opendate: false,
      opentime: false,
      startdate: props.selectedDate && props.selectedDate.startdate ? props.selectedDate.startdate : null,
      enddate: props.selectedDate && props.selectedDate.enddate ? props.selectedDate.enddate : null,
      starttime: null,
      endtime: null
    };
    return _this;
  }

  _createClass(TimePickerComponent, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var classes = this.props.classes;

      var _formatHours = (0, _util.formatHours)(this.state.hours, '12'),
          isPm = _formatHours.isPm;

      return /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        alignContent: "stretch",
        direction: "row",
        justify: "center",
        wrap: "wrap"
      }, /*#__PURE__*/_react["default"].createElement(_core.Paper, {
        elevation: 3,
        className: classes.paper_con
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        variant: "body2",
        align: "center",
        className: classes.header_title
      }, "Start Time"), /*#__PURE__*/_react["default"].createElement(_core.Divider, {
        orientation: "horizontal",
        variant: "fullWidth",
        light: true,
        className: classes.divider_style
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.custombtn_style
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        variant: "body2",
        align: "left",
        onClick: function onClick() {
          return _this2.onTimePress('start');
        }
      }, "12:00 AM"), /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        variant: "body2",
        align: "right",
        onClick: function onClick() {
          return _this2.onNowPress('start');
        }
      }, "Now")), /*#__PURE__*/_react["default"].createElement(_core.Divider, {
        orientation: "horizontal",
        variant: "fullWidth",
        light: true,
        className: classes.divider_style
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.paper_con1
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.time_con
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        align: "center"
      }, "Hours"), /*#__PURE__*/_react["default"].createElement(_ExpandLess["default"], {
        onClick: function onClick() {
          return _this2.state.starthours < parseInt(_this2.props.timemode) - 1 && _this2.onHandleUpPress("start", "hours");
        },
        className: classes.icon_style
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: (0, _classnames["default"])(classes.time, _defineProperty({}, classes.select, 'active'))
      }, (0, _util.twoDigits)(this.state.starthours)), /*#__PURE__*/_react["default"].createElement(_ExpandMore["default"], {
        onClick: function onClick() {
          return _this2.state.starthours >= 1 && _this2.onHandleDownPress("start", "hours");
        },
        className: classes.icon_style
      })), " :", /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.time_con
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        align: "center"
      }, "Minutes"), /*#__PURE__*/_react["default"].createElement(_ExpandLess["default"], {
        onClick: function onClick() {
          return _this2.state.startminutes <= 58 && _this2.onHandleUpPress("start", "minutes");
        },
        className: classes.icon_style
      }), /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        className: (0, _classnames["default"])(classes.time, _defineProperty({}, classes.select, 'active')),
        variant: "body2",
        align: "center"
      }, (0, _util.twoDigits)(this.state.startminutes)), /*#__PURE__*/_react["default"].createElement(_ExpandMore["default"], {
        onClick: function onClick() {
          return _this2.state.startminutes >= 1 && _this2.onHandleDownPress("start", "minutes");
        },
        className: classes.icon_style
      })), parseInt(this.props.timemode) === 12 && ":", parseInt(this.props.timemode) === 12 && /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.time_con
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        align: "center"
      }, "AM/PM"), /*#__PURE__*/_react["default"].createElement(_ExpandLess["default"], {
        onClick: function onClick() {
          return _this2.setPm("start");
        },
        className: classes.icon_style
      }), /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        className: (0, _classnames["default"])(classes.time, _defineProperty({}, classes.select, isPm)),
        variant: "body2",
        align: "center"
      }, this.state.startsession), /*#__PURE__*/_react["default"].createElement(_ExpandMore["default"], {
        onClick: function onClick() {
          return _this2.setPm("start");
        },
        className: classes.icon_style
      })))), /*#__PURE__*/_react["default"].createElement(_core.Paper, {
        elevation: 3,
        className: classes.paper_con
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        variant: "body2",
        align: "center",
        className: classes.header_title
      }, "End Time"), /*#__PURE__*/_react["default"].createElement(_core.Divider, {
        orientation: "horizontal",
        variant: "fullWidth",
        light: true,
        className: classes.divider_style
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.custombtn_style
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        variant: "body2",
        align: "left",
        onClick: function onClick() {
          return _this2.onTimePress('end');
        }
      }, "12:00 AM"), /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        variant: "body2",
        align: "right",
        onClick: function onClick() {
          return _this2.onNowPress('end');
        }
      }, "Now")), /*#__PURE__*/_react["default"].createElement(_core.Divider, {
        orientation: "horizontal",
        variant: "fullWidth",
        light: true,
        className: classes.divider_style
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.paper_con1
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.time_con
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        align: "center"
      }, "Hours"), /*#__PURE__*/_react["default"].createElement(_ExpandLess["default"], {
        onClick: function onClick() {
          return _this2.state.endhours < parseInt(_this2.props.timemode) - 1 && _this2.onHandleUpPress("end", "hours");
        },
        className: classes.icon_style
      }), /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        className: (0, _classnames["default"])(classes.time, _defineProperty({}, classes.select, 'active')),
        variant: "body2",
        align: "center"
      }, (0, _util.twoDigits)(this.state.endhours)), /*#__PURE__*/_react["default"].createElement(_ExpandMore["default"], {
        onClick: function onClick() {
          return _this2.state.endhours >= 1 && _this2.onHandleDownPress("end", "hours");
        },
        className: classes.icon_style
      })), " :", /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.time_con
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        align: "center"
      }, "Minutes"), /*#__PURE__*/_react["default"].createElement(_ExpandLess["default"], {
        onClick: function onClick() {
          return _this2.state.endminutes <= 58 && _this2.onHandleUpPress("end", "minutes");
        },
        className: classes.icon_style
      }), /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        className: (0, _classnames["default"])(classes.time, _defineProperty({}, classes.select, 'active')),
        variant: "body2",
        align: "center"
      }, (0, _util.twoDigits)(this.state.endminutes)), /*#__PURE__*/_react["default"].createElement(_ExpandMore["default"], {
        onClick: function onClick() {
          return _this2.state.endminutes >= 1 && _this2.onHandleDownPress("end", "minutes");
        },
        className: classes.icon_style
      })), parseInt(this.props.timemode) === 12 && ":", parseInt(this.props.timemode) === 12 && /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.time_con
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        align: "center"
      }, "AM/PM"), /*#__PURE__*/_react["default"].createElement(_ExpandLess["default"], {
        onClick: function onClick() {
          return _this2.setPm("end");
        },
        className: classes.icon_style
      }), /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        className: (0, _classnames["default"])(classes.time, _defineProperty({}, classes.select, isPm)),
        color: 'textPrimary',
        variant: "body2",
        align: "center"
      }, this.state.endsession), /*#__PURE__*/_react["default"].createElement(_ExpandMore["default"], {
        onClick: function onClick() {
          return _this2.setPm("end");
        },
        className: classes.icon_style
      })))));
    }
  }]);

  return TimePickerComponent;
}(_react["default"].Component);

var _default = (0, _styles.withStyles)(styles)(TimePickerComponent);

exports["default"] = _default;