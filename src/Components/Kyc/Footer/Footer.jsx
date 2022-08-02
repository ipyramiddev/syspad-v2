import React from 'react';
import ScrollToTop from 'react-scroll-up-to-top';
import kyc_footer from "../../../assets/data/kyc_footer";

import './footer.scss';
const Footer = () => {
  return (
    <div className="kyc-footer-area pb-5">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="footer-content">
                        <span className='text-kyc-footer'>&copy; 2022 SYSPAD. All Right Reserved </span>
                        <ul className="footer-kyc">
                            {kyc_footer.map(({ id, links, text }) => (
                                <li key={id}>
                                    <a className='text-kyc-footer' href={links}>{text}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div> 
        <ScrollToTop showUnder={200}></ScrollToTop>
    </div>
  )
}

export default Footer