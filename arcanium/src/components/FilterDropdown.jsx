import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

function FilterDropdown({ options, value, onChange, label, id }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap" gap={2}>
      <FormControl sx={{ minWidth: '120px' }}>
        <InputLabel id={`${id}-label`} htmlFor={id} shrink={value !== ""}>{label}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          value={value}
          onChange={onChange}
        >
          <MenuItem value="">All</MenuItem>
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {label === "CR" ? (
                option === 0.125 ? '1/8' :
                option === 0.25 ? '1/4' :
                option === 0.5 ? '1/2' : option
              ) : option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilterDropdown;
