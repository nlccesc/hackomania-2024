"use client";
// import React from "react";
import React, { useState } from "react";



const Input = ({text, setText, handleTextSubmit, isLoading}) => {


  const handleTextChange = (e) =>{
    e.preventDefault();
    setText(e.target.value)
  } 

  return (
    <div className="mb-10">
      {/* <textarea className="TextBox" id="textInput"></textarea> */}

      <label>Share how you are feling now</label>
      <div className="flex flex-row-reverse items-center">
        <input
        value={text}
          placeholder={"Lets start with 3 things you are feeling"}
          type="text"
          className="bg-white outline-none border border-solid rounded-xl w-full p-4 relative"
          onChange={(e)=>handleTextChange(e)}
/>

        <button className="p-2 m-2 absolute bg-gray-200 rounded-lg"
        onClick={async(e)=>{
          e.preventDefault();
          await handleTextSubmit(text)
        }}
        >

          {isLoading ? "..." : "check"}
        </button>
        
      </div>

      {/* <button className="SubmitButton" id="ajaxButton">
        Submit
      </button> */}
    </div>
  );
};

export default Input;
