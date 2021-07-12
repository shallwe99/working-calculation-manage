// import React from 'react';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';

// export default function DatePicker(props) {
//   const { name, label, value, onChange } = props;
//   const convertToDefEventPara = (name, value) => ({
//     target: {
//       name,
//       value
//     }
//   });
//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <KeyboardDatePicker
//         disableToolbar
//         inputVariant="outlined"
//         label={label}
//         format="MMM/dd/yyyy"
//         name={name}
//         value={value}
//         onChange={(date) => onChange(convertToDefEventPara(name, date))}
//       />
//     </MuiPickersUtilsProvider>
//   );
// }

import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';

export default function BasicDatePicker(props) {
  const { name, label, value, onChange } = props;
  const [currentValue, setCurrentValue] = React.useState(value);
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value
    }
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={currentValue}
        onChange={(newValue) => {
          setCurrentValue(newValue);
          onChange(convertToDefEventPara(name, newValue));
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
