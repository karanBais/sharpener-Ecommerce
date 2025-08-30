import React, { useEffect } from "react";

import { useCart } from "../ContextAPI/Context";

const StorePage = () => {
  const { addToCart } = useCart();
  const [movies, setMovies] = React.useState([]);

  const productsArr = [
    {
      title: "ALBUM 1",
      price: 100,
      imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    },
    {
      title: "ALBUM 2",
      price: 50,
      imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    },
    {
      title: "ALBUM 3",
      price: 70,
      imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    },
    {
      title: "ALBUM 4",
      price: 100,
      imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    },
  ];

  useEffect( () => {
    FetchApi();
  }, [])

  const FetchApi = async () => {
    const response = await fetch("https://swapi.info/api/films");
    const json = await response.json();
    console.log(json);
  }

  // console.log(data);
  return (
    <>
    <div className=" mx-auto my-10gap-20 place-items-center ">
     <h1 className="text-3xl text-center py-4">MUSIC</h1>
     <div className="mx-auto my-10 grid grid-cols-2 gap-20 ">
        {productsArr.map((product, index) => (
          <div key={index}>
            <p className="text-2xl font-bold text-center">{product.title}</p>
            <img src={product.imageUrl} alt="" />
            <div className="flex justify-between">
              <p>${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-300 rounded px-2 py-1"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default StorePage;
