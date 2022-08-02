import React from "react";
import { Link } from "react-router-dom";
import socials from "../../assets/data/socials"; 
import Logo from "../../assets/img/logo.png"; 
import "./splash.scss";

const Splash = () => {
  return (
    <div className="enter-app">
      <div className="enter-content">
        <div className="logo-content text-center">
          <img src={Logo} alt="logo" />
          <div className="enter-btn">
            <Link to="/home">Enter App</Link>
          </div>
        </div>
        <ul className="enter-social">
          {socials.map(({ id, links, icon }) => (
            <li key={id}>
              <a href={links}>{icon}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Splash;
