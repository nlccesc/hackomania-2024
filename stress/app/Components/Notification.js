"use client";
import { Messages } from "../../utils/message";
import React, { useEffect, useState } from "react";

const Notification = ({ value }) => {
  const [messageState, setMessageState] = useState(null);

  const handleMessageState = (value) => {
    if (value > 8) setMessageState(Messages[2]);
    else if (value > 3 && value <= 8) setMessageState(Messages[1]);
    else if (value <= 3) setMessageState(Messages[0]);
};


  useEffect(() => {
    handleMessageState(value);
  }, [value]);

  return (
    <div role="alert" className={`alert mb-10 w-auto`}>
        {/* <p>{JSON.stringify(messageState)}</p> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{messageState?.message}</span>
    </div>
  );
};

export default Notification;
