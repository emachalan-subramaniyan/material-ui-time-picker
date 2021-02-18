"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _core = require("@material-ui/core");

var _TimePicker = _interopRequireDefault(require("./TimePicker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var useStyles = (0, _core.makeStyles)(function () {
  return {
    dateRangePickerContainer: {
      position: 'relative'
    },
    dateRangePicker: {
      position: 'relative',
      zIndex: 1
    },
    dateRangeBackdrop: {
      position: 'fixed',
      height: '100vh',
      width: '100vw',
      bottom: 0,
      zIndex: 0,
      right: 0,
      left: 0,
      top: 0
    }
  };
});

var TimePickerWrapper = function TimePickerWrapper(props) {
  var classes = useStyles();
  var closeOnClickTimeOutside = props.closeOnClickTimeOutside,
      wrapperClassName = props.wrapperClassName,
      timetoggle = props.timetoggle,
      opentime = props.opentime;

  var handleToggle = function handleToggle() {
    if (closeOnClickTimeOutside === false) {
      return;
    }

    timetoggle();
  };

  var handleKeyPress = function handleKeyPress(event) {
    return event && event.key === 'Escape' && handleToggle();
  };

  var wrapperClasses = (0, _classnames["default"])(classes.dateRangePicker, wrapperClassName);
  return /*#__PURE__*/React.createElement("div", {
    className: classes.dateRangePickerContainer
  }, opentime && /*#__PURE__*/React.createElement("div", {
    className: classes.dateRangeBackdrop,
    onKeyPress: handleKeyPress,
    onClick: handleToggle
  }), /*#__PURE__*/React.createElement("div", {
    className: wrapperClasses
  }, /*#__PURE__*/React.createElement(_TimePicker["default"], props)));
};

var _default = TimePickerWrapper;
exports["default"] = _default;