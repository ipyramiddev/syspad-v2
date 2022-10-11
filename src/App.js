import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContextProvider } from './context/AppContext'
import Enter from './pages/Enter.jsx';
import Home from './pages/Home.jsx';
import Stake from './pages/Stake.jsx';
import LaunchpadSingle from './pages/Launchpad_Single';
import LaunchpadPrivateSale from './pages/Launchpad_PrivateSale';
import CreateLaunchpad from './pages/CreateLaunchpad';
import IDOManage from './pages/IDOManage';
import Kyc from './pages/Kyc';
import Admin from './pages/Admin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
// import Accounts from './Components/Kyc/Accounts/Accounts';

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<Enter />} />
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Home />} />
          <Route path="stake" element={<Stake />} />
          <Route path="launchpad_single" element={<LaunchpadSingle />} />
          <Route path="launchpad_privatesale" element={<LaunchpadPrivateSale />} />
          <Route path="create_launchpad" element={<CreateLaunchpad />} />
          <Route path="ido_manage" element={<IDOManage />} />
          <Route path="kyc" element={<Kyc />} />
          {/* <Route path="accounts" element={<Accounts />} /> */}
          <Route path="admin" element={<Admin />} />
        </Routes>
        <ToastContainer />
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
