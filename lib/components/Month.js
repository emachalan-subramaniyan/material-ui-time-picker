"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _dateFns = require("date-fns");

var _utils = require("../utils");

var _Header = _interopRequireDefault(require("./Header"));

var _Day = _interopRequireDefault(require("./Day"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var NavigationAction = {
  Previous: -1,
  Next: 1
};
var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    root: {
      width: 290
    },
    weekDaysContainer: {
      marginTop: 10,
      paddingLeft: 30,
      paddingRight: 30,
      justifyContent: "space-between"
    },
    daysContainer: {
      paddingLeft: 15,
      paddingRight: 15,
      marginTop: 15,
      marginBottom: 20
    },
    month_style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: "center",
      width: 20,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
      marginBottom: 5,
      cursor: 'pointer'
    }
  };
});

var Month = function Month(props) {
  var classes = useStyles();

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      monthClicked = _React$useState2[0],
      setmonthClicked = _React$useState2[1];

  var helpers = props.helpers,
      handlers = props.handlers,
      date = props.value,
      dateRange = props.dateRange,
      marker = props.marker,
      setDate = props.setValue,
      minDate = props.minDate,
      maxDate = props.maxDate,
      onPrevIconClick = props.onPrevIconClick,
      onNextIconClick = props.onNextIconClick,
      restrictDays = props.restrictDays;

  var onMonthClick = function onMonthClick(data) {
    setDate((0, _dateFns.setMonth)(date, data));
    setmonthClicked(null);
  };

  var _props$navState = _slicedToArray(props.navState, 2),
      back = _props$navState[0],
      forward = _props$navState[1];

  var startIndex = restrictDays && WEEK_DAYS.indexOf(restrictDays.firstday);
  var endIndex = restrictDays && WEEK_DAYS.indexOf(restrictDays.lastday);
  var WEEK_HEAD = restrictDays ? WEEK_DAYS.slice(startIndex, endIndex + 1) : WEEK_DAYS;
  return /*#__PURE__*/React.createElement(_core.Paper, {
    square: true,
    elevation: 0,
    className: classes.root
  }, /*#__PURE__*/React.createElement(_core.Grid, {
    container: true
  }, /*#__PURE__*/React.createElement(_Header["default"], {
    date: date,
    setDate: setDate,
    nextDisabled: !forward,
    prevDisabled: !back,
    onClickPrevious: onPrevIconClick,
    onClickNext: onNextIconClick,
    marker: marker // monthSelClick={(event) => {setDate(setMonth(date, parseInt(event.target.value)))}}
    ,
    monthSelClick: function monthSelClick(data) {
      return monthClicked ? setmonthClicked(null) : setmonthClicked(data);
    }
  }), /*#__PURE__*/React.createElement(_core.Grid, {
    item: true,
    container: true,
    direction: "row",
    justify: "space-between",
    className: classes.weekDaysContainer
  }, monthClicked && monthClicked === marker ? null : WEEK_HEAD.map(function (day) {
    return /*#__PURE__*/React.createElement(_core.Typography, {
      color: "textSecondary",
      key: day,
      variant: "caption"
    }, day);
  })), /*#__PURE__*/React.createElement(_core.Grid, {
    item: true,
    container: true,
    direction: "column",
    justify: "space-between",
    className: classes.daysContainer
  }, monthClicked && monthClicked === marker ? /*#__PURE__*/React.createElement(_core.Grid, {
    item: true,
    container: true,
    direction: "row",
    justify: "space-between",
    className: classes.weekDaysContainer
  }, MONTHS.map(function (month, idx) {
    return /*#__PURE__*/React.createElement(_core.Box, {
      bgcolor: (0, _dateFns.getMonth)(date) === idx ? "info.main" : "text.disabled",
      color: "background.paper",
      p: 2,
      onClick: function onClick() {
        return onMonthClick(idx);
      },
      className: classes.month_style
    }, month);
  })) : (0, _utils.chunks)((0, _utils.getDaysInMonth)(date), 7).map(function (week, idx) {
    // eslint-disable-next-line react/no-array-index-key
    // const i1 = restrictDays && week.indexOf(restrictDays.firstday);
    // const i2 = restrictDays && week.indexOf(restrictDays.lastday);
    var week_days = restrictDays ? week.slice(startIndex, endIndex + 1) : week;
    return /*#__PURE__*/React.createElement(_core.Grid, {
      key: idx,
      container: true,
      direction: "row",
      justify: "space-between"
    }, week_days.map(function (day) {
      var isStart = (0, _utils.isStartOfRange)(dateRange, day);
      var isEnd = (0, _utils.isEndOfRange)(dateRange, day);
      var isRangeOneDay = (0, _utils.isRangeSameDay)(dateRange);
      var highlighted = (0, _utils.inDateRange)(dateRange, day) || helpers.inHoverRange(day);
      return /*#__PURE__*/React.createElement(_Day["default"], {
        key: (0, _dateFns.format)(day, 'MM-DD-YYYY'),
        filled: isStart || isEnd,
        outlined: (0, _dateFns.isToday)(day),
        highlighted: highlighted && !isRangeOneDay,
        disabled: !(0, _dateFns.isSameMonth)(date, day) || !(0, _dateFns.isWithinRange)(day, minDate, maxDate),
        startOfRange: isStart && !isRangeOneDay,
        endOfRange: isEnd && !isRangeOneDay,
        onClick: function onClick() {
          return handlers.onDayClick(day);
        },
        onHover: function onHover() {
          return handlers.onDayHover(day);
        },
        value: (0, _dateFns.getDate)(day)
      });
    }));
  }))));
};

var _default = Month;
exports["default"] = _default;