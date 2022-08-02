import React from 'react';
import counter from '../../../assets/data/dashboard/counter';



import "./counter.scss"

const Counter = () => {
  return (
    <div className="counter-area">
        <div className="container">
            <div className="row">
                {counter.map(({ id, number, text }) => ( 
                    <div className="col-lg-3 col-md-6" key={id}>
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