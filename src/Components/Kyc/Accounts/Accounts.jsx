import React from 'react';
import DayCounter from '../../Global/DayCounter/DayCounter';
import Header from '../../Global/Header';
import Footer from '../Footer/Footer';
import { Col, Row } from 'react-bootstrap';
import roy from '../../../assets/logo/roy.png';
import lunchedPd from '../../../assets/logo/logoTwo.png'
import user from '../../../assets/logo/human.png'
import download from '../../../assets/logo/download.png'
import syspadBaner from '../../../assets/logo/syspadBnner.png'
// import scroll from '../../Assets/dashBoard/scroll.png'
// import token from '../../Assets/dashBoard/token.png';
import './Accounts.css';

const Accounts = () => {
    return (
        <>
        <Header />
        <div className='dashboard-main text-white'>

<Row className='px-md-5 p-2 m-0'>
    <Col className='col-12 col-md-4'>
        <div className='frist-box p-2 p-md-3'>
            <div className='tokenBalance'>
                <div className='mt-3'>
                    <img className='roy-token-img' src={roy} alt="" />
                </div>
                <div className='token-text py-4'>
                    <p className='text-white small-text mb-2'>TOKEN BALANCE</p>
                    <p className='text-white fs-3 fw-bold'>0 SYS</p>
                </div>
            </div>
            <hr className='new-hr-tag' />
            <div className='px-2'>
                <p className='smaller-text'>YOUR CONTRIBUTION IN</p>
                <Row className='usd-eth-btc my-2'>
                    <Col className="col-4 "><p className='fs-4 my-2'>3,555</p>
                        <p className='smaller-text'>USD</p>
                    </Col>
                    <Col className="col-4 "><p className='fs-4 my-2'>3,413.51</p>
                        <p className='smaller-text'>ETH</p>
                    </Col>
                    <Col className="col-4"><p className='fs-4 my-2'>0.12</p>
                        <p className='smaller-text'>BTC</p>
                    </Col>
                    
                </Row>
            </div>
        </div>
    </Col>

    <Col className='col-12 col-md-4 accounts-card'>
        <div className='second-box p-2 p-md-3'>
            <div className='tokenBalance'>
                <div className='roy-token-img img-two mt-3 mr-0'>
                    <img src={lunchedPd} alt="" /></div>
                <div className='token-text mt-3'>
                <p className='text-white small-text mb-2'>Demo Stage 4</p>
                    <p className='fs-4 fw-bolder my-3 textSys'>1 ROY = 0.00575 USD</p>
                    <button>RUNNING </button>
                </div>

            </div>
            <hr className='second-hr-tag' />
            <div className='Button-bottom-style'>
                <Row>
                    <Col className='col-12-col-md-9'></Col>
                    <Col className='col-12-col-md-3 py-2'>  
                    <button> BuyToken Now →</button></Col>
                </Row>

            </div>
        </div>
    </Col>
    <Col className='col-12 col-md-4 accounts-card'>
        <div className='second-box'>
        <p className='text-white small-text mt-4 ms-md-3'>Your Account Status</p>
            <div className='thrid-grid mt-4 ms-md-3'>
                <div className='thrid-img'>
                    <img src={user} alt="" />
                </div>
                <div className='token-text'>
                    <h3 className='text-white'>Rafat Rahman</h3>
                    <div className='two-button-style mt-3'>
                        <button>Email Verified</button>
                        <button className='ms-2'>KYC Submited</button>
                    </div>
                </div>
            </div>
            {/* <hr className='new-hr-tag' />
            <div className='Button-bottom-style'>
                <Row>
                    <Col className='col-12-col-md-9'></Col>
                    <Col className='col-12-col-md-3 mt-2'>  <button>My Profile →</button></Col>
                </Row>

            </div> */}
        </div>
    </Col>
</Row>


{/* second row of two col  */}

<div>
    <Row className='px-md-5  p-2 m-0 '>

        <Col className='col-12 col-md-8 mb-4'>
            <div className='syspad-text-img p-4'>
                <div className='text-white p-4 p-md-5'>
                    <h1>Thank you for your  <br /> interest on SYSPAD</h1>
                    <br />
                    <p>You can contribute SYSPAD token go through Buy Token page.
                        <br /><br />
                        You can get a quick response to any questions, and chat with the project in our Telegram:
                        <a href=" htts://t.me/SYSPAD"> htts://t.me/SYSPAD</a><br /><br /> <br />
                        Don’t hesitate to refer your friends!</p>
                    <button className='mt-4'>Download Whitepaper <img src={download} alt="" /></button>
                </div>
                <div className='sys-img'>
                    <img src={syspadBaner} alt="" className='syspadImg img-fluid mt-4' />
                </div>
            </div>
        </Col>
        <Col className='col-12 col-md-4 mt-1'>
            <div className='interestOnSyspad '>
                <div className=' text-white p-4 pd-md-4'>
                    <div className='d-flex align-items-center py-md-2'>
                        <img src="" alt="" /> <h3>Token Sales Progress</h3>
                    </div>
                    <Row className='m-0 p-0 py-md-2'>
                        <Col className='col-12 col-md-6 '>
                            <div className='sale-card'>
                                <h3>PAISED AMOUNT</h3>
                                <h6>7,687,454</h6>
                            </div>
                        </Col>
                        <Col className='col-12 col-md-6'>
                            <div className='sale-card'>
                                <h3>TOTAL TOKEN</h3>
                                <h6>9,950,000 SYS</h6>
                            </div>
                        </Col>
                    </Row>
                    <div className='py-md-2'>
                        <img src="" alt="" className='scrollBar' />
                    </div>
                    <p className='sels-end py-md-2'>SALES END IN</p>
                    <DayCounter></DayCounter>

                </div>
            </div>
        </Col>

    </Row>
</div>
</div>
        <Footer/>
      </>
    );
};

export default Accounts;