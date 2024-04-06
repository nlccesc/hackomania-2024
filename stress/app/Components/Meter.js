import React from "react";

const Meter = ({ value }) => {
  return (
    <div className="overflow-x-auto">
      <ul className="steps">
        <li className={`step step-accent ${value <= 1 && "mt-2"} `}>1</li>
        <li className={`step step-accent ${value == 2 && "mt-2"}`}>2</li>
        <li className={`step step-accent ${value == 3 && "mt-2"}`}>3</li>
        <li className={`step step-warning ${value == 4 && "mt-2 "}`}>4</li>
        <li className={`step step-warning ${value == 5 && "mt-2"}`}>5</li>
        <li className={`step step-warning ${value == 6 && "mt-2"}`}>6</li>
        <li className={`step step-warning ${value == 7 && "mt-2"}`}>7</li>
        <li className={`step step-error ${value == 8 && "mt-2"}`}>8</li>
        <li className={`step step-error ${value == 9 && "mt-2"}`}>9</li>
        <li className={`step step-error ${value >= 10 && "mt-2"}`}>10</li>
        {/* <li className="step step-error">end<</li> */}
      </ul>
    </div>
  );
};

export default Meter;
