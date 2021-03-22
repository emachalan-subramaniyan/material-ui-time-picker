# material-ui-time-picker
[![npm Package](https://img.shields.io/npm/v/material-ui-time-picker.svg)](https://www.npmjs.com/package/material-ui-time-picker)
[![Build Status](https://travis-ci.org/TeamWertarbyte/material-ui-time-picker.svg?branch=master)](https://travis-ci.org/TeamWertarbyte/material-ui-time-picker)
[![Coverage Status](https://coveralls.io/repos/github/TeamWertarbyte/material-ui-time-picker/badge.svg?branch=master)](https://coveralls.io/github/TeamWertarbyte/material-ui-time-picker?branch=master)

This project provides a [time picker][time-picker-spec] for [Material-UI][material-ui].

![Demo](demo.gif)

## Installation
```
npm i --save material-ui-time-picker
```

## Usage
There are multiple ways to use this component to allow greater flexibility. This is the most basic usage that behaves similar to the [Material-UI 0.x time picker][legacy-time-picker]:

```jsx
import DateTimePicker from 'material-ui-time-picker'

// uncontrolled input
<DateTimePicker
  range={false}
  includeDate={true}
  includeTime={true}
  timemode="12h"
  dateFormat={"DD/MM/YYYY"}
  onChange={data => console.log("data onchange", data)}
/>

// controlled input
<DateTimePicker
  range={false}
  includeDate={true}
  includeTime={true}
  defaultValue={"09/10/2021 09:10 AM"}
  timemode="12h"
  dateFormat={"DD/MM/YYYY"}
  onChange={data => console.log("data onchange", data)}
/>
```

For detailed documentation, take a look into the [styleguide][]. The source code, especially the tests, might also be helpful.

## TimeInput Properties
|Name|Type|Default|Description|
|---|---|---|---|
|range|`bool`|`false`|If true, its enable start and end date range picker.|
|includeDate|`bool`|`false`|Enable daterangepicker in the date range.|
|includeTime|`bool`|`false`|Enable timepicker in the date range.|
|defaultValue|`Object`|`null`|This default value overrides initialTime and placeholder.|
|includeRelativeDate|`bool`|`false`|Enable related date in the date range.|
|startPlaceholder|`Object`|`null`|State date placeholder text.|
|endPlaceholder|`Object`|`null`|End date placeholder text.|
|timemode|`Object`|`12hrs`|Used for whether time mode is 12hrs/24hrs.|
|maxPrev|`Object`|`null`|Maximum time allowed in previous navigation.|
|maxNext|`Object`|`null`|Maximum time allowed in next navigation.|
|restrictTime|`Object`|`null`|User for restrict start time and end time. Ex{starttime: 10, endtime: 18}.|
|restrictDays|`Object`|`null`|User for restrict start day and end day. Ex{firstday: 'Mo', lastday: 'Th'}, Available Options: {'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'}", "Object", "null".|
|dateFormat|`Object`|`null`|Format date(example 'DD/MM/YYYY').|
|onChange|`function`|`null`|function return selected date and time range value.|

Note: `TimeInput` behaves like Material-UI's `Input` component and can be used inside `FormControl`s.

## License
The files included in this repository are licensed under the MIT license.

[time-picker-spec]: https://material.io/guidelines/components/pickers.html#pickers-time-pickers
[material-ui]: https://material-ui.com/
[legacy-time-picker]: http://v0.material-ui.com/#/components/time-picker
[styleguide]: https://teamwertarbyte.github.io/material-ui-time-picker
