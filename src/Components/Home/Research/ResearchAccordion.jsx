import React from "react";
import { Accordion } from "react-bootstrap";

import accordion from "../../../assets/data/accordion";

import './research.scss'

const ResearchAccordion = () => {
  return (
    <div className="ResearchAccordion-content">
      <Accordion defaultActiveKey="0" flush>
        {accordion.map(({ id, title, desc }) => (
          <Accordion.Item eventKey={id} key={id}>
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
              <span dangerouslySetInnerHTML={{__html: desc}} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      
    </div>
  );
};

export default ResearchAccordion;
