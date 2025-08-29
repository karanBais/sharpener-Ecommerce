import React from "react";
import Cart from "../Cart/Cart";

const Navbar = () => {
  const [showCart, setShowCart] = React.useState(false);

  return (
    <>
      <div className="bg-blue-500 text-white p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <ul className="flex gap-20 justify-center">
            <li>Home</li>
            <li>Store</li>
            <li>About</li>
          </ul>
          <button
            onClick={() => setShowCart(true)}
            className="cursor-pointer border border-white py-1 px-2 hover:bg-gray-200 hover:text-black"
          >
            CART
          </button>
        </div>
      </div>

      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </>
  );
};

export default Navbar;
