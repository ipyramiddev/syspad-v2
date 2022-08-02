import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

// import assets
import img4 from '../../../assets/img/projects4.png';
import admin from '../../../assets/img/admin4.png';
import pImg from '../../../assets/img/private_sale.jpg';
import pIconImg from '../../../assets/img/private_icon.png';
// import projects from "../../../assets/data/projects"; 

// import smart contract
import { ethers } from 'ethers';
import token_abi from '../../../contracts/Token_abi.json';
import CountDown from '../../../assets/data/project/CountDown';

// import firebase
import { getDocs } from 'firebase/firestore';
import { projectCollectionRef } from '../../../lib/firebase.collections'

import "./launchingProjects.scss";

const LaunchingProjects = () => {
    const [idoProjects, setProjects] = useState([]);
    const [totalSale, setTotalSale] = useState(0);
    // const token_contract = "0x04dbe249f46418542df912184dfa79699baee80b"; // ropsten
    // const token_contract = "0x569533592d84171fB6c86Ac484a8Dc732a79c814"; // syscoin

    useEffect(() => {
        getProjects();
    }, []);

    useEffect(() => {
        if(typeof window.ethereum !== undefined) {
            async function contract_interact() {
              await window.ethereum.enable();
    
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              const signer = provider.getSigner();
    
              const tokenContract = new ethers.Contract(idoProjects.token_address, token_abi, signer);
              let total = await tokenContract.getFirstPrivateSaleAmount();
              setTotalSale(total.toString() / (10**18));
            }
    
            contract_interact();
        }
    }, [idoProjects])

    function getProjects() {
        getDocs(projectCollectionRef)
            .then(response => {
                const projects = response.docs.map(doc => ({
                    data: doc.data(), 
                    id: doc.id
                }));
                setProjects(projects);
            })
            .catch(error => console.log(error.message));
    }

    return (
        <div className="launchingSoon-area pt-100 pb-150" id="launching-projects">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <div className="h2 text-white">Launched Projects</div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    {idoProjects.map(project => (
                        <div className="col-lg-4 col-md-6">
                            <div className="projects-item mt-4">
                                <Link to='/launchpad_single#' className='projects-images' state={project.id} >
                                    <img src={img4} alt="images" />
                                </Link>
                                <div className="projects-text">
                                    <img src={admin} alt="image" />
                                    <div className="h4 text-white pt-3 pb-2">{project.data.name}</div>
                                    <span>{project.data.token_symbol}</span>
                                    <p>{project.data.description}</p>
                                    <ul>
                                        <CountDown data={project.id}></CountDown>
                                        <li><span>Fundraise Goal</span> <span>{project.data.hardcap} SYS</span></li>
                                        <li><span>Max Allocation </span> <span>{project.data.max_buy} SYS</span></li>
                                    </ul>
                                </div>
                                <div className="projects-btn">
                                    <Link to="/launchpad_single#" state={project.id} >
                                        token sale
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="col-lg-4 col-md-6">
                        <div className="projects-item mt-4">
                            <Link to='/launchpad_privatesale#' className='projects-images' >
                                <img src={pImg} alt="images" />
                            </Link>
                            <div className="projects-text">
                                <img src={pIconImg} alt="image" />
                                <div className="h4 text-white pt-3 pb-2">SYSPAD Private Sale</div>
                                <span>SYSPAD</span>
                                <p>Private sale for SYSPAD Token</p>
                                <ul>
                                    {/* <CountDown data={timeData}></CountDown> */}
                                    <li><span>Fundraise Goal</span> <span>{totalSale} SYS</span></li>
                                    <li><span>Max Allocation </span> <span>{totalSale} SYS</span></li>
                                </ul>
                            </div>
                            <div className="projects-btn">
                                <Link to="/launchpad_privatesale#" >
                                    Private Sale
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LaunchingProjects