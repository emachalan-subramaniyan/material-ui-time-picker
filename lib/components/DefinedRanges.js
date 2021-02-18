"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isSameRange = function isSameRange(first, second) {
  var fStart = first.startDate,
      fEnd = first.endDate;
  var sStart = second.startDate,
      sEnd = second.endDate;

  if (fStart && sStart && fEnd && sEnd) {
    return (0, _dateFns.isSameDay)(fStart, sStart) && (0, _dateFns.isSameDay)(fEnd, sEnd);
  }

  return false;
};

var DefinedRanges = function DefinedRanges(_ref) {
  var ranges = _ref.ranges,
      setRange = _ref.setRange,
      selectedRange = _ref.selectedRange;
  return /*#__PURE__*/_react["default"].createElement(_core.List, null, ranges.map(function (range, idx) {
    return /*#__PURE__*/_react["default"].createElement(_core.ListItem, {
      button: true,
      key: idx,
      onClick: function onClick() {
        return setRange(range);
      }
    }, /*#__PURE__*/_react["default"].createElement(_core.ListItemText, {
      primaryTypographyProps: {
        variant: 'body2',
        style: {
          fontWeight: isSameRange(range, selectedRange) ? 'bold' : 'normal'
        }
      }
    }, range.label));
  }));
};

var _default = DefinedRanges;
exports["default"] = _default;