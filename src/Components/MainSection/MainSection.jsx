import React, { useDebugValue } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa6";
import Cart from "../../Cart/Cart";

const MainSection = () => {
    

  const productsArr = [
    {
      title: "ALBUM 1",

      price: 100,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    },

    {
      title: "ALBUM 2",

      price: 50,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    },

    {
      title: "ALBUM 3",

      price: 70,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    },

    {
      title: "ALBUM 4",

      price: 100,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    },
  ];
  return (
    <>
    
      <div className="bg-gray-400 py-4">
        <h1 className="text-8xl text-center">The Generic</h1>
      </div>
        <h1 className="text-3xl text-center py-4">MUSIC</h1>
      <div className="max-w-7xl mx-auto my-10 grid grid-cols-2 gap-10 place-items-center ">
        
          {productsArr.map((product, index) => {
            return (
              <div key={index}>
                <p className="text-2xl font-bold text-center">{product.title}</p>
                <img src={product.imageUrl} alt="" />
               <div className="flex justify-between">
                 <p>${product.price}</p>
                <button className="bg-blue-300 rounded px-2 py-1">ADD TO CART</button>
               </div>
              </div>
            );
          })}
      </div>

      <div className="bg-black text-white p-10 flex justify-around items-center">
        <h1 className="text-2xl">The Generic</h1>
        <FaFacebookF />
        <FaYoutube />
        <FaSpotify />

      </div>
    </>
  );
};

export default MainSection;
