import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Tab, Row, Col, Nav, ProgressBar, Button } from "react-bootstrap";
import admin4 from "../../assets/img/admin4.png";
import img4 from "../../assets/img/projects4.png";
import syspadImg from "../../assets/img/syspad-token.png";
import "./LaunchpadSingle.scss";
import Description from "./Description";
import TokenSale from "./TokenSale";
import Metrics from "./Metrics";
import VestingSchedule from "./VestingSchedule";

import { ethers } from "ethers";
import abi from "../../contracts/IDO_abi.json";
import staking_abi from "../../contracts/Staking_abi.json";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/init-firebase";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const LaunchpadSingle = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [buyAmnt, setAmount] = useState("0.00");
  const [buyTokenBalance, setBuyToken] = useState(0);
  const [contribution, setContribution] = useState(0);
  const [current, setCurrentTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [weiRaised, setWeiRaised] = useState(0);
  const [data, setData] = useState([]);
  const [isScrollTop, setScrollTop] = useState(true);
  const staking_contract = "0xfDd20409e0Eccd4bb15D2D9F7B2cD46CA40A530D"; // syscoin
  const stakingLimit = 250;

  const startTime = data.start;

  let { ethereum } = window;
  let wallet_account = localStorage.getItem("setFullAddress");
  let contract = null;

  if (isScrollTop) {
    window.scrollTo(0, 0);
    setScrollTop(false);
  }

  useEffect(() => {
    getProject();
  });

  useEffect(() => {
    if (ethereum) {
      async function contract_interact() {
        let provider = new ethers.providers.Web3Provider(ethereum);
        let signer = provider.getSigner();

        contract = new ethers.Contract(data.address, abi, signer);

        const contribute = await contract.checkContribution(wallet_account);
        setContribution(parseInt(contribute.toString() / 10 ** 18));

        const currentBlockTime = await contract.getBlockTimestamp();
        setCurrentTime(parseInt(currentBlockTime.toString()));

        const endDate = await contract.endDate();
        setEndTime(parseInt(endDate.toString()));

        const _weiRaised = await contract.weiRaised();
        setWeiRaised(_weiRaised.toString() / 10 ** 18);

        const stakingContract = await new ethers.Contract(
          staking_contract,
          staking_abi,
          signer
        );

        const stakeAmnt = await stakingContract.stakeAmount(wallet_account);
        setStakeAmount(Math.ceil(stakeAmnt.toString() / 10 ** 18));
      }

      contract_interact();
    }
  }, [data]);

  async function buyTokens() {
    setLoading(true);
    if (buyAmnt <= 0) {
      toast.error("You must input bigger than 0.");
      setLoading(false);
      return;
    }
    if (buyAmnt > data.max_buy) {
      toast.error("cannot buy more than:" + data.maxBuy + " SYS.");
      setLoading(false);
      return;
    }
    if (stakeAmount < stakingLimit) {
      toast.error(
        "You must stake at least " +
          stakingLimit +
          " to participate in IDO Project."
      );
      setLoading(false);
      return;
    }
    try {
      const transaction = await contract.buyTokens(wallet_account, {
        value: ethers.utils.parseEther(buyAmnt.toString()),
      });
      await transaction.wait();
      toast.success("Buy tokens!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.message) {
        toast.error(error.message);
        return;
      }
      if (error.data) {
        toast.error(error.data.message);
        return;
      }
      toast.error("error");
    }
  }

  const setBuyAmount = (value) => {
    setAmount(value);
    setBuyToken(value * data.rate);
  };

  const setMaxAmount = () => {
    setAmount(data.max_buy - contribution);
    setBuyToken(buyAmnt * data.rate);
  };

  function getProject() {
    const docRef = doc(db, "ido_projects", props.data);

    getDoc(docRef)
      .then((response) => {
        const project = response.data();
        setData(project);
      })
      .catch((error) => console.log(error.message));
  }

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
                <span className="active">{data.name}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="single-left">
              <div className="single-admin">
                <img src={admin4} alt="images" />
                <div className="text">
                  <div className="h4 text-white">{data.name}</div>
                  <span>{data.description}</span>
                </div>
              </div>
              <div className="single-img">
                <img src={img4} alt="images" width="100%" />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="single-report">
              <div className="single-report-item">
                {endTime > current && (
                  <span className="sold-btn">In Progress</span>
                )}

                {endTime < current && (
                  <span className="sold-btn">Sold out</span>
                )}

                <div className="h3 text-white mt-3">{data.hardcap} SYS</div>
                {/* <div className="single-hr"></div> */}
                <ProgressBar
                  now={(weiRaised / data.hardcap) * 100}
                  className="progressBar"
                />
                <ul className="single-report-list">
                  <li>
                    <span>Max Allocation</span>{" "}
                    <span className="h5">{data.max_buy} SYS</span>
                  </li>
                  <li>
                    <span>Price per token</span>{" "}
                    <span className="h5">{1 / data.rate} SYS</span>
                  </li>
                  {/* <li>
                    <span>ATH ROI</span>{" "}
                    <span className="h6 ath-rol">+324%</span>
                  </li> */}
                </ul>
                {endTime > current && (
                  <>
                    <div className="buy-input mt-50">
                      <label className="text-white">Buy Amount</label>
                      <div className="main-input">
                        <img
                          className="element"
                          src={syspadImg}
                          alt="SYSPAD"
                        ></img>
                        <input
                          type="text"
                          value={buyAmnt}
                          name="amount"
                          className="element amount text-white"
                          onChange={(e) => setBuyAmount(e.target.value)}
                          maxLength="12"
                          required
                        />
                        <Button
                          className="max-amnt-btn text-white element"
                          onClick={setMaxAmount}
                        >
                          MAX AMOUNT
                        </Button>
                        <div className="clear"></div>
                      </div>
                    </div>
                    <div className="text-center text-white mt-20">
                      Token Balance: {buyTokenBalance}
                    </div>
                    <div className="report-btn">
                      <Button onClick={buyTokens} className="btn-success">
                        {isLoading && (
                          <CircularProgress
                            color="inherit"
                            size={20}
                            sx={{ mr: "10px" }}
                          />
                        )}
                        Join Sale
                      </Button>
                      <p>Started on {startTime}</p>
                    </div>
                  </>
                )}
                {endTime < current && (
                  <div className="report-btn">
                    <Button>Learn More</Button>
                  </div>
                )}
              </div>
              <Button className="sale-btn">Token Sale</Button>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="single-tab-border"></div>
          <div className="col-lg-8">
            <div className="single-tab">
              <Tab.Container defaultActiveKey="first">
                <Nav variant="pills" className="single-title">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Description </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Token Sale</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Contract Metrics </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth">Vesting Schedule</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Description />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <TokenSale />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <Metrics />
                  </Tab.Pane>
                  <Tab.Pane eventKey="fourth">
                    <VestingSchedule />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchpadSingle;
