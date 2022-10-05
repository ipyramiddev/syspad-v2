import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../Components/Global/Header';
import Create from '../Components/Launchpad/Create';
import Footer from '../Components/Global/Footer';
import { useAppContext } from '../context/AppContext'

const CreateLaunchapd = () => {
  const appContext = useAppContext()
  const navigate = useNavigate();

  useEffect(() => {
    let wallet = localStorage.getItem("setFullAddress");
    if (!wallet || (Object.keys(appContext.user).length !== 0 && !appContext.user.isAdmin)) {
      navigate("/home"); return;
    }
  }, [appContext.user.isAdmin])

  return (
    <>
      <Header />
      <Create />
      <Footer />
    </>
  )
}

export default CreateLaunchapd