import * as React from 'react';
import { StylesProvider } from '@material-ui/core/styles';

import TimePickerWrapper from './TimePickerWrapper';
import generateClassName from '../generateClassName';

const TimePickerExporter = (
  props,
) => (
  <StylesProvider generateClassName={generateClassName}>
    <TimePickerWrapper
      {...props}
    />
  </StylesProvider>
);

export default TimePickerExporter;
