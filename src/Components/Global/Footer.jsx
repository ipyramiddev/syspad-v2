import React from 'react';
import { Link } from 'react-router-dom';
import ScrollToTop from 'react-scroll-up-to-top';
import socials from "../../assets/data/socials"; 
import logo from "../../assets/img/SYSPAD.png"

import './footer.scss';
const Footer = () => {
  return (
    <div className="footer-area pb-5">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="footer-content">
                        <Link to="/home">
                            <img src={logo} alt="logo" />
                        </Link>
                        <ul className="footer-social">
                            {socials.map(({ id, links, icon, text }) => (
                                <li key={id}>
                                    <a href={links}>{icon} {text}</a>
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