import React from 'react';
import metrics from "../../assets/data/metrics";

const Metrics = () => {
  return (
    <div className="token-area">
      <ul className="token-list">
        {metrics.map(({ id, text, number}) => (
          <li key={id}>
            <span>{text}</span> <span>{number}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Metrics