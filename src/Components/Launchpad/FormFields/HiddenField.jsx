import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

export default function HiddenField(props) {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);

  return (
    <TextField
      type="hidden"
      error={meta.touched && meta.error && true}
      {...field}
      {...rest}
    />
  );
}
