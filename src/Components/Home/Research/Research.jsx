import React from "react";
import { Link } from "react-router-dom"; 
import { FaDiscord} from "react-icons/fa"; 
import { SiGitbook} from "react-icons/si";
import ResearchAccordion from "./ResearchAccordion";

import researchImg from "../../../assets/img/research.png";

import './research.scss'

const Research = () => {
  return (
    <div className="research-area pt-100 pb-150">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 align-self-center">
            <div className="research-text">
              <div className="h1 text-white fw-bold">Do your own Research</div>
              <div className="h3 pt-4 fw-normal text-white">
                Check out our docs to get answers to these FAQ and more
              </div>
              <div className="d-flex gap-4 mt-5">
                <div className="btn-lg btn-bg1">
                  <Link to="/"><FaDiscord/> Discord</Link>
                </div>
                <div className="btn-lg btn-bg2">
                  <Link to="/"><SiGitbook/> documents</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 align-self-center">
            <div className="research-img">
              <img src={researchImg} alt="images" />
            </div>
          </div>
        </div>
        <div className="row pt-100">
          <div className="col-lg-12">
            <ResearchAccordion/>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Research;
