import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { InputField, TextAreaField } from '../FormFields';

export default function AdditionalInfoForm(props) {
  const {
    formField: { projectName, logoUrl, website, facebook, twitter, github, telegram, instagram, discord, reddit, description }
  } = props;

  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Payment method
      </Typography> */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InputField
            name={projectName.name}
            label={projectName.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={logoUrl.name}
            label={logoUrl.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={website.name}
            label={website.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={facebook.name}
            label={facebook.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={twitter.name}
            label={twitter.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={github.name}
            label={github.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={telegram.name}
            label={telegram.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={instagram.name}
            label={instagram.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={discord.name}
            label={discord.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={reddit.name}
            label={reddit.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextAreaField name={description.name} label={description.label} fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
