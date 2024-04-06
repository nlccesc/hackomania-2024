// import React from 'react'
"use client";

const Nav = () => {
  return (
    <div class="flex w-full justify-between px-10 py-5 bg-ligh border-b-2 border-solid items-center">
    <div class="flex-1">
      <a class="btn btn-ghost text-3xl font-semibold text-[#114B5F]">Stress</a>
    </div>
    <div class="flex-none">
      {/* <ul class="menu menu-horizontal px-1"> */}
      
        <button className="cursor-pointer hover:underline text-[#114B5F]" >☎ <br/>Download our extension</button>
      {/* </ul> */}
    </div>
  </div>
  )
}

export default Nav