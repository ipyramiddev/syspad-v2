import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ProgressBar, Button } from 'react-bootstrap';
import { Typography } from '@material-ui/core';
import pIconImg from "../../assets/img/private_icon.png";
import pImg from "../../assets/img/private_sale.jpg";
import usdcImg from '../../assets/img/usdc.png';

import "./index.scss";

import { ethers } from 'ethers'
import abi from '../../contracts/PrivateSale_abi.json';
import token_abi from '../../contracts/Token_abi.json';
import token_usdc_abi from '../../contracts/Token_USDC_abi.json';

import PrivateSaleDetails from './PrivateSaleDetails';

const LaunchpadPrivateSale = () => {
    // const contract = "0xde67400c78034103aaa07ba25bca9216bc9e1114"; // for Ropstein
    const contract = "0x9f80c03bc200e14AC4c9eB5Fef19D5EA59246828"; // for syscoin
    // const token_contract = "0x04dbe249f46418542df912184dfa79699baee80b"; // for Ropstein
    const token_contract = "0x569533592d84171fB6c86Ac484a8Dc732a79c814"; // for syscoin
    // const token_usdc_contract = "0x14b2e77064c4589a3c326974807a2bdb138da688"; //Ropsten USDC address
    const token_usdc_contract = "0x9E0A160597a3d67cbE56218e783BC17D37b74362"; //syscoing USDC address

    const [endTime, setEndTime] = useState(0);
    const [current, setCurrentTime] = useState(0);
    const [isOwner, setOwner] = useState(false);
    const [totalCap, setTotalCap] = useState(0);
    const [rate, setRate] = useState(1);
    const [weiRaised, setWeiRaised] = useState(0);
    const [buyAmnt, setAmount] = useState("0.00");
    const [buyTokenBalance, setBuyToken] = useState(0);
    const [maxBuy, setMaxBuy] = useState(0);
    const [contribution, setContribution] = useState(0);
    const [endUTCTime, setEndUTCTime] = useState(null);
    const [tokenName, setTokenName] = useState(null);
    const [tokenSymbol, setTokenSymbol] = useState(null);
    const [tokenDecimals, setTokenDecimals] = useState(null);
    const [totalSupply, setTotalSupply] = useState(0);
    
    let { ethereum } = window;
    let wallet_account = localStorage.getItem("setFullAddress");
    let p_contract = null;
    let t_contract = null;
    let usdc_contract = null;

    const detailData = {
      address: contract,
      t_name: tokenName,
      t_symbol: tokenSymbol,
      t_decimals: tokenDecimals,
      t_address: token_contract,
      t_supply: totalSupply,
      t_private_supply: totalCap,
      rate: rate,
      end_date: endUTCTime
    }

    useEffect(() => {
      window.scrollTo(0, 0)
    }, []);

    useEffect(() => {
        if(ethereum) {
          async function contract_interact() {
            let provider = new ethers.providers.Web3Provider(ethereum);
            let signer = provider.getSigner();
            p_contract = new ethers.Contract(contract, abi, signer);
    
            const currentBlockTime = await p_contract.getCurrentTime();
            setCurrentTime(parseInt(currentBlockTime.toString()));
    
            const endDate = await p_contract.endPrivateSale();
            setEndTime(parseInt(endDate.toString()));
            let date = new Date(endTime * 1000);
            setEndUTCTime(date.toUTCString());

            const _owner = await p_contract.owner();
            if(_owner === wallet_account) {
              setOwner(true);
            }

            p_contract._rate().then((result)=>{
              setRate(result.toString())
            }).catch('error', console.error)

            const _weiRaised = await p_contract.weiRaised();
            setWeiRaised(_weiRaised.toString() / (10**18));

            const _availabelTokens = await p_contract.availableTokens();
            setMaxBuy(parseInt(_availabelTokens.toString()) / (10**18));

            p_contract.checkContribution(wallet_account).then((result)=>{
              setContribution(parseInt(result.toString() / (10**18)));
            }).catch('error', console.error)

            t_contract = new ethers.Contract(token_contract, token_abi, signer);

            const _totalCap = await t_contract.getFirstPrivateSaleAmount();
            setTotalCap(_totalCap.toString() / (10**18));

            const _tokenName = await t_contract.name();
            setTokenName(_tokenName.toString());

            const _tokenSymbol = await t_contract.symbol();
            setTokenSymbol(_tokenSymbol.toString());

            const _decimals = await t_contract.decimals();
            setTokenDecimals(_decimals);

            const _total = await t_contract.totalSupply();
            setTotalSupply(parseInt(_total.toString()) / (10**18));

            usdc_contract = new ethers.Contract(token_usdc_contract, token_usdc_abi, signer);
          } 
    
          contract_interact();
        }
    });

    async function buyTokens() {
      if(buyAmnt > 0) {
        // approve token usdc
        const tx = await usdc_contract.approve(contract, ethers.utils.parseEther(buyAmnt.toString()));
        await tx.wait();

        const transaction = await p_contract.buyTokens(wallet_account, ethers.utils.parseEther(buyAmnt.toString()));
        await transaction.wait();

        alert('Buy tokens!')
      } else {
        alert("Buy amount must be > 0");
      }
    }

    const setBuyAmount = (value) => {
      setAmount(value);
      setBuyToken(value * rate);
    }
  
    const setMaxAmount = () => {
      setAmount(maxBuy);
      setBuyToken(buyAmnt * rate);
    };

    return (
        <div className="LaunchpadSingle-area pt-5 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <ul className="sigle-pagination">
              <li>
                <Link to="/home">Projects</Link>
              </li>
              <li>
                <span className="active">SYSPAD Private Sale</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="single-left">
              <div className="single-admin">
                <img src={pIconImg} alt="images" />
                <div className="text">
                  <div className="h4 text-white">SYSPAD Private Sale</div>
                  <span>Private sale for SYSPAD Token</span>
                </div>
              </div>
              <div className="single-img">
                <img src={pImg} alt="images" width="100%" />
              </div>
            </div>
            <div className="desc-panel mt-5 text-white">
              <Typography variant="h5" className="detail-header">
                Details
              </Typography>
              <PrivateSaleDetails formValues={detailData}/>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="single-report">
              <div className="single-report-item">
                {(endTime > current) && (
                  <span className="sold-btn">In Progress</span>
                )}

                {(endTime < current) && (
                  <span className="sold-btn">Sold out</span>
                )}
                
                <div className="h3 text-white mt-3">{totalCap} SYSPAD</div>
                {/* <div className="single-hr"></div> */}
                <ProgressBar now={weiRaised/(totalCap/rate)*100} className="progressBar" />
                <ul className="single-report-list">
                  <li>
                    <span>Price per token</span>{" "}
                    <span className="h5">{1/rate} USDC</span>
                  </li>
                  {/* <li>
                    <span>ATH ROI</span>{" "}
                    <span className="h6 ath-rol">+324%</span>
                  </li> */}
                </ul>
                {(endTime > current) && (
                  <>
                  <div className="buy-input mt-50">
                    <label className="text-white">Buy Amount</label>
                    <div className="main-input privatesale-input">
                        <img className="element" src={usdcImg} alt="SYSPAD"></img>
                        <input type="text" value={buyAmnt} name="amount" className='element amount text-white' onChange={(e) => setBuyAmount(e.target.value)} maxlength="12" required />
                        <Button
                            className="max-amnt-btn text-white element"
                            onClick={setMaxAmount}
                        >
                            MAX AMOUNT
                        </Button>
                        <div className="clear"></div>
                    </div>
                  </div>
                  <div className="text-center text-white mt-20">Token Balance: {buyTokenBalance}</div>
                  <div className="report-btn">
                    <Button onClick={buyTokens} className="btn-success">Buy SYSPAD</Button>
                    <p>Ends on {endUTCTime}</p>
                  </div>
                  </>
                )}
                {(endTime < current) && (
                  <div className="report-btn">
                    <Button>Learn More</Button>
                  </div>
                )}
              </div>
              <Button className="sale-btn">
                Token Sale
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default LaunchpadPrivateSale