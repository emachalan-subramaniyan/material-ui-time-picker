"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = require("@material-ui/core");

var _react = _interopRequireDefault(require("react"));

var _ChevronLeft = _interopRequireDefault(require("@material-ui/icons/ChevronLeft"));

var _ChevronRight = _interopRequireDefault(require("@material-ui/icons/ChevronRight"));

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _core.makeStyles)(function () {
  return {
    iconContainer: {
      padding: 5
    },
    icon: {
      padding: 10,
      '&:hover': {
        background: 'none'
      }
    }
  };
});
var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

var generateYears = function generateYears(relativeTo, count) {
  var half = Math.floor(count / 2);
  return Array(count).fill(0).map(function (_y, i) {
    return relativeTo.getFullYear() - half + i;
  }); // TODO: make part of the state
};

var Header = function Header(_ref) {
  var date = _ref.date,
      setDate = _ref.setDate,
      nextDisabled = _ref.nextDisabled,
      prevDisabled = _ref.prevDisabled,
      onClickNext = _ref.onClickNext,
      onClickPrevious = _ref.onClickPrevious,
      marker = _ref.marker,
      monthSelClick = _ref.monthSelClick;
  var classes = useStyles();

  var handleMonthChange = function handleMonthChange(event) {
    // setDate(setMonth(date, parseInt(event.target.value)));
    monthSelClick(event);
  };

  var handleYearChange = function handleYearChange(event) {
    setDate((0, _dateFns.setYear)(date, parseInt(event.target.value)));
  };

  return /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    justify: "space-between",
    alignItems: "center"
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    className: classes.iconContainer
  }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
    className: classes.icon,
    disabled: prevDisabled,
    onClick: onClickPrevious
  }, /*#__PURE__*/_react["default"].createElement(_ChevronLeft["default"], {
    color: prevDisabled ? 'disabled' : 'action'
  }))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
    onClick: function onClick() {
      return monthSelClick(marker);
    }
  }, MONTHS[(0, _dateFns.getMonth)(date)])), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react["default"].createElement(_core.Select, {
    value: (0, _dateFns.getYear)(date),
    onChange: function onChange(e) {
      return handleYearChange(e);
    },
    MenuProps: {
      disablePortal: true
    }
  }, generateYears(date, 30).map(function (year) {
    return /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
      key: year,
      value: year
    }, year);
  }))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    className: classes.iconContainer
  }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
    className: classes.icon,
    disabled: nextDisabled,
    onClick: onClickNext
  }, /*#__PURE__*/_react["default"].createElement(_ChevronRight["default"], {
    color: nextDisabled ? 'disabled' : 'action'
  }))));
};

var _default = Header;
exports["default"] = _default;