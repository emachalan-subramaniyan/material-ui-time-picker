"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _utils = require("../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    leftBorderRadius: {
      borderRadius: '50% 0 0 50%'
    },
    rightBorderRadius: {
      borderRadius: '0 50% 50% 0'
    },
    buttonContainer: {
      display: 'flex'
    },
    button: {
      height: 36,
      width: 36,
      padding: 0
    },
    buttonText: {
      lineHeight: 1.6,
      justifyContent: 'space-evenly'
    },
    outlined: {
      border: "1px solid ".concat(theme.palette.primary.dark)
    },
    filled: {
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      },
      backgroundColor: theme.palette.primary.dark
    },
    highlighted: {
      backgroundColor: theme.palette.action.hover
    },
    contrast: {
      color: theme.palette.primary.contrastText
    }
  };
});

var Day = function Day(_ref) {
  var startOfRange = _ref.startOfRange,
      endOfRange = _ref.endOfRange,
      disabled = _ref.disabled,
      highlighted = _ref.highlighted,
      outlined = _ref.outlined,
      filled = _ref.filled,
      onClick = _ref.onClick,
      onHover = _ref.onHover,
      value = _ref.value;
  var classes = useStyles();
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _utils.combine)(classes.buttonContainer, startOfRange && classes.leftBorderRadius, endOfRange && classes.rightBorderRadius, !disabled && highlighted && classes.highlighted)
  }, /*#__PURE__*/React.createElement(_core.IconButton, {
    className: (0, _utils.combine)(classes.button, !disabled && outlined && classes.outlined, !disabled && filled && classes.filled),
    disabled: disabled,
    onClick: onClick,
    onMouseOver: onHover
  }, /*#__PURE__*/React.createElement(_core.Typography, {
    color: !disabled ? 'textPrimary' : 'textSecondary',
    className: (0, _utils.combine)(classes.buttonText, !disabled && filled && classes.contrast),
    variant: "body2"
  }, value)));
};

var _default = Day;
exports["default"] = _default;