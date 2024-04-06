import React from "react";
import Notification from "./Notification";

const Meter2 = ({ value }) => {

  // const valueClass = 8;


  return (
    <div className="overflow-x-auto">
    {/* {value} */}
      <p className="">Your key levels</p>
      <ul className="flex ">
        <li className={`p-5 ${value <= 1 && "border-2 border-solid border-black"} bg-green-500 rounded-l-xl`}>1</li>
        <li className={`p-5 ${value == 2 && "border-2 border-solid border-black"} bg-green-400`}>2</li>
        <li className={`p-5 ${value == 3 && "border-2 border-solid border-black"} bg-green-300`}>3</li>
        <li className={`p-5 ${value == 4 && "border-2 border-solid border-black"} bg-green-200`}>4</li>
        <li className={`p-5 ${value == 5 && "border-2 border-solid border-black"} bg-yellow-200`}>5</li>
        <li className={`p-5 ${value == 6 && "border-2 border-solid border-black"} bg-yellow-300`}>6</li>
        <li className={`p-5 ${value == 7 && "border-2 border-solid border-black"} bg-yellow-400`}>7</li>
        <li className={`p-5 ${value == 8 && "border-2 border-solid border-black"} bg-orange-500`}>8</li>
        <li className={`p-5 ${value == 9 && "border-2 border-solid border-black"} bg-orange-600`}>9</li>
        <li className={`p-5 ${value >= 10 && "border-2 border-solid border-black"} bg-red-600 rounded-r-xl`}>10</li>
        {/* <li className="">end</li> */}
        
      </ul>
      <div className="w-1/2">

      {/* <Notification value={value}/> */}

      </div>
    </div>
  );
};

export default Meter2;
