import React from 'react';
import { Link } from "react-router-dom"; 
import soonList from "../../../assets/data/soon"; 


import "./launchingSoon.scss"

const LaunchingSoon = () => {
  return (
    <div className="launchingSoon-area pt-100">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <div className="h2 text-white">Launching soon</div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                {soonList.map(({ id, image, admin, names, designation, desc, date, raising }) => (
    
                    <div className="col-lg-4 col-md-6" key={id}>
                        <div className="projects-item mt-4">
                            <Link to='/launchpad_single' className='projects-images'>
                                <img src={image} alt="images" />
                            </Link>
                            <div className="projects-text">
                                <img src={admin} alt="image" />
                                <div className="h4 text-white pt-3 pb-2">{names}</div>
                                <span>{designation}</span>
                                <p>{desc}</p>
                                <ul>
                                    <li><span>Launcing Date</span> <span>{date}</span></li>
                                    <li><span>Raising </span> <span>{raising}</span></li>
                                </ul> 
                            </div>
                            <div className="projects-btn">
                                <Link to='/launchpad_single'>
                                    token sale
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
               
            </div>
        </div>
    </div>
  )
}

export default LaunchingSoon