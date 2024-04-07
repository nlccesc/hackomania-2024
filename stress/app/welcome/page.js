"use client"
import React, { useEffect } from "react";
import Nav from "../Components/Nav";
import StressMeter from "../Components/StressMeter";

const Welcome = () => {

  const handleNewData = async() => {
    const response = await fetch("/api/word_sentiments",{
      method:"POST",
      body: JSON.stringify({
        word: "hello",
        sentiment: 0.98
      })
    })

    const data = await response.json();

    console.log(data)
  }

  useEffect(()=>{
    handleNewData();
  },[])

  return (
    <div id="container" className="w-full min-h-screen flex justify-center flex-col items-center">
      <Nav />
      {/* content */}
      <div className="w-1/2 bg-white-100 flex justify-center mt-16 p-10">
        <div>
          <h1 className="text-4xl font-semibold">STRESS METER</h1>
          <h1 className="text-2xl">Wanna keep track of your stress action?</h1>

          {/* image */}

          <StressMeter />

          {/* button */}
          <div className="">
            <button className="p-2 m-2 bg-[#F45B69] rounded-sm text-white">
              ☎ Download our extension
            </button>
            <button className="p-2 bg-[#114B5F] text-white rounded-sm">
              Demo
            </button>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
