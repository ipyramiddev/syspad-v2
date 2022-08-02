import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { InputField, DatePickerField, CheckboxField } from '../FormFields';

export default function LaunchpadForm(props) {
  const {
    formField: { rate, hardCap, maxBuy, startDate, endDate, useVestingRule, firstRelease, vestingPeriod, eachRelease }
  } = props;

  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Payment method
      </Typography> */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InputField
            name={rate.name}
            label={rate.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={hardCap.name}
            label={hardCap.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={maxBuy.name}
            label={maxBuy.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePickerField
            name={startDate.name}
            label={startDate.label}
            format="yy/MM/DD"
            views={['year', 'month', 'day']}
            minDate={new Date()}
            maxDate={new Date('2050/12/31')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePickerField
            name={endDate.name}
            label={endDate.label}
            format="yy/MM/DD"
            views={['year', 'month', 'day']}
            minDate={new Date()}
            maxDate={new Date('2050/12/31')}
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={12}>
          <CheckboxField
            className="text-white"
            name={useVestingRule.name}
            label={useVestingRule.label}
          />
        </Grid>
        <Grid className="vesting" item xs={12}>
          <InputField
            name={firstRelease.name}
            label={firstRelease.label}
            fullWidth
          />
        </Grid>
        <Grid className="vesting" item xs={12} md={6}>
          <InputField
            name={vestingPeriod.name}
            label={vestingPeriod.label}
            fullWidth
          />
        </Grid>
        <Grid className="vesting" item xs={12} md={6}>
          <InputField
            name={eachRelease.name}
            label={eachRelease.label}
            fullWidth
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
