# material-ui-time-picker

## Installation
```
npm i --save material-ui-time-picker
```

## Usage
There are multiple ways to use this component to allow greater flexibility. This is the most basic usage that behaves similar to the [Material-UI 0.x time picker][legacy-time-picker]:

```jsx
import DateTimePicker from 'material-ui-time-picker'

// Range Included
<DateTimePicker
  range={true}
  includeDate={true}
  includeTime={true}
  includeRelativeDate={true}
  startPlaceholder={"Start Date & Time"}
  endPlaceholder={"End Date & Time"}
  restrictToDayTime={true}
  timemode="12h"
  restrictTime={{starttime: 10, endtime: 20}}
  restrictDays={{firstday: 'Mo', lastday: 'Fr'}}
  dateFormat={'DD/MM/YYYY'}
  onDateChange={(data) => console.log('on data onchange', data)}
  onTimeChange={(data) => console.log('on time change', data)}
/>

// Restrict days to specific days
<DateTimePicker
  includeDate={true}
  includeTime={true}
  includeRelativeDate={true}
  startPlaceholder={"Start Date & Time"}
  endPlaceholder={"End Date & Time"}
  restrictToDayTime={true}
  timemode="12h"
  restrictTime={{starttime: 10, endtime: 20}}
  restrictDays={{firstday: 'Mo', lastday: 'Fr'}}
  dateFormat={'DD/MM/YYYY'}
  onDateChange={(data) => console.log('on data onchange', data)}
  onTimeChange={(data) => console.log('on time change', data)}
/>

// Both Date and Time Picker in timemode 12h
<DateTimePicker
  includeDate={true}
  includeTime={true}
  includeRelativeDate
  startPlaceholder={"Start Date & Time"}
  endPlaceholder={"End Date & Time"}
  // restrictToDayTime={true}
  timemode="12h"
  // maxPrev={5}
  // maxNext={2}
  // restrictTime={{starttime: 10, endtime: 20}}
  restrictDays={{firstday: 'Su', lastday: 'Sa'}}
  dateFormat={'DD/MM/YYYY'}
  onDateChange={(data) => console.log('on data onchange', data)}
  onTimeChange={(data) => console.log('on time change', data)}
/>

// Both Date and Time Picker in timemode 24h
<DateTimePicker
  includeDate={true}
  includeTime={true}
  includeRelativeDate
  startPlaceholder={"Start Date & Time"}
  endPlaceholder={"End Date & Time"}
  // restrictToDayTime={true}
  timemode="24h"
  // maxPrev={5}
  // maxNext={2}
  // restrictTime={{starttime: 10, endtime: 20}}
  restrictDays={{firstday: 'Su', lastday: 'Sa'}}
  dateFormat={'DD/MM/YYYY'}
  onDateChange={(data) => console.log('on data onchange', data)}
  onTimeChange={(data) => console.log('on time change', data)}
/>

// Date Picker with restric navigation
<DateTimePicker
  includeDate={true}
  includeTime={true}
  includeRelativeDate
  startPlaceholder={"Start Date & Time"}
  endPlaceholder={"End Date & Time"}
  restrictToDayTime={true}
  timemode="12h"
  maxPrev={5}
  maxNext={2}
  restrictTime={{starttime: 10, endtime: 20}}
  restrictDays={{firstday: 'Su', lastday: 'Sa'}}
  dateFormat={'DD/MM/YYYY'}
  onDateChange={(data) => console.log('on data onchange', data)}
  onTimeChange={(data) => console.log('on time change', data)}
/>

// Date Picker without Related Date
<DateTimePicker
  includeDate={true}
  includeTime={true}
  includeRelativeDate={false}
  startPlaceholder={"Start Date & Time"}
  endPlaceholder={"End Date & Time"}
  restrictToDayTime={true}
  timemode="12h"
  maxPrev={5}
  maxNext={2}
  restrictTime={{starttime: 10, endtime: 20}}
  restrictDays={{firstday: 'Su', lastday: 'Sa'}}
  dateFormat={'DD/MM/YYYY'}
  onDateChange={(data) => console.log('on data onchange', data)}
  onTimeChange={(data) => console.log('on time change', data)}
/>

// Only Time Picker with 12h
<DateTimePicker
  includeDate={false}
  includeTime={true}
  startPlaceholder={"Start Date & Time"}
  endPlaceholder={"End Date & Time"}
  restrictToDayTime={true}
  timemode="12h"
  // maxPrev={5}
  // maxNext={2}
  // restrictTime={{starttime: 10, endtime: 20}}
  restrictDays={{firstday: 'Su', lastday: 'Sa'}}
  dateFormat={'DD/MM/YYYY'}
  onDateChange={(data) => console.log('on data onchange', data)}
  onTimeChange={(data) => console.log('on time change', data)}
/>

// Only Time Picker with 24h 
<DateTimePicker
  includeDate={false}
  includeTime={true}
  startPlaceholder={"Start Date & Time"}
  endPlaceholder={"End Date & Time"}
  restrictToDayTime={true}
  timemode="24h"
  // maxPrev={5}
  // maxNext={2}
  // restrictTime={{starttime: 10, endtime: 20}}
  restrictDays={{firstday: 'Su', lastday: 'Sa'}}
  dateFormat={'DD/MM/YYYY'}
  onDateChange={(data) => console.log('on data onchange', data)}
  onTimeChange={(data) => console.log('on time change', data)}
/>

// Only Time Picker with restrict time
<DateTimePicker
  includeDate={false}
  includeTime={true}
  startPlaceholder={"Start Date & Time"}
  endPlaceholder={"End Date & Time"}
  restrictToDayTime={true}
  timemode="12h"
  // maxPrev={5}
  // maxNext={2}
  restrictTime={{starttime: 10, endtime: 20}}
  restrictDays={{firstday: 'Su', lastday: 'Sa'}}
  dateFormat={'DD/MM/YYYY'}
  onDateChange={(data) => console.log('on data onchange', data)}
  onTimeChange={(data) => console.log('on time change', data)}
/>

// Restrict days to specific days
<DateTimePicker
  includeDate={true}
  includeTime={true}
  includeRelativeDate
  startPlaceholder={"Start Date & Time"}
  endPlaceholder={"End Date & Time"}
  restrictToDayTime={true}
  timemode="12h"
  restrictTime={{starttime: 10, endtime: 20}}
  restrictDays={{firstday: 'Mo', lastday: 'Fr'}}
  dateFormat={'DD/MM/YYYY'}
  onDateChange={(data) => console.log('on data onchange', data)}
  onTimeChange={(data) => console.log('on time change', data)}
/>

// Restrict days to specific days and restrict navigation
<DateTimePicker
  includeDate={true}
  includeTime={true}
  includeRelativeDate
  startPlaceholder={"Start Date & Time"}
  endPlaceholder={"End Date & Time"}
  restrictToDayTime={true}
  timemode="12h"
  maxPrev={5}
  maxNext={2}
  restrictTime={{starttime: 10, endtime: 20}}
  restrictDays={{firstday: 'Mo', lastday: 'Fr'}}
  dateFormat={'DD/MM/YYYY'}
  onDateChange={(data) => console.log('on data onchange', data)}
  onTimeChange={(data) => console.log('on time change', data)}
/>

// Change placeholder format YYYY/DD/MM
<DateTimePicker
  includeDate={true}
  includeTime={true}
  includeRelativeDate
  startPlaceholder={"Start Date & Time"}
  endPlaceholder={"End Date & Time"}
  restrictToDayTime={true}
  timemode="12h"
  maxPrev={5}
  maxNext={2}
  restrictTime={{starttime: 10, endtime: 20}}
  restrictDays={{firstday: 'Mo', lastday: 'Fr'}}
  dateFormat={'YYYY/DD/MM'}
  onDateChange={(data) => console.log('on data onchange', data)}
  onTimeChange={(data) => console.log('on time change', data)}
/>
```

For detailed documentation, take a look into the [styleguide][]. The source code, especially the tests, might also be helpful.

## TimeInput Properties
|Name|Type|Default|Description|
|---|---|---|---|
|range|`bool`|`false`|Enable start and end date range picker.|
|includeDate|`bool`|`false`|Enable daterangepicker in the date range.|
|includeTime|`bool`|`false`|Enable timepicker in the date range.|
|defaultValue|`Object`|`null`|Default value overrides initialTime and placeholder.|
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

[time-picker-spec]: https://material.io/guidelines/components/pickers.html#pickers-time-pickers
[material-ui]: https://material-ui.com/
[legacy-time-picker]: http://v0.material-ui.com/#/components/time-picker
[styleguide]: https://teamwertarbyte.github.io/material-ui-time-picker
