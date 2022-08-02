import React from "react";
import tokens from "../../assets/data/token";

const TokenSale = () => {
  return (
    <div className="token-area">
      <ul className="token-list">
        {tokens.map(({ id, text, number}) => (
          <li key={id}>
            <span>{text}</span> <span>{number}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TokenSale;
