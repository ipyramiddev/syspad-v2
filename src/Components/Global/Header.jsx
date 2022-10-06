/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import socials from "../../assets/data/socials";
import Logo from "../../assets/img/logo-min.svg";
import Logo2 from "../../assets/img/logo.png";
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { IoMdClose } from "react-icons/io";
import {
    RiDashboardFill,
    RiAccountCircleFill,
    RiStoreFill,
} from "react-icons/ri";
import { AiOutlineDollarCircle, AiOutlineMenu } from "react-icons/ai";
import { BiWallet } from "react-icons/bi";

// import firebase
import { query, where, getDocs } from 'firebase/firestore';
import { adminCollectionRef } from '../../lib/firebase.collections'

import { useAppContext } from '../../context/AppContext'

import "./header.scss";
const Header = () => {
    const [connectedAccount, setConnectedAccount] = useState(false);
    const [copyState, setCopyState] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const adminMenuOpen = Boolean(anchorEl);
    const handleAdminMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAdminMenuClose = () => {
        setAnchorEl(null);
    };

    const appContext = useAppContext()
    let { ethereum } = window;

    async function _connectMetamask() {
        const web3Modal = new Web3Modal();

        const connection = await web3Modal.connect();

        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const wallet = await signer.getAddress();

        const tempwallet = wallet.slice(0, 6) + "..." + wallet.slice(-5);
        setConnectedAccount(tempwallet);

        appContext.setUser({
            'full_addr': wallet,
            'address': tempwallet
        })
        localStorage.setItem('setFullAddress', wallet);
    }

    // function _disconnectWallet() {
    //     localStorage.removeItem("setAddress");
    //     localStorage.removeItem("setFullAddress");
    //     setConnectedAccount(false);
    // }
    useEffect(() => {
        let wallet = localStorage.getItem("setFullAddress");
        if (wallet) {
            const tempwallet = wallet.slice(0, 6) + "..." + wallet.slice(-5);
            appContext.setUser(prevState => ({
                ...prevState,
                full_addr: wallet,
                address: tempwallet,
            }))
            setConnectedAccount(tempwallet);
        }
    }, [])
    useEffect(() => {
        if (appContext.user.full_addr && !appContext.user.isAdmin) {
            async function getAdmin() {
                const q = query(adminCollectionRef, where("wallet_address", "==", appContext.user.full_addr))
                const querySnapshot = await getDocs(q)
                if (querySnapshot.docs.length > 0) {
                    appContext.setUser(prevState => ({
                        ...prevState,
                        isAdmin: true
                    }))
                } else {
                    appContext.setUser(prevState => ({
                        ...prevState,
                        isAdmin: false
                    }))
                }
            }
            getAdmin();
        }
    }, [appContext.user.full_addr])
    return (
        <nav className="navbar topMenu">
            <div className="container">
                <div className="left-head">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                    >
                        <AiOutlineMenu />
                    </button>
                    <Link className="navbar-brand" to="/home">
                        <img src={Logo} alt="Logo" />
                    </Link>
                    {/* <a className="navbar-brand" href="/dashboard">
                        <img src={Logo} alt="Logo" />
                    </a> */}
                </div>
                <div className="right-head">
                    {!(connectedAccount) && (
                        <Link to="#" onClick={_connectMetamask}>
                            <BiWallet /> Connect Wallet
                        </Link>
                    )}
                    {
                        connectedAccount && appContext.user.isAdmin && 
                        <>
                            <Button
                                id="basic-button"
                                aria-controls={adminMenuOpen ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={adminMenuOpen ? 'true' : undefined}
                                onClick={handleAdminMenuClick}
                            >
                                <Avatar sx={{ bgcolor: deepOrange[500], width: 55, height: 55, mr: '20px' }}>AD</Avatar>
                            </Button>
                            
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={adminMenuOpen}
                                onClose={handleAdminMenuClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem>
                                    <Link to="/admin" style={{color: '#fff'}}>
                                        Admin List
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </>
                    }
                    {(connectedAccount) && (
                        <CopyToClipboard text={"full_address"} onCopy={() => setCopyState(true)}>
                            <Link to="#">
                                <BiWallet /> {connectedAccount}
                            </Link>
                        </CopyToClipboard>
                        // <Link to="#" onClick={_disconnectWallet}>
                        //     <BiWallet /> {connectedAccount}
                        // </Link>
                    )}
                </div>
                <div
                    className="offcanvas offcanvas-start"
                    tabIndex="-1"
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div className="offcanvas-header justify-content-center">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                            <img src={Logo2} alt="Logo" height={150} />
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        >
                            <IoMdClose />
                        </button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link to="/dashboard">
                                    <RiDashboardFill /> Dashboard
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                {/* <Link to="/stake" className="nav-link dropdown-toggle show" id="offcanvasNavbarDropdown" role="button" aria-expanded="true"> */}
                                <Link to="/stake" id="offcanvasNavbarDropdown" role="button">
                                    <AiOutlineDollarCircle /> Stake
                                </Link>
                                {/* <ul className="dropdown-menu show" aria-labelledby="offcanvasNavbarDropdown">
                                <li className='dropdown-list'><Link to='/stake'>Show Tiers</Link></li> 
                                <li className='dropdown-list'><Link to='/stake'>Integration to stake</Link> </li> 
                                <li className='dropdown-list-sub'>
                                    <ul>
                                        <li className='dropdown-list'><Link to='/stake'>Deposit</Link></li>
                                        <li className='dropdown-list'><Link to='/stake'>Withdraw</Link></li>
                                        <li className='dropdown-list'><Link to='/stake'>Rewards</Link></li> 
                                    </ul>
                                </li> 
                            </ul> */}
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle show"
                                    href="#"
                                    id="offcanvasNavbarDropdown2"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="true"
                                >
                                    <RiAccountCircleFill /> Accounts
                                </a>
                                <ul
                                    className="dropdown-menu show"
                                    aria-labelledby="offcanvasNavbarDropdown2"
                                >
                                    <li className="dropdown-list">
                                        <Link to="/kyc">KYC & Audit</Link>
                                    </li>
                                </ul>
                            </li>
                            {
                                appContext.user.isAdmin &&
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle show"
                                        href="#"
                                        id="offcanvasNavbarDropdown3"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="true"
                                    >
                                        <RiStoreFill /> Launchpad
                                    </a>

                                    <ul
                                        className="dropdown-menu show"
                                        aria-labelledby="offcanvasNavbarDropdown3"
                                    >
                                        <li className="dropdown-list">
                                            <Link to="/create_launchpad">Create Launchpad</Link>
                                        </li>
                                    </ul>
                                </li>
                            }
                        </ul>
                        <ul className="menu-social">
                            <div className="menu-social-title">Join the community</div>
                            {socials.map(({ id, links, icon, text }) => (
                                <li key={id}>
                                    <a href={links}>
                                        {icon} {text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
