import React from 'react';
import { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { AiOutlineCheckCircle } from "react-icons/ai";

import { ethers } from 'ethers'
import abi from '../../contracts/PrivateSale_abi.json';
import staking_abi from '../../contracts/Staking_abi.json';
import ido_abi from '../../contracts/IDO_abi.json';

import "./kyc.scss";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const KycMain = () => {
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [contribution, setContribution] = useState(0);
    const [totalContribution, setTotalContribution] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [current, setCurrentDate] = useState(0);
    const [initialTime, setInitialTime] = useState(0);
    const [nextClaimDate, setNextClaimDate] = useState(null);
    const [isClaim, setIsClaimable] = useState(false);
    const [totalStaked, setTotalStaked] = useState(0);
    const [stakeReward, setReward] = useState(0);
    const [isRewardClaim, setRewardClaim] = useState(false);
    // const [i_contribution, setIDOContribution] = useState(0);
    // const [i_end, setIDOEnd] = useState(0);
    // const [i_isClaim, setIDOClaimable] = useState(false);

    // const contract_address = "0xde67400c78034103aaa07ba25bca9216bc9e1114"; // for Ropsten privatesale
    const contract_address = "0x9f80c03bc200e14AC4c9eB5Fef19D5EA59246828"; // for syscoin privatesale
    // const staking_contract = "0x8083d959537249e83b9166fafb315688f4426874"; // for ropsten
    const staking_contract = "0x5098BC1f0256A22F204493112134c4895ad6A639"; // for syscoin
    // const ido_contract = ""; // for ropsten
    // const ido_contract = "0x8467cdd0Aa00671dC85C2A0dD1f3F6da89D37fb6" // for syscoin

    let { ethereum } = window;
    let wallet_account = localStorage.getItem("setFullAddress");
    let contract = null;
    let s_contract = null;
    let i_contract = null;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    function createData(name, type, invested, current_price, to_return, return_in_dollar) {
        return { name, type, invested, current_price, to_return, return_in_dollar };
    }
    
    function createVestingData(name, tokenP, tokenA, total_token, date, action, is_claim) {
        return { name, tokenP, tokenA, total_token, date, action, is_claim };
    }
      
    const rows = [
        createData('Name', 'NFT Sale', "2,000", "5,000", 150, "3,000"),
        createData('Name', 'NFT Sale', "2,000", "5,000", 150, "3,000"),
        createData('Name', 'NFT Sale', "2,000", "5,000", 150, "3,000"),
        createData('Name', 'NFT Sale', "2,000", "5,000", 150, "3,000"),
        createData('Name', 'NFT Sale', "2,000", "5,000", 150, "3,000"),
        createData('Name', 'NFT Sale', "2,000", "5,000", 150, "3,000")
    ];
    
    const rows_vesting = [
        createVestingData('SYSPAD PrivateSale', '12.5%', contribution, totalContribution, nextClaimDate, <Button className='claim-btn text-white element' onClick={claimPrivateSaleTokens}>Claim Tokens</Button>, isClaim),
        createVestingData('Staking Reward', '#', stakeReward, totalStaked, "#", <Button className='claim-btn text-white element' onClick={claimStakingRewards}>Claim Rewards</Button>, isRewardClaim),
        // createVestingData('SYSPAD Project', '100%', i_contribution, i_contribution, "#", <Button className='claim-btn text-white element' onClick={claimIDOTokens}>Claim Rewards</Button>, i_isClaim)
    ];

    useEffect(() => {
        if(ethereum) {
            async function contract_interact() {
                let provider = new ethers.providers.Web3Provider(ethereum);
                let signer = provider.getSigner();
                contract = new ethers.Contract(contract_address, abi, signer);
                
                contract._contributions(wallet_account, 0).then((result)=>{
                    setContribution(parseInt(result.toString() / (10**18)) * 100);
                }).catch('error', console.error)

                contract.checkContribution(wallet_account).then((result)=>{
                    setTotalContribution(parseInt(result.toString() / (10**18)) * 100);
                }).catch('error', console.error)

                const _endDate = await contract.endPrivateSale();
                setEndDate(parseInt(_endDate.toString()));

                const _current = await contract.getCurrentTime();
                setCurrentDate(parseInt(_current.toString()));

                const _initial = await contract._initialTimestamp(wallet_account);
                setInitialTime(parseInt(_initial.toString()));
                let date = new Date((initialTime + 3600*24*30) * 1000);
                setNextClaimDate(date.toUTCString());

                s_contract = new ethers.Contract(staking_contract, staking_abi, signer);

                const _stakeAmount = await s_contract.stakeAmount(wallet_account);
                setTotalStaked(Math.ceil(_stakeAmount.toString() / (10**18)));

                const _reward = await s_contract.getEarnedRewardTokens(wallet_account);
                setReward(parseInt(_reward.toString()) / (10**18));

                // i_contract = new ethers.Contract(ido_contract, ido_abi, signer);

                // i_contract.checkContribution(wallet_account).then((result)=>{
                //     setIDOContribution(parseInt(result.toString() / (10**18)) * 100);
                // }).catch('error', console.error);

                // const _iEnd = await i_contract.endDate();
                // setIDOEnd(parseInt(_iEnd.toString()));
            } 

            contract_interact();
        }

        if(endDate < current && contribution > 0) {
            setIsClaimable(true);
        }

        if(stakeReward > 0) {
            setRewardClaim(true);
        }

        // if(i_end < current && i_contribution > 0) {
        //     setIDOClaimable(true);
        // }
    });
    
    async function claimPrivateSaleTokens() {
        let tx = await contract.claimTokens();
        await tx.wait();

        if(endDate < current && contribution > 0) {
            setIsClaimable(true);
        }
    }

    async function claimStakingRewards() {
        let tx = await s_contract.claim();
        await tx.wait();

        if(stakeReward > 0) {
            setRewardClaim(true);
        }
    }

    // async function claimIDOTokens() {
    //     let tx = await i_contract.claimTokens();
    //     await tx.wait();

    //     if(i_end < current && i_contribution > 0) {
    //         setIDOClaimable(true);
    //     }
    // }

    return (
        <div className="kyc-area">
            <Box className="kyc-box">
                <AppBar position="static">
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="inherit"
                    aria-label="full width tabs example"
                    >
                    <Tab className="kyc-tab text-muted-v2" label="KYC Application" {...a11yProps(0)} />
                    <Tab className="kyc-tab text-muted-v2" label="Portfolio" {...a11yProps(1)}/>
                    <Tab className="kyc-tab text-muted-v2" label="Upcoming Vesting" {...a11yProps(2)}/>
                    </Tabs>
                </AppBar>
                <div className="container">
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel className="kyc-tab-content" value={value} index={0} dir={theme.direction}>
                            <div className="kyc-application text-white">
                                <div className="header">
                                    KYC Application
                                </div>
                                <div className="content text-center">
                                    <AiOutlineCheckCircle/>
                                    <div>Your KYC application is approved</div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel className="kyc-tab-content" value={value} index={1} dir={theme.direction}>
                            <div className="kyc-portfolio text-white">
                                <div className="header">
                                    Portfolio
                                </div>
                                <div className="sub-title">Projects invested in and launched on SYSPAD</div>
                                <div className="content">
                                    <TableContainer>
                                        <Table className="portfolio-table" sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Type</TableCell>
                                                <TableCell align="right">Invested</TableCell>
                                                <TableCell align="right">Current Price</TableCell>
                                                <TableCell align="right">To Return</TableCell>
                                                <TableCell align="right">Return in $</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>{row.type}</TableCell>
                                                <TableCell align="right">{row.invested}</TableCell>
                                                <TableCell align="right">{row.current_price}</TableCell>
                                                <TableCell align="right">{row.to_return}</TableCell>
                                                <TableCell align="right">{row.return_in_dollar}</TableCell>
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel className="kyc-tab-content" value={value} index={2} dir={theme.direction}>
                            <div className="kyc-vesting text-white">
                                <div className="header">
                                    Upcoming Vesting
                                </div>
                                <div className="sub-title">Upcoming vesting for project invested in but still vesting</div>
                                <div className="content">
                                    <TableContainer>
                                        <Table className="portfolio-table" sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Token %</TableCell>
                                                <TableCell align="right">Token Amount</TableCell>
                                                <TableCell align="right">Total Token # Invested</TableCell>
                                                <TableCell align="right">Date</TableCell>
                                                <TableCell align="center">Action</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {rows_vesting.map((row) => (
                                                <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>{row.tokenP}</TableCell>
                                                <TableCell align="right">{row.tokenA}</TableCell>
                                                <TableCell align="right">{row.total_token}</TableCell>
                                                <TableCell align="right" className="date-cell">{row.date}</TableCell>
                                                <TableCell align="center">{(row.is_claim) && row.action}</TableCell>
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </TabPanel>
                    </SwipeableViews>
                </div>
            </Box>
        </div>
    )
}

export default KycMain