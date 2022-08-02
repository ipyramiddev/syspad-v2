import React from "react";
import { useLocation } from "react-router-dom";
import LaunchpadSingle from "../Components/LaunchpadSingle/LaunchpadSingle";
import Header from "../Components/Global/Header";
import Footer from "../Components/Global/Footer";

const Launchpad_Single = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <LaunchpadSingle data={location.state}/>
      <Footer />
    </>
  );
};

export default Launchpad_Single;
