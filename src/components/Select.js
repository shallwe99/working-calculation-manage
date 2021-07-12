import React from 'react';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText
} from '@material-ui/core';

export default function Select(props) {
  const { name, label, value, error = null, onChange, options } = props;
  return (
    // <FormControl variant="outlined" {...(error && { error: true })}>
    //   <InputLabel>{label}</InputLabel>
    //   <MuiSelect label={label} name={name} value={value} defaultValue="" onChange={onChange}>
    //     <MenuItem value="">None</MenuItem>
    //     {options.map((item) => (
    //       <MenuItem key={item.id} value={item.id}>
    //         {item.title}
    //       </MenuItem>
    //     ))}
    //   </MuiSelect>
    //   {error && <FormHelperText>{error}</FormHelperText>}
    // </FormControl>
    <FormControl sx={{ m: 1, minWidth: 120 }} error>
      <InputLabel id="department">Department</InputLabel>
      <Select
        labelId="department"
        id="departmentSelect"
        label={label}
        name={name}
        value={value}
        defaultValue=""
        onChange={onChange}
        renderValue={(value) => `⚠️  - ${value}`}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options &&
          options.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
