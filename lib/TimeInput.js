"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _DateTimePicker = _interopRequireDefault(require("./DateTimePicker"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var styles = {
  header: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  body: {
    paddingBottom: 20
  }
};

var TimeInput = /*#__PURE__*/function (_React$Component) {
  _inherits(TimeInput, _React$Component);

  var _super = _createSuper(TimeInput);

  function TimeInput(props) {
    var _this;

    _classCallCheck(this, TimeInput);

    _this = _super.call(this, props);

    _this.showDialog = function () {
      return _this.setState({
        open: true,
        newValue: _this.state.value
      });
    };

    _this.handleChange = function (newValue) {
      _this.setState({
        newValue: newValue,
        hasChanged: true
      });
    };

    _this.handleOk = function () {
      if (_this.props.onChange != null) {
        _this.props.onChange(_this.state.newValue);
      }

      _this.setState({
        open: false,
        value: _this.state.newValue,
        newValue: null
      });
    };

    _this.handleCancel = function () {
      return _this.setState({
        open: false,
        newValue: null
      });
    };

    _this.getFormattedValue = function () {
      var _this$props = _this.props,
          mode = _this$props.mode,
          placeholder = _this$props.placeholder;
      var hasChanged = _this.state.hasChanged;
      var is12h = mode === '12h';
      if (placeholder && !hasChanged) return placeholder;
      var value = _this.state.value;

      if (_this.props.hasOwnProperty('value')) {
        if (_this.props.value == null) {
          // Allow a null/undefined value for controlled inputs
          return '';
        }

        value = _this.props.value;
      }

      var _formatHours = (0, _util.formatHours)(value.getHours(), mode),
          hours = _formatHours.hours,
          isPm = _formatHours.isPm;

      var minutes = (0, _util.twoDigits)(value.getMinutes());
      var displayHours = is12h ? hours : (0, _util.twoDigits)(value.getHours());
      var ending = is12h ? isPm ? ' pm' : ' am' : '';
      return "".concat(displayHours, ":").concat(minutes).concat(ending);
    };

    var defaultValue = new Date();
    defaultValue.setSeconds(0);
    defaultValue.setMilliseconds(0);
    var open = !!props.openOnMount;

    var _value = props.value || props.defaultValue || props.initialTime || defaultValue;

    _this.state = {
      open: open,
      value: _value,
      hasChanged: false,
      newValue: open ? _value : null
    };
    return _this;
  }

  _createClass(TimeInput, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          autoOk = _this$props2.autoOk,
          cancelLabel = _this$props2.cancelLabel,
          classes = _this$props2.classes,
          ClockProps = _this$props2.ClockProps,
          defaultValue = _this$props2.defaultValue,
          disabledProp = _this$props2.disabled,
          initialTime = _this$props2.initialTime,
          InputComponent = _this$props2.inputComponent,
          placeholder = _this$props2.placeholder,
          mode = _this$props2.mode,
          okLabel = _this$props2.okLabel,
          onChange = _this$props2.onChange,
          openOnMount = _this$props2.openOnMount,
          TimePickerProps = _this$props2.TimePickerProps,
          valueProp = _this$props2.value,
          other = _objectWithoutProperties(_this$props2, ["autoOk", "cancelLabel", "classes", "ClockProps", "defaultValue", "disabled", "initialTime", "inputComponent", "placeholder", "mode", "okLabel", "onChange", "openOnMount", "TimePickerProps", "value"]);

      var _this$state = this.state,
          newValue = _this$state.newValue,
          open = _this$state.open;
      var muiFormControl = this.context.muiFormControl;
      var disabled = disabledProp || muiFormControl != null && muiFormControl.disabled;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(InputComponent, _extends({}, other, {
        disabled: disabled,
        onClick: !disabled ? this.showDialog : null,
        value: this.getFormattedValue(),
        readOnly: true
      })), /*#__PURE__*/_react["default"].createElement(_core.Dialog, {
        maxWidth: "xs",
        open: open,
        onClose: this.handleCancel
      }, /*#__PURE__*/_react["default"].createElement(_DateTimePicker["default"], _extends({}, TimePickerProps, {
        mode: mode,
        value: newValue,
        onChange: this.handleChange,
        onMinutesSelected: autoOk ? this.handleOk : null,
        classes: {
          header: classes.header,
          body: classes.body
        },
        ClockProps: ClockProps
      })), /*#__PURE__*/_react["default"].createElement(_core.DialogActions, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
        onClick: this.handleCancel,
        color: "primary"
      }, cancelLabel), /*#__PURE__*/_react["default"].createElement(_core.Button, {
        onClick: this.handleOk,
        color: "primary"
      }, okLabel))));
    }
  }]);

  return TimeInput;
}(_react["default"].Component);

TimeInput.propTypes = {
  /** If true, automatically accept and close the picker on set minutes. */
  autoOk: _propTypes["default"].bool,

  /** Override the label of the cancel button. */
  cancelLabel: _propTypes["default"].string,

  /** Properties to pass down to the Clock component. */
  ClockProps: _propTypes["default"].object,

  /** This default value overrides initialTime and placeholder. */
  defaultValue: _propTypes["default"].instanceOf(Date),

  /** The default value for the time picker. */
  initialTime: _propTypes["default"].instanceOf(Date),

  /** The component used for the input. Either a string to use a DOM element or a component. */
  inputComponent: _propTypes["default"].elementType,

  /** The placeholder value for the time picker before a time has been selected. */
  placeholder: _propTypes["default"].string,

  /** Sets the clock mode, 12-hour or 24-hour clocks are supported. */
  mode: _propTypes["default"].oneOf(['12h', '24h']),

  /** Override the label of the ok button. */
  okLabel: _propTypes["default"].string,

  /** Callback that is called with the new date (as Date instance) when the value is changed. */
  onChange: _propTypes["default"].func,

  /** If true, automatically opens the dialog when the component is mounted. */
  openOnMount: _propTypes["default"].bool,

  /** Properties to pass down to the TimePicker component. */
  TimePickerProps: _propTypes["default"].object,

  /** The value of the time picker, for use in controlled mode. */
  value: _propTypes["default"].instanceOf(Date)
};
TimeInput.defaultProps = {
  autoOk: false,
  cancelLabel: 'Cancel',
  inputComponent: _core.Input,
  mode: '12h',
  okLabel: 'Ok'
};
TimeInput.contextTypes = {
  muiFormControl: _propTypes["default"].object
};

var _default = (0, _core.withStyles)(styles)(TimeInput);

exports["default"] = _default;