import React from 'react';
import { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { DropzoneArea } from 'material-ui-dropzone';
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
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { styled } from '@mui/material/styles';

import { AiOutlineCheckCircle, AiFillInfoCircle, AiOutlineAndroid, AiFillCheckCircle, AiOutlineCheck } from "react-icons/ai";

import { ethers } from 'ethers'
import abi from '../../contracts/PrivateSale_abi.json';
import staking_abi from '../../contracts/Staking_abi.json';
import ido_abi from '../../contracts/IDO_abi.json';

import SecuritySVG from "../../assets/img/security.svg";
import Verify1 from "../../assets/img/verify1.png";
import Verify2 from "../../assets/img/verify2.png";

import "./kyc.scss";

const CustomTextField = styled(TextField)(({ theme }) => ({
    margin: '1rem 0px 1rem 0',
    width: '50%',
    paddingRight: '2rem',

    '& .MuiInput-input': {
        color: '#e6effb',
    },
    '& .MuiInputLabel-root': {
        color: '#e6effb',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#cbcd45',
    },
    '& .MuiInputLabel-asterisk': {
        color: '#ef2f2f',
    },
    '& .MuiInput-root:before': {
        borderBottom: '1px solid #e6effb'
    },
    '& .MuiInput-root:hover:not(.Mui-disabled):before': {
        borderBottom: '2px solid #e6effb'
    },
}));
const CustomFullTextField = styled(TextField)(({ theme }) => ({
    margin: '1rem 0px 1rem 0',
    width: '100%',
    paddingRight: '2rem',

    '& .MuiInput-input': {
        color: '#e6effb',
    },
    '& .MuiInputLabel-root': {
        color: '#e6effb',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#cbcd45',
    },
    '& .MuiInputLabel-asterisk': {
        color: '#ef2f2f',
    },
    '& .MuiInput-root:before': {
        borderBottom: '1px solid #e6effb'
    },
    '& .MuiInput-root:hover:not(.Mui-disabled):before': {
        borderBottom: '2px solid #e6effb'
    },
    '& .MuiFormHelperText-root': {
        color: '#9b9b9b',
    },
}));
const CustomSelectField = styled(TextField)(({ theme }) => ({
    margin: '1rem 0px 1rem 0',
    width: '50%',
    paddingRight: '2rem',

    '& .MuiInput-input': {
        color: '#e6effb',
    },
    '& .MuiInputLabel-root': {
        color: '#e6effb',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#cbcd45',
    },
    '& .MuiInputLabel-asterisk': {
        color: '#ef2f2f',
    },
    '& .MuiInput-root:before': {
        borderBottom: '1px solid #e6effb'
    },
    '& .MuiInput-root:hover:not(.Mui-disabled):before': {
        borderBottom: '2px solid #e6effb'
    },
    '& .MuiSvgIcon-root': {
        color: '#e6effb',
    },
}));

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: '#e6effb',
    padding: '0 9px 9px 0',
    '&.Mui-checked': {
        color: '#e6effb',
    },
    '& .MuiSvgIcon-root': {
        fontSize: '28px'
    },
}));
const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    alignItems: 'flex-start',
    margin: '10px 0px',
}));

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
    const [KYCStep, setKYCStep] = useState(0);
    const [documentType, setDocumentType] = useState(0);

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
                        <Tab className="kyc-tab text-muted-v2" label="KYC Application" {...a11yProps(3)} />
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
                        {/* <TabPanel className="kyc-tab-content" value={value} index={0} dir={theme.direction}>
                            <div className="kyc-application text-white">
                                <div className="header">
                                    KYC Application
                                </div>
                                <div className="content text-center">
                                    <AiOutlineCheckCircle/>
                                    <div>Your KYC application is approved</div>
                                </div>
                            </div>
                        </TabPanel> */}
                        <TabPanel className="kyc-tab-content" value={value} index={0} dir={theme.direction}>
                            <div className="kyc-application text-white">
                                {
                                    KYCStep == 0 && 
                                    <>
                                        <div className="header">
                                            KYC Application
                                        </div>
                                        <div className="content text-center">
                                            <img className="imgSecurity" src={SecuritySVG} alt="" />
                                            <p className="description1">You have not submitted your necessary documents to verify your identity.</p>
                                            <p className="description2">It would great if you please submit the form. If you have any question, please feel free to contact our support team.</p>
                                            <Button className="btnStartKYC" onClick={() => setKYCStep(1)}>Click here to start KYC</Button>
                                        </div>
                                    </>
                                }
                                {
                                    KYCStep == 1 && 
                                    <>
                                        <div className="header">
                                            Begin your ID-Verification
                                        </div>
                                        <div className="content text-center p2rem-nobottom">
                                            <div className='stepbox step-header'>
                                                <div className='step-circle'>01</div>
                                                <div className='step-title'>
                                                    <p className='title1'>Personal Details</p>
                                                    <p>Your basic personal information is required for identification purposes.</p>
                                                </div>
                                            </div>
                                            <div className='stepbox step-content'>
                                                <div className='step-info'>
                                                    <AiFillInfoCircle />
                                                    <p>Please type carefully and fill out the form with your personal details. You are not allowed to edit the details once you have submitted the application.</p>
                                                </div>
                                                <div className='step1'>
                                                    <Box
                                                        component="form"
                                                        noValidate
                                                        autoComplete="off"
                                                    >
                                                        <div>
                                                            <CustomTextField
                                                                required
                                                                id="standard-required"
                                                                label="First Name"
                                                                defaultValue=""
                                                                variant="standard"
                                                            />
                                                            <CustomTextField
                                                                required
                                                                id="standard-required"
                                                                label="Last Name"
                                                                defaultValue=""
                                                                variant="standard"
                                                            />
                                                            <CustomTextField
                                                                id="standard-helperText"
                                                                label="Date of Birth"
                                                                defaultValue=""
                                                                variant="standard"
                                                            />
                                                            <CustomSelectField
                                                                required
                                                                id="standard-select-currency"
                                                                select
                                                                label="Gender"
                                                                helperText=""
                                                                variant="standard"
                                                            >
                                                                <MenuItem value={"M"}>{"Male"}</MenuItem>
                                                                <MenuItem value={"F"}>{"Female"}</MenuItem>
                                                            </CustomSelectField>
                                                            <CustomTextField
                                                                id="standard-required"
                                                                label="Telegram Username"
                                                                defaultValue=""
                                                                variant="standard"
                                                            />
                                                        </div>
                                                        <div className="txtAddress">Your Address</div>
                                                        <div>
                                                            <CustomSelectField
                                                                required
                                                                id="standard-select-currency"
                                                                select
                                                                label="Country"
                                                                helperText=""
                                                                variant="standard"
                                                            >
                                                                <MenuItem value={"US"}>{"United States of America"}</MenuItem>
                                                                <MenuItem value={"UA"}>{"Ukraine"}</MenuItem>
                                                                <MenuItem value={"IR"}>{"Ireland"}</MenuItem>
                                                            </CustomSelectField>
                                                            <CustomTextField
                                                                required
                                                                id="standard-required"
                                                                label="State"
                                                                defaultValue=""
                                                                variant="standard"
                                                            />
                                                            <CustomTextField
                                                                required
                                                                id="standard-helperText"
                                                                label="City"
                                                                defaultValue=""
                                                                variant="standard"
                                                            />
                                                            <CustomTextField
                                                                required
                                                                id="standard-required"
                                                                label="Zip / Postal Code"
                                                                defaultValue=""
                                                                variant="standard"
                                                            />
                                                            <CustomTextField
                                                                required
                                                                id="standard-required"
                                                                label="Address Line1"
                                                                defaultValue=""
                                                                variant="standard"
                                                            />
                                                            <CustomTextField
                                                                required
                                                                id="standard-required"
                                                                label="Address Line2"
                                                                defaultValue=""
                                                                variant="standard"
                                                            />
                                                        </div>
                                                    </Box>
                                                </div>
                                            </div>

                                            <div className='stepbox step-header'>
                                                <div className='step-circle'>02</div>
                                                <div className='step-title'>
                                                    <p className='title1'>Document Upload</p>
                                                    <p>To verify your identity, we ask you to upload high-quality scans or photos of your official identification documents issued by the government.</p>
                                                </div>
                                            </div>
                                            <div className='stepbox step-content'>
                                                <div className='step-info'>
                                                    <AiFillInfoCircle />
                                                    <p>In order to complete, please upload any of the following personal documents.</p>
                                                </div>
                                                <div className='step2'>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        marginTop="30px"
                                                    >
                                                        <Grid item xs={4} >
                                                            <div className={`verify-type-box ${documentType == 0 ? 'active' : ''}`} onClick={() => setDocumentType(0)}>
                                                                <AiOutlineAndroid className='img-verify'/>
                                                                <p>PASSPORT</p>
                                                                {documentType == 0 && <AiFillCheckCircle className='img-check'/>}
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <div className={`verify-type-box ${documentType == 1 ? 'active' : ''}`} onClick={() => setDocumentType(1)}>
                                                                <AiOutlineAndroid className='img-verify'/>
                                                                <p>NATIONAL ID CARD</p>
                                                                {documentType == 1 && <AiFillCheckCircle className='img-check'/>}
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <div className={`verify-type-box ${documentType == 2 ? 'active' : ''}`} onClick={() => setDocumentType(2)}>
                                                                <AiOutlineAndroid className='img-verify'/>
                                                                <p>DRIVER'S LICENSE</p>
                                                                {documentType == 2 && <AiFillCheckCircle className='img-check'/>}
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                <div className='step2'>
                                                    <div className='des-title'>To avoid deplays with verification process, please double-check to ensure the below requirements are fully met:</div>
                                                    <div className='des-item'>
                                                        <AiOutlineCheck />
                                                        <p>Chosen credential must not be expired.</p>
                                                    </div>
                                                    <div className='des-item'>
                                                        <AiOutlineCheck />
                                                        <p>Document should be in good condition and clearly visible.</p>
                                                    </div>
                                                    <div className='des-item'>
                                                        <AiOutlineCheck />
                                                        <p>There is no light glare or reflections on the card.</p>
                                                    </div>
                                                    <div className='des-item'>
                                                        <AiOutlineCheck />
                                                        <p>File is at least 1MB in size and has at least 300 dpi resolution.</p>
                                                    </div>
                                                    <div className='des-item'>
                                                        <AiOutlineCheck />
                                                        <p>Chosen credential must not be expired.</p>
                                                    </div>
                                                </div>
                                                <div className='step2'>
                                                    <div className='des-title'>Upload Here Your Passport Copy</div>
                                                    <div className='upload-container'>
                                                        <div className="upload-img">
                                                            <DropzoneArea
                                                                acceptedFiles={['image/*']}
                                                                // onChange={this.handleChange.bind(this)}
                                                                showFileNames
                                                                dropzoneText="Drag and drop file"
                                                                showAlerts={false}
                                                                filesLimit={1}
                                                            />
                                                        </div>
                                                        <div className='sample-img'>
                                                            <img src={Verify1} alt="image" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='step2 step2-divide'>
                                                    <div className='des-title'>Upload a selfie as a Photo Proof while holding document in your hand</div>
                                                    <div className='upload-container'>
                                                        <div className="upload-img">
                                                            <DropzoneArea
                                                                acceptedFiles={['image/*']}
                                                                // onChange={this.handleChange.bind(this)}
                                                                showFileNames
                                                                dropzoneText="Drag and drop file"
                                                                showAlerts={false}
                                                                filesLimit={1}
                                                            />
                                                        </div>
                                                        <div className='sample-img'>
                                                            <img src={Verify2} alt="image" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='stepbox step-header'>
                                                <div className='step-circle'>03</div>
                                                <div className='step-title'>
                                                    <p className='title1'>Your Paying Wallet</p>
                                                    <p>Submit your wallet address that you are going to send funds.</p>
                                                </div>
                                            </div>
                                            <div className='stepbox step-content'>
                                                <div className='step-info'>
                                                    <AiFillInfoCircle />
                                                    <p>DO NOT USE your exchange wallet address such as Kraken, Bitfinex, Bithumb, Binance etc.</p>
                                                </div>
                                                <div className='step3'>
                                                    <CustomSelectField
                                                        required
                                                        id="standard-select-currency"
                                                        select
                                                        label="Select Wallet"
                                                        helperText=""
                                                        variant="standard"
                                                    >
                                                        <MenuItem value={"eth"}>{"Ethereum"}</MenuItem>
                                                        <MenuItem value={"sol"}>{"Solana"}</MenuItem>
                                                    </CustomSelectField>
                                                </div>
                                                <div className='step3'>
                                                    <CustomFullTextField
                                                        required
                                                        id="standard-required"
                                                        label="Enter your wallet address"
                                                        defaultValue=""
                                                        variant="standard"
                                                        helperText="Note: Address should be ERC20-compliant"
                                                    />
                                                </div>
                                            </div>

                                            <div className='stepbox step-content'>
                                                <div className='step4'>
                                                    <FormGroup>
                                                        <CustomFormControlLabel control={<CustomCheckbox />} label={<p>I have read the Terms and Condition and Privacy and Policy.</p>} />
                                                        <CustomFormControlLabel control={<CustomCheckbox />} label={<p>All the personal information I have entered is correct</p>} />
                                                        <CustomFormControlLabel control={<CustomCheckbox />} label={<p>I certify that, I am registering to participate in the token distribution event(s) in the capacity of an individual(and beneficial owner) and not as an agent or representative of a third party corporate entity.</p>} />
                                                        <CustomFormControlLabel control={<CustomCheckbox />} label={<p>I understand that, I can participate in the token distribution event(s) only with the wallet address that was entered in the application form.</p>} />
                                                    </FormGroup>
                                                </div>
                                                <div className='step4'>
                                                    <Button className='btnSave' onClick={() => setKYCStep(2)}>Proceed to Verify</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                                {
                                    KYCStep == 2 && 
                                    <>
                                        <div className="header">
                                            KYC Application
                                        </div>
                                        <div className="content text-center">
                                            <AiOutlineCheckCircle className='imgApprove'/>
                                            <div className='approve-description'>Your KYC application is approved</div>
                                        </div>
                                    </>
                                }
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