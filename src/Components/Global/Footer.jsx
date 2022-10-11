import React from 'react';
import { Col, Row } from 'react-bootstrap';
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
                        <Row className="footer-content m-0">
                           <Col className='col-sm-12 d-flex align-center'>
                           <Link to="/home">
                                <img src={logo} alt="logo" />
                            </Link>
                           </Col>
                            <Col className="footer-social pe-2">
                                {socials.map(({ id, links, icon, text }) => (
                                    <div className='social-links' key={id}>
                                        <a href={links}>{icon}{text}</a>
                                    </div>
                                ))}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <ScrollToTop showUnder={200}></ScrollToTop>
        </div>
    )
}

export default Footer