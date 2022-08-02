import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import Grid from '@material-ui/core/Grid';
import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';

export default function DatePickerField(props) {
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const isError = touched && error && true;
  const { value } = field;
  const [selectedDate, setSelectedDate] = useState(null);
  const now = new Date();
  let month = now.getUTCMonth();

  if(month+1 < 10) {
    month = '0' + (month + 1);
  }

  let day = now.getUTCDate();
  if(day < 10) {
    day = '0' + day;
  }

  let hour = now.getUTCHours();
  if(hour < 10) {
    hour = '0' + hour;
  }

  let minutes = now.getUTCMinutes();
  if(minutes < 10) {
    minutes = '0' + minutes;
  }

  let date = now.getUTCFullYear() + "-" + month + "-" + day + "T" + hour + ":" + minutes;

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
    }
  }, [value]);

  return (
    <Grid container>
      <TextField
        type="datetime-local"
        {...field}
        {...props}
        value={selectedDate}
        defaultValue={date}
        error={isError}
        invalidDateMessage={isError && error}
        helperText={isError && error}
      />
    </Grid>
  );
}
