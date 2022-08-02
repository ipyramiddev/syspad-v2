import React from 'react' 
import Header from '../Components/Global/Header';
import Banner from '../Components/Home/Banner/Banner';
import Counter from '../Components/Home/Counter/Counter';
import LaunchingSoon from '../Components/Home/LaunchingSoon/LaunchingSoon';
import LaunchingProjects from '../Components/Home/LaunchingProjects/LaunchingProjects';
import Research from '../Components/Home/Research/Research';
import Footer from '../Components/Global/Footer';

const Home = () => {
  return (
    <>
        <Header/> 
        <Banner/>
        <Counter/>
        {/* <LaunchingSoon/> */}
        <LaunchingProjects/>
        <Research/>
        <Footer/>
    </>
  )
}

export default Home