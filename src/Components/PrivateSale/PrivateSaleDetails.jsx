import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import useStyles from './styles';

function PrivateSaleDetails(props) {
    let data = props.formValues;

    const products = [
        { name: 'Private Sale Address', value: data.address },
        { name: 'Token name', value: data.t_name },
        { name: 'Token symbol', value: data.t_symbol },
        { name: 'Token decimals', value: data.t_decimals },
        { name: 'Token Address', value: data.t_address },
        { name: 'Total token', value: data.t_supply },
        { name: 'Tokens for SeriesA Private Sale', value: data.t_private_supply },
        { name: 'Private Sale Rate', value: data.rate },
        { name: 'First Release for Private Sale', value: "12.5%" },
        { name: 'Vesting for Private Sale', value: "12.5% every month" },
        { name: 'End time', value: data.end_date }
    ];

    const classes = useStyles();
    return (
        <List className="mt-5" disablePadding>
        {products.map(product => (
            <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} />
            <Typography variant="body2">{product.value}</Typography>
            </ListItem>
        ))}
        </List>
    );
}

export default PrivateSaleDetails;
