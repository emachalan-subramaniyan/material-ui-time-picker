"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _dateFns = require("date-fns");

var _ArrowRightAlt = _interopRequireDefault(require("@material-ui/icons/ArrowRightAlt"));

var _Month = _interopRequireDefault(require("./Month"));

var _DefinedRanges = _interopRequireDefault(require("./DefinedRanges"));

var _DateRangePicker = require("./DateRangePicker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    header: {
      padding: '20px 70px'
    },
    headerItem: {
      flex: 1,
      textAlign: 'center'
    },
    divider: {
      borderLeft: "1px solid ".concat(theme.palette.action.hover),
      marginBottom: 20
    }
  };
});

var Menu = function Menu(props) {
  var classes = useStyles();

  var _useState = (0, _react.useState)({
    prev: 0,
    next: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var ranges = props.ranges,
      dateRange = props.dateRange,
      minDate = props.minDate,
      maxDate = props.maxDate,
      firstMonth = props.firstMonth,
      setFirstMonth = props.setFirstMonth,
      secondMonth = props.secondMonth,
      setSecondMonth = props.setSecondMonth,
      setDateRange = props.setDateRange,
      helpers = props.helpers,
      handlers = props.handlers,
      maxNextProps = props.maxNextProps,
      maxPrevProps = props.maxPrevProps,
      restrictDaysProps = props.restrictDaysProps,
      range = props.range;
  var startDate = dateRange.startDate,
      endDate = dateRange.endDate;
  var canNavigateCloser = (0, _dateFns.differenceInCalendarMonths)(secondMonth, firstMonth) >= 2;
  var commonProps = {
    dateRange: dateRange,
    minDate: minDate,
    maxDate: maxDate,
    helpers: helpers,
    handlers: handlers
  };

  var onPrevClick = function onPrevClick(data, nav, item) {
    item === 'second' && setState(_objectSpread(_objectSpread({}, state), {}, {
      next: state.next - 1
    }));

    if (item === 'first' && maxPrevProps < state.prev + 1) {} else {
      item === 'first' && setState(_objectSpread(_objectSpread({}, state), {}, {
        prev: state.prev + 1
      }));
      handlers.onMonthNavigate(data, nav);
    }
  };

  var onNextClick = function onNextClick(data, nav, item) {
    item === 'first' && setState(_objectSpread(_objectSpread({}, state), {}, {
      prev: state.prev - 1
    }));

    if (item === 'second' && maxNextProps < state.next + 1) {} else {
      item === 'second' && setState(_objectSpread(_objectSpread({}, state), {}, {
        next: state.next + 1
      }));
      handlers.onMonthNavigate(data, nav);
    }
  };

  return /*#__PURE__*/_react["default"].createElement(_core.Paper, {
    elevation: 5,
    square: true
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    direction: "row",
    wrap: "wrap"
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    className: classes.header,
    alignItems: "center"
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    className: classes.headerItem
  }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
    variant: "subtitle1"
  }, startDate ? (0, _dateFns.format)(startDate, 'MMMM DD, YYYY') : range ? 'Start Date' : "Date")), range && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    className: classes.headerItem
  }, /*#__PURE__*/_react["default"].createElement(_ArrowRightAlt["default"], {
    color: "action"
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    className: classes.headerItem
  }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
    variant: "subtitle1"
  }, endDate ? (0, _dateFns.format)(endDate, 'MMMM DD, YYYY') : 'End Date')))), /*#__PURE__*/_react["default"].createElement(_core.Divider, null), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    direction: "row",
    justify: "center",
    wrap: "wrap"
  }, /*#__PURE__*/_react["default"].createElement(_Month["default"], _extends({}, commonProps, {
    defaultRange: range,
    value: firstMonth,
    setValue: setFirstMonth,
    navState: [true, canNavigateCloser],
    marker: _DateRangePicker.MARKERS.FIRST_MONTH,
    onPrevIconClick: function onPrevIconClick() {
      return onPrevClick(_DateRangePicker.MARKERS.FIRST_MONTH, NavigationAction.Previous, 'first');
    },
    onNextIconClick: function onNextIconClick() {
      return onNextClick(_DateRangePicker.MARKERS.FIRST_MONTH, NavigationAction.Next, 'first');
    },
    restrictDays: restrictDaysProps
  })), range && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.divider
  }), /*#__PURE__*/_react["default"].createElement(_Month["default"], _extends({}, commonProps, {
    value: secondMonth,
    setValue: setSecondMonth,
    navState: [canNavigateCloser, true],
    marker: _DateRangePicker.MARKERS.SECOND_MONTH,
    onPrevIconClick: function onPrevIconClick() {
      return onPrevClick(_DateRangePicker.MARKERS.SECOND_MONTH, NavigationAction.Previous, 'second');
    },
    onNextIconClick: function onNextIconClick() {
      return onNextClick(_DateRangePicker.MARKERS.SECOND_MONTH, NavigationAction.Next, 'second');
    },
    restrictDays: restrictDaysProps
  }))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.divider
  }), props.includeRelativeDate && range && /*#__PURE__*/_react["default"].createElement(_core.Grid, null, /*#__PURE__*/_react["default"].createElement(_DefinedRanges["default"], {
    selectedRange: dateRange,
    ranges: ranges,
    setRange: setDateRange
  }))));
};

var _default = Menu;
exports["default"] = _default;