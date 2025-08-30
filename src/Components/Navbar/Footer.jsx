import React from 'react'
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-black text-white p-10 flex justify-around items-center">
        <h1 className="text-2xl">The Generic</h1>
        <FaFacebookF />
        <FaYoutube />
        <FaSpotify />
      </div>
  )
}

export default Footer