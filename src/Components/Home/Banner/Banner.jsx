import React from 'react';
import { Link } from "react-router-dom"; 
import BannerImg from '../../../assets/img/banner-img.png'; 

import "./Banner.scss"
const Banner = () => {
  return (
    <div className="banner-area">
        <div className="container">
            <div className="row m-0">
                <div className="col-lg-7 align-self-center">
                    <div className="banner-text">
                        <h1 className="h1 text-white text-center text-md-start">The official SYSCOIN Launchpad</h1>
                        <div className="h3 text-white pt-3 text-center text-md-start">Uncomplicated early access to highly-vetted projects.</div>
                        <div className="homeBaner-btn gap-4 mt-5">
                            <div className="btn-lg btn-bg1"> 
                                <Link to="/home">Upcoming Launches</Link>
                            </div>
                            <div className="btn-lg btn-bg2">
                                <Link to="/">Why we are better</Link>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 ms-auto">
                    <div className="banner-img">
                        <img src={BannerImg} alt="banner images" width="100%"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner