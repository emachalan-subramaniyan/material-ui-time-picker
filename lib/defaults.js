"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultRanges = void 0;

var _dateFns = require("date-fns");

var getDefaultRanges = function getDefaultRanges(date) {
  return [{
    label: 'Today',
    startDate: date,
    endDate: date
  }, {
    label: 'Yesterday',
    startDate: (0, _dateFns.addDays)(date, -1),
    endDate: (0, _dateFns.addDays)(date, -1)
  }, {
    label: 'This Week',
    startDate: (0, _dateFns.startOfWeek)(date),
    endDate: (0, _dateFns.endOfWeek)(date)
  }, {
    label: 'Last Week',
    startDate: (0, _dateFns.startOfWeek)((0, _dateFns.addWeeks)(date, -1)),
    endDate: (0, _dateFns.endOfWeek)((0, _dateFns.addWeeks)(date, -1))
  }, {
    label: 'Last 7 Days',
    startDate: (0, _dateFns.addWeeks)(date, -1),
    endDate: date
  }, {
    label: 'This Month',
    startDate: (0, _dateFns.startOfMonth)(date),
    endDate: (0, _dateFns.endOfMonth)(date)
  }, {
    label: 'Last Month',
    startDate: (0, _dateFns.startOfMonth)((0, _dateFns.addMonths)(date, -1)),
    endDate: (0, _dateFns.endOfMonth)((0, _dateFns.addMonths)(date, -1))
  }];
};

var defaultRanges = getDefaultRanges(new Date());
exports.defaultRanges = defaultRanges;