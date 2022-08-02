import React from 'react' 
import Header from '../Components/Global/Header';
import Staking from '../Components/Staking/Staking/Staking';
import Counter from '../Components/Staking/Counter/Counter';
import Footer from '../Components/Global/Footer';

const Stake = () => {
  return (
    <>
        <Header/> 
        <Staking/>
        <Counter/>
        <Footer/>
    </>
  )
}

export default Stake