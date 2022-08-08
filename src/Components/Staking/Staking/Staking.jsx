import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CircularProgress } from '@material-ui/core';
import totalPowerImg from '../../../assets/img/total-power.png';
import stakedImg from '../../../assets/img/staked.png';
import pancakeLogo from '../../../assets/img/pancake.png';
import binanceLogo from '../../../assets/img/binance.png';
import uniswapLogo from '../../../assets/img/uniswap.png';
import coinbaseLogo from '../../../assets/img/coinbase.png';
import syspadImg from '../../../assets/img/syspad-token.png';
import { AiFillWarning } from "react-icons/ai";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { ethers } from 'ethers';
import staking_abi from '../../../contracts/Staking_abi.json';
import token_abi from '../../../contracts/Token_abi.json';

import "./staking.scss";

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

const Staking = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [depositAmnt, setDepositAmount] = useState("0.00");
    // const [depositBalance, setDepositBalance] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalStaked, setTotalStaked] = useState("0.00");
    const [myStaked, setMyStaked] = useState("0.00");
    const [is_approved, setTokenApprove] = useState(false);
    const [isLoading, setLoading] = useState(false);
    // const staking_contract = "0x8083d959537249e83b9166fafb315688f4426874"; // for ropsten
    const staking_contract = "0x5098BC1f0256A22F204493112134c4895ad6A639";
    // const token_contract = "0x04dbe249f46418542df912184dfa79699baee80b"; // for ropsten
    const token_contract = "0x569533592d84171fB6c86Ac484a8Dc732a79c814";

    let { ethereum } = window;
    let wallet_account = localStorage.getItem("setFullAddress");
    let contract = null;
    let t_contract = null;

    useEffect(() => {
        if(ethereum) {
            async function contract_interact() {
                let provider = new ethers.providers.Web3Provider(ethereum);
                let signer = provider.getSigner();
                contract = new ethers.Contract(staking_contract, staking_abi, signer);

                let total_staked = await contract.tokenTotalStaked();
                setTotalStaked(total_staked.toString() / (10**18));

                let my_staked = await contract.stakeAmount(wallet_account);
                setMyStaked(Math.ceil(my_staked.toString() / (10**18)));

                t_contract = new ethers.Contract(token_contract, token_abi, signer);

                const balance = (await t_contract.balanceOf(wallet_account)).toString();
                setTotalBalance(balance / (10**18));
            } 
    
            contract_interact();
        }
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goPancakeSwap = () => {
        window.open("https://pancakeswap.finance/swap", "_blank");
    };

    const goBinance = () => {
        window.open("https://www.binance.com/en/trade/SYSPAD_USDT", "_blank");
    };

    const goUniswap = () => {
        window.open("https://app.uniswap.org/#/swap", "_blank");
    };

    const goCoinbase = () => {
        window.open("https://www.coinbase.com/price/syspad", "_blank");
    };

    const goLearnMore = () => {
        window.location.href = "/learnmore";
    };

    const setMaxAmount = () => {
        setDepositAmount(totalBalance);
    };

    const depositToken = async () => {
        setLoading(true);
        let tx = await contract.stake(ethers.utils.parseEther(depositAmnt.toString()));
        await tx.wait();
        setLoading(false);
    };

    const approveToken = async () => {
        setLoading(true);
        let tx = await t_contract.approve(staking_contract, ethers.utils.parseEther(depositAmnt.toString()));
        await tx.wait();
        setTokenApprove(true);
        setLoading(false);
    };

    return (
        <div className="staking-area">
            <div className="container">
                {!(myStaked > 0) && (
                    <div className="alert row">
                        <div className="col-md-1 stake-warning-icon text-center">
                            <span className="warning-icon">
                                <AiFillWarning/>
                            </span>
                        </div>
                        <div className="col-md-7">
                            <span className="text-white font-20">Looks like your wallet doesn't have SYSPAD staked to participate in launches.</span>
                            <p className="sub-text text-muted-v2 font-12">Stake at least 10 SYSPAD to participate in launches and invest in the future of SYSCOIN and web3</p>
                        </div>
                        <div className="col-md-4 text-right externelTokenBuy">
                            <div>
                                <Button
                                    className="buyTokenBtn"
                                    aria-controls={open ? 'demo-customized-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    variant="contained"
                                    disableElevation
                                    onClick={handleClick}
                                    endIcon={<KeyboardArrowDownIcon />}
                                >
                                    BUY SYSPAD
                                </Button>
                                <Menu
                                    className="buyTokenMenu"
                                    MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={goPancakeSwap} className="text-white" disableRipple>
                                        <img src={pancakeLogo} className="menuImg" alt="PancakeSwap" /> PancakeSwap
                                    </MenuItem>
                                    <MenuItem onClick={goBinance} className="text-white" disableRipple>
                                        <img src={binanceLogo} className="menuImg" alt="Binance" /> Binance
                                    </MenuItem>
                                    <MenuItem onClick={goUniswap} className="text-white" disableRipple>
                                        <img src={uniswapLogo} className="menuImg" alt="Uniswap" /> Uniswap
                                    </MenuItem>
                                    <MenuItem onClick={goCoinbase} className="text-white" disableRipple>
                                        <img src={coinbaseLogo} className="menuImg" alt="Coinbase" /> Coinbase
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="row mt-50">
                    <div className="col-lg-7">
                        <div className="staking-status">
                            <div className="total-power row status-content">
                                <div className="col-md-2">
                                    <img src={totalPowerImg} alt="Total SYSPAD Power"/>
                                </div>
                                <div className="col-md-10">
                                    <p className="status-header">TOTAL SYSPAD POWER</p>
                                    <p className="status-amount text-white">{totalStaked}</p>
                                </div>
                            </div>

                            <div className="staked-amount row status-content mt-100">
                                <div className="col-md-2">
                                    <img src={stakedImg} alt="SYSPAD Staked"/>
                                </div>
                                <div className="col-md-10">
                                    <p className="status-header">SYSPAD STAKED ON ETHEREUM</p>
                                    <p className="status-amount text-white">{myStaked}</p>
                                </div>
                            </div>

                            <div className="action-pane row status-content mt-30 mb-50">
                                <div className="col-md-2">
                                </div>
                                <div className="col-md-10">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-6">
                                            <Button
                                                className="buyTokenBtn w-full"
                                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                variant="contained"
                                                disableElevation
                                                onClick={handleClick}
                                                endIcon={<KeyboardArrowDownIcon />}
                                            >
                                                BUY SYSPAD
                                            </Button>
                                            <Menu
                                                className="buyTokenMenu"
                                                MenuListProps={{
                                                'aria-labelledby': 'demo-customized-button',
                                                }}
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={goPancakeSwap} className="text-white" disableRipple>
                                                    <img src={pancakeLogo} className="menuImg" alt="PancakeSwap" /> PancakeSwap
                                                </MenuItem>
                                                <MenuItem onClick={goBinance} className="text-white" disableRipple>
                                                    <img src={binanceLogo} className="menuImg" alt="Binance" /> Binance
                                                </MenuItem>
                                                <MenuItem onClick={goUniswap} className="text-white" disableRipple>
                                                    <img src={uniswapLogo} className="menuImg" alt="Uniswap" /> Uniswap
                                                </MenuItem>
                                                <MenuItem onClick={goCoinbase} className="text-white" disableRipple>
                                                    <img src={coinbaseLogo} className="menuImg" alt="Coinbase" /> Coinbase
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                        <div className="col-xl-4 col-lg-6">
                                            <Button
                                                className="learnMoreBtn text-white w-full"
                                                onClick={goLearnMore}
                                            >
                                                Learn More
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 staking-pane">
                        <Box className="staking-box" sx={{ bgcolor: '#090e4e'}}>
                            <AppBar position="static">
                                <Tabs
                                value={value}
                                onChange={handleChange}
                                TabIndicatorProps={{
                                    style: {
                                        display: "none",
                                    }
                                }}
                                textColor="inherit"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                                >
                                <Tab className="staking-tab" label="Deposit & Lock" {...a11yProps(0)} />
                                <Tab className="staking-tab" label="Withdraw" {...a11yProps(1)} />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={value}
                                onChangeIndex={handleChangeIndex}
                            >
                                <TabPanel className="staking-tab-content" value={value} index={0} dir={theme.direction}>
                                    <div className="staking-statement text-white">
                                        STAKE SYSPAD TO PARTICIPATE IN ALLOWLISTS FOR UPCOMING IDOS.
                                    </div>

                                    <div className="staking-input mt-50">
                                        <label className="text-white">Stake Amount</label>
                                        <div className="main-input">
                                            <img className="element" src={syspadImg} alt="SYSPAD"></img>
                                            <input type="text" value={depositAmnt} name="amount" className='element amount text-white' onChange={(e) => setDepositAmount(e.target.value)} maxlength="15" required />
                                            <Button
                                                className="max-amnt-btn text-white element"
                                                onClick={setMaxAmount}
                                            >
                                                MAX AMOUNT
                                            </Button>
                                            <div className="clear"></div>
                                        </div>
                                    </div>

                                    <div className="text-center text-white mt-20">Balance: {totalBalance} SYSPAD</div>
                                    
                                    <div className="button-wrapper">
                                    {(is_approved) && (
                                        <Button
                                            className="deposit-btn text-white w-full"
                                            onClick={depositToken}
                                            disabled={isLoading}
                                        >
                                            Staking & Lock
                                        </Button>    
                                    )}
                                    {!(is_approved) && (
                                        <Button
                                            className="deposit-btn text-white w-full"
                                            onClick={approveToken}
                                            disabled={isLoading}
                                        >
                                            Authorize Wallet
                                        </Button>    
                                    )}
                                    {(isLoading) && (
                                        <CircularProgress
                                            size={24}
                                            className="button-progress"
                                        />
                                    )}
                                    </div>

                                    <div className="text-center text-muted-v2 font-14 mt-20">
                                        Your SYSPAD tokens will be locked for 14 days. After that time, you are free to withdraw at anytime.
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={1} dir={theme.direction}>
                                    <div className="staking-statement text-white">
                                        STAKE SYSPAD TO PARTICIPATE IN ALLOWLISTS FOR UPCOMING IDOS.
                                    </div>

                                    <div className="staking-input mt-50">
                                        <label className="text-white">Stake Amount</label>
                                        <div className="main-input">
                                            <img className="element" src={syspadImg} alt="SYSPAD"></img>
                                            <input type="text" value={depositAmnt} name="amount" className='element amount text-white' onChange={(e) => setDepositAmount(e.target.value)} maxlength="15" required />
                                            <Button
                                                className="max-amnt-btn text-white element"
                                                onClick={setMaxAmount}
                                            >
                                                MAX AMOUNT
                                            </Button>
                                            <div className="clear"></div>
                                        </div>
                                    </div>

                                    <div className="text-center text-white mt-20">Balance: {totalBalance} SYSPAD</div>
                                    
                                    <div className="button-wrapper">
                                    {(is_approved) && (
                                        <Button
                                            className="deposit-btn text-white w-full"
                                            onClick={depositToken}
                                            disabled={isLoading}
                                        >
                                            Staking & Lock
                                        </Button>    
                                    )}
                                    {!(is_approved) && (
                                        <Button
                                            className="deposit-btn text-white w-full"
                                            onClick={approveToken}
                                            disabled={isLoading}
                                        >
                                            Withdraw
                                        </Button>    
                                    )}
                                    {(isLoading) && (
                                        <CircularProgress
                                            size={24}
                                            className="button-progress"
                                        />
                                    )}
                                    </div>

                                    <div className="text-center text-muted-v2 font-14 mt-20">
                                        Your SYSPAD tokens will be locked for 14 days. After that time, you are free to withdraw at anytime.
                                    </div>
                                </TabPanel>
                            </SwipeableViews>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Staking