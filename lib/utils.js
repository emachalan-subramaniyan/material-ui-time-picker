"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValidatedMonths = exports.parseOptionalDate = exports.isRangeSameDay = exports.inDateRange = exports.isEndOfRange = exports.isStartOfRange = exports.getDaysInMonth = exports.combine = exports.chunks = exports.identity = void 0;

var _dateFns = require("date-fns");

var identity = function identity(x) {
  return x;
};

exports.identity = identity;

var chunks = function chunks(array, size) {
  return Array.from({
    length: Math.ceil(array.length / size)
  }, function (_v, i) {
    return array.slice(i * size, i * size + size);
  });
};

exports.chunks = chunks;

var combine = function combine() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.filter(identity).join(' ');
}; // Date


exports.combine = combine;

var getDaysInMonth = function getDaysInMonth(date) {
  var startWeek = (0, _dateFns.startOfWeek)((0, _dateFns.startOfMonth)(date));
  var endWeek = (0, _dateFns.endOfWeek)((0, _dateFns.endOfMonth)(date));
  var days = [];

  for (var curr = startWeek; (0, _dateFns.isBefore)(curr, endWeek);) {
    days.push(curr);
    curr = (0, _dateFns.addDays)(curr, 1);
  }

  return days;
};

exports.getDaysInMonth = getDaysInMonth;

var isStartOfRange = function isStartOfRange(_ref, day) {
  var startDate = _ref.startDate;
  return startDate && (0, _dateFns.isSameDay)(day, startDate);
};

exports.isStartOfRange = isStartOfRange;

var isEndOfRange = function isEndOfRange(_ref2, day) {
  var endDate = _ref2.endDate;
  return endDate && (0, _dateFns.isSameDay)(day, endDate);
};

exports.isEndOfRange = isEndOfRange;

var inDateRange = function inDateRange(_ref3, day) {
  var startDate = _ref3.startDate,
      endDate = _ref3.endDate;
  return startDate && endDate && ((0, _dateFns.isWithinRange)(day, startDate, endDate) || (0, _dateFns.isSameDay)(day, startDate) || (0, _dateFns.isSameDay)(day, endDate));
};

exports.inDateRange = inDateRange;

var isRangeSameDay = function isRangeSameDay(_ref4) {
  var startDate = _ref4.startDate,
      endDate = _ref4.endDate;

  if (startDate && endDate) {
    return (0, _dateFns.isSameDay)(startDate, endDate);
  }

  return false;
};

exports.isRangeSameDay = isRangeSameDay;

var parseOptionalDate = function parseOptionalDate(date, defaultValue) {
  if (date) {
    var parsed = (0, _dateFns.parse)(date);
    if ((0, _dateFns.isValid)(parsed)) return parsed;
  }

  return defaultValue;
};

exports.parseOptionalDate = parseOptionalDate;

var getValidatedMonths = function getValidatedMonths(range, minDate, maxDate) {
  var startDate = range.startDate,
      endDate = range.endDate;

  if (startDate && endDate) {
    var newStart = (0, _dateFns.max)(startDate, minDate);
    var newEnd = (0, _dateFns.min)(endDate, maxDate);
    return [newStart, (0, _dateFns.isSameMonth)(newStart, newEnd) ? (0, _dateFns.addMonths)(newStart, 1) : newEnd];
  }

  return [startDate, endDate];
};

exports.getValidatedMonths = getValidatedMonths;