import React from 'react';
import { useFormikContext } from 'formik';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import useStyles from './styles';

function LaunchpadDetails() {
  const { values: formValues } = useFormikContext();

  const products = [
    { name: 'Project Name', value: formValues.projectName },
    { name: 'Total token', value: '100,000,000' },
    // { name: 'Factory Address', value: '0x569533592d84171fB6c86Ac484a8Dc732a79c814' },
    { name: 'Token name', value: "SyspadToken" },
    { name: 'Token symbol', value: "TSYSPAD" },
    { name: 'Token decimals', value: "18" },
    { name: 'Token rate', value: formValues.rate },
    { name: 'Hardcap', value: formValues.hardCap },
    // { name: 'Unsold tokens', value: 'Refund' },
    { name: 'Maximum buy', value: formValues.maxBuy },
    { name: 'Start time', value: formValues.startDate },
    { name: 'End time', value: formValues.endDate },
    { name: 'Website', value: formValues.website },
    { name: 'Facebook', value: formValues.facebook },
    { name: 'Twitter', value: formValues.twitter },
    { name: 'Telegram', value: formValues.telegram },
    { name: 'Github', value: formValues.github },
    { name: 'Instagram', value: formValues.instagram },
    { name: 'Discord', value: formValues.discord },
    { name: 'Reddit', value: formValues.reddit },
    { name: 'Description', value: formValues.description },
    // { name: 'Using Team Vesting', value: 'Yes' },
  ];

  const classes = useStyles();
  return (
    <List disablePadding>
      {products.map(product => (
        <ListItem className={classes.listItem} key={product.name}>
          <ListItemText primary={product.name} />
          <Typography variant="body2">{product.value}</Typography>
        </ListItem>
      ))}
    </List>
  );
}

export default LaunchpadDetails;
