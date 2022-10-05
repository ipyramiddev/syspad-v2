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
    if (Object.keys(appContext.user).length !== 0 && !appContext.user.isAdmin) {
      console.log("appContext", appContext.user)
      navigate("/home");
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