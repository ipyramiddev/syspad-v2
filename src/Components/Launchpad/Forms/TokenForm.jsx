import React, { useState, useEffect }from 'react';
import { useFormikContext } from 'formik';
import { Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { InputField, SelectField, HiddenField } from '../FormFields';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import abi from '../../../contracts/Token_abi.json';
import useStyles from './styles';

const networks = [
  {
    value: '1',
    label: 'SYSCOIN'
  },
];

export default function TokenForm(props) {
  let { ethereum } = window;
  let contract = null;
  const [t_name, setTokenName] = useState('');
  const [t_symbol, setTokenSymbol] = useState('');
  const [t_decimals, setTokenDecimals] = useState('');

  const {
    formField: {
      tokenAddress,
      tokenName,
      tokenSymbol,
      tokenDecimals,
      network
    }
  } = props;

  const { values: formValues } = useFormikContext();
  const classes = useStyles();

  useEffect(() => {
    if(ethereum) {
      if(formValues.tokenAddress.length === 42) {
        let provider = new ethers.providers.Web3Provider(ethereum);
        let signer = provider.getSigner();
        contract = new ethers.Contract(formValues.tokenAddress, abi, signer);

        async function getTokenName() {
          let tokenName = await contract.name();  
          setTokenName(tokenName);
        }

        async function getTokenSymbol() {
          let tokenSymbol = await contract.symbol();  
          setTokenSymbol(tokenSymbol);
        }

        async function getTokenDecimals() {
          let tokenDecimals = await contract.decimals();  
          setTokenDecimals(tokenDecimals);
        }

        getTokenName();
        getTokenSymbol();
        getTokenDecimals();
      }
    } else {
      alert("Please connect your wallet");
    }
  });

  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography> */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InputField name={tokenAddress.name} label={tokenAddress.label} fullWidth />
        </Grid>
        <HiddenField name={tokenName.name} value={t_name} />
        <HiddenField name={tokenSymbol.name} value={t_symbol} />
        <HiddenField name={tokenDecimals.name} value={t_decimals} />
        {t_name && (
          <Grid item xs={12}>
            <List disablePadding>
              <ListItem className={classes.listItem} key="Token Name">
                <ListItemText primary="Token Name" />
                <Typography variant="body2">{t_name}</Typography>
              </ListItem>
              <ListItem className={classes.listItem} key="Token Symbol">
                <ListItemText primary="Token Symbol" />
                <Typography variant="body2">{t_symbol}</Typography>
              </ListItem>
              <ListItem className={classes.listItem} key="Token Decimals">
                <ListItemText primary="Token Decimals" />
                <Typography variant="body2">{t_decimals}</Typography>
              </ListItem>
            </List>
          </Grid>
        )}
        
        <Grid item xs={12}>
          <SelectField
            name={network.name}
            label={network.label}
            data={networks}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
