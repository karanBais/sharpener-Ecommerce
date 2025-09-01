import React from "react";

const ProductsDetails = () => {
  const productImg =
    "https://imgs.search.brave.com/g00tGVFIXqLOfMbjA9DU7QNTnOR3NjHC1oXg6i3y9sU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2NjLzMw/LzllL2NjMzA5ZWI1/NjIzNzAwMWFlZDcz/OGI3MDlmNmZhNTI2/LmpwZw";

  const reviewImg =
    "https://imgs.search.brave.com/bwi98-MZY2X-4UjEDVYKfYRYVrw-sm_2kpHWF-qsGu0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXNv/dXJjZXMubWFuZG1k/aXJlY3QuY29tL0lt/YWdlcy9fZGVmYXVs/dC82L20vMy82bTMw/MDg4XzFfdGh1bWIu/anBn";
  return (
    <div className="flex gap-4 m-10">
      <div className="">
        <img className=" w-25" src={productImg} alt="" />
        <img className=" w-25 mt-4" src={productImg} alt="" />
        <img className="w-25 mt-4" src={productImg} alt="" />
        <img className="w-25 mt-4" src={productImg} alt="" />
        <img className="w-25 mt-4" src={productImg} alt="" />
        <img className="w-25 mt-4" src={productImg} alt="" />
      </div>
      <div>
        <img src={productImg} alt="" />
      </div>
      <div>
        <h1 className="text-2xl py-1">Men Casual T-shirt</h1>
        <p className="text-xl">price: 399</p>

        <div className="flex gap-5 my-10">
          <button className="border-1 border-amber-400 px-3 py-1 bg-amber-400 rounded-lg hover:bg-amber-600">
            Add to Cart
          </button>
          <button className="border-1 border-amber-400 px-3 py-1 bg-orange-400 rounded-lg hover:bg-orange-600">
            Buy Now
          </button>
        </div>
        <div className="border-1 w-200"></div>

        <h2 className="text-3xl py-4">Product Details</h2>

        <div className="border-1 w-200"></div>

        <div className="flex gap-6">
          <h3 className="mt-4 text-lg">Review & Ratings</h3>
          <h1 className=" text-lg mt-4 bg-green-500 px-2 rounded-xl ">3.9 *</h1>
          <p className="mt-4">25,617 ratings and 1,903 reviews</p>
          <button className="mt-4 ml-45 bg-blue-400 px-2">Rate Product</button>
        </div>

        <h4 className="mt-4">What our Costumer feels like: </h4>
        <div className="flex mt-5 gap-5">
          <p className="border border-black px-2">Fabric Quality</p>
          <p className="border border-black px-2">Color</p>
          <p className="border border-black px-2">Style</p>
          <p className="border border-black px-2">Comfort</p>
        </div>
        <div className="flex gap-5">
          <img className="mt-5 w-30" src={reviewImg} alt="" />
          <img className="mt-5 w-30" src={reviewImg} alt="" />
          <img className="mt-5 w-30" src={reviewImg} alt="" />
          <img className="mt-5 w-30" src={reviewImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
