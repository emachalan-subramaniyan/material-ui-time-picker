"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MARKERS = void 0;

var React = _interopRequireWildcard(require("react"));

var _dateFns = require("date-fns");

var _moment = _interopRequireDefault(require("moment"));

var _utils = require("../utils");

var _defaults = require("../defaults");

var _Menu = _interopRequireDefault(require("./Menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MARKERS = {
  FIRST_MONTH: 'firstMonth',
  SECOND_MONTH: 'secondMonth'
};
exports.MARKERS = MARKERS;

var DateRangePicker = function DateRangePicker(props) {
  var today = new Date();
  var open = props.open,
      onChange = props.onChange,
      initialDateRange = props.initialDateRange,
      minDate = props.minDate,
      maxDate = props.maxDate,
      _props$definedRanges = props.definedRanges,
      definedRanges = _props$definedRanges === void 0 ? _defaults.defaultRanges : _props$definedRanges,
      maxNext = props.maxNext,
      maxPrev = props.maxPrev,
      restrictDays = props.restrictDays,
      insertedStartDate = props.insertedStartDate,
      insertedEndDate = props.insertedEndDate;
  var minDateValid = (0, _utils.parseOptionalDate)(minDate, (0, _dateFns.addYears)(today, -10));
  var maxDateValid = (0, _utils.parseOptionalDate)(maxDate, (0, _dateFns.addYears)(today, 10));

  var _getValidatedMonths = (0, _utils.getValidatedMonths)(initialDateRange || {}, minDateValid, maxDateValid),
      _getValidatedMonths2 = _slicedToArray(_getValidatedMonths, 2),
      intialFirstMonth = _getValidatedMonths2[0],
      initialSecondMonth = _getValidatedMonths2[1];

  var _React$useState = React.useState(_objectSpread({}, initialDateRange)),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      dateRange = _React$useState2[0],
      setDateRange = _React$useState2[1];

  var _React$useState3 = React.useState(),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      hoverDay = _React$useState4[0],
      setHoverDay = _React$useState4[1];

  var _React$useState5 = React.useState(intialFirstMonth || today),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      firstMonth = _React$useState6[0],
      setFirstMonth = _React$useState6[1];

  var _React$useState7 = React.useState(initialSecondMonth || (0, _dateFns.addMonths)(firstMonth, 1)),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      secondMonth = _React$useState8[0],
      setSecondMonth = _React$useState8[1];

  React.useEffect(function () {
    if (insertedStartDate) {
      var d = new Date(insertedStartDate);
      var date = d.getDate();
      var month = d.getMonth() + 1;
      var year = d.getFullYear();
      var newDate = month + '/' + date + '/' + year;
      setFirstMonth(new Date(newDate));
    }
  }, [insertedStartDate]);
  React.useEffect(function () {
    if (insertedStartDate && insertedEndDate) {
      if (compare(insertedEndDate, insertedStartDate) >= 0) {
        var startdates = new Date(insertedStartDate);
        var enddates = new Date(insertedEndDate);
        var startdate = startdates.getDate();
        var startmonth = startdates.getMonth() + 1;
        var startyear = startdates.getFullYear();
        var enddate = enddates.getDate();
        var endmonth = enddates.getMonth() + 1;
        var endyear = enddates.getFullYear();
        var startnewDate = startmonth + '/' + startdate + '/' + startyear;
        var endnewDate = endmonth + '/' + enddate + '/' + endyear;
        var data = {
          startDate: new Date(startnewDate),
          label: null,
          endDate: new Date(endnewDate)
        };
        setDateRange(data);
        setSecondMonth(new Date(endnewDate));
      } else {
        var _data = {
          startDate: null,
          label: null,
          endDate: null
        };
        setDateRange(_data);
      }
    }
  }, [insertedStartDate && insertedEndDate]);
  var startDate = dateRange.startDate,
      endDate = dateRange.endDate;

  var compare = function compare(dateTimeA, dateTimeB) {
    var momentA = (0, _moment["default"])(dateTimeA, "DD/MM/YYYY");
    var momentB = (0, _moment["default"])(dateTimeB, "DD/MM/YYYY");
    if (momentA > momentB) return 1;else if (momentA < momentB) return -1;else return 0;
  }; // handlers


  var setFirstMonthValidated = function setFirstMonthValidated(date) {
    if ((0, _dateFns.isBefore)(date, secondMonth)) {
      setFirstMonth(date);
    }
  };

  var setSecondMonthValidated = function setSecondMonthValidated(date) {
    if ((0, _dateFns.isAfter)(date, firstMonth)) {
      setSecondMonth(date);
    }
  };

  var setDateRangeValidated = function setDateRangeValidated(range) {
    var newStart = range.startDate,
        newEnd = range.endDate;

    if (newStart && newEnd) {
      range.startDate = newStart = (0, _dateFns.max)(newStart, minDateValid);
      range.endDate = newEnd = (0, _dateFns.min)(newEnd, maxDateValid);
      setDateRange(range);
      onChange(range);
      setFirstMonth(newStart);
      setSecondMonth((0, _dateFns.isSameMonth)(newStart, newEnd) ? (0, _dateFns.addMonths)(newStart, 1) : newEnd);
    } else {
      var emptyRange = {};
      setDateRange(emptyRange);
      onChange(emptyRange);
      setFirstMonth(today);
      setSecondMonth((0, _dateFns.addMonths)(firstMonth, 1));
    }
  };

  var onDayClick = function onDayClick(day) {
    if (startDate && !endDate && !(0, _dateFns.isBefore)(day, startDate)) {
      var newRange = {
        startDate: startDate,
        endDate: day
      };
      onChange(newRange);
      setDateRange(newRange);
    } else {
      setDateRange({
        startDate: day,
        endDate: undefined
      });
    }

    setHoverDay(day);
  };

  var onMonthNavigate = function onMonthNavigate(marker, action) {
    if (marker === MARKERS.FIRST_MONTH) {
      var firstNew = (0, _dateFns.addMonths)(firstMonth, action);
      if ((0, _dateFns.isBefore)(firstNew, secondMonth)) setFirstMonth(firstNew);
    } else {
      var secondNew = (0, _dateFns.addMonths)(secondMonth, action);
      if ((0, _dateFns.isBefore)(firstMonth, secondNew)) setSecondMonth(secondNew);
    }
  };

  var onDayHover = function onDayHover(date) {
    if (startDate && !endDate) {
      if (!hoverDay || !(0, _dateFns.isSameDay)(date, hoverDay)) {
        setHoverDay(date);
      }
    }
  }; // helpers


  var inHoverRange = function inHoverRange(day) {
    return startDate && !endDate && hoverDay && (0, _dateFns.isAfter)(hoverDay, startDate) && (0, _dateFns.isWithinRange)(day, startDate, hoverDay);
  };

  var helpers = {
    inHoverRange: inHoverRange
  };
  var handlers = {
    onDayClick: onDayClick,
    onDayHover: onDayHover,
    onMonthNavigate: onMonthNavigate
  };
  return open ? /*#__PURE__*/React.createElement(_Menu["default"], {
    dateRange: dateRange,
    minDate: minDateValid,
    maxDate: maxDateValid,
    ranges: definedRanges,
    firstMonth: firstMonth,
    secondMonth: secondMonth,
    setFirstMonth: setFirstMonthValidated,
    setSecondMonth: setSecondMonthValidated,
    setDateRange: setDateRangeValidated,
    helpers: helpers,
    handlers: handlers,
    maxNextProps: maxNext,
    maxPrevProps: maxPrev,
    restrictDaysProps: restrictDays,
    includeRelativeDate: props.includeRelativeDate
  }) : null;
};

var _default = DateRangePicker;
exports["default"] = _default;