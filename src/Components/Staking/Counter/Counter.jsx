import React from 'react';
import counter from '../../../assets/data/staking/counter';



import "./counter.scss"

const Counter = () => {
  return (
    <div className="counter-area pb-150">
        <div className="container pr-100 pl-100">
            <div className="row">
                {counter.map(({ id, number, text }) => ( 
                    <div className="col-lg-4 col-md-4" key={id}>
                        <div className="counter-item text-center">
                            <div className="h2 text-white">{number}</div>
                            <span className="text-white">{text}</span>
                        </div>
                    </div>
                ))} 
            </div>
        </div>
    </div>
  )
}

export default Counter