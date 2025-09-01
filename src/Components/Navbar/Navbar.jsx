import React from "react";
import Cart from "../Cart/Cart";
import {useCart} from "../ContextAPI/Context";
import { useLocation, NavLink } from "react-router-dom";

const Navbar = () => {
  const [showCart, setShowCart] = React.useState(false);
  const {cartItems} = useCart();
  const location = useLocation(); 
  return (
    <>
      <div className="bg-blue-500 text-white p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <ul className="flex gap-20 justify-center">
           <NavLink to={'/'}> <li>Home</li> </NavLink>
            <NavLink to={'/store'}> <li>Store</li></NavLink>
            <NavLink to={'/about'}> <li>About Us</li></NavLink>
            <NavLink to={'/contact'}> <li>Contact Us</li></NavLink>
            <NavLink to={'/movies'}> <li>Movies</li></NavLink>
            <NavLink to={'/products'}> <li>Shopping</li></NavLink>
          </ul>
          <button
            onClick={() => setShowCart(true)}
            className="cursor-pointer border border-white py-1 px-2 hover:bg-gray-200 hover:text-black"
          >
            CART
            {cartItems.length > 0 && (
              <span className="ml-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="bg-gray-400 py-4">
        <h1 className="text-8xl text-center">The Generic</h1>
        {location.pathname ==='/' && // to check in which path/page you are in.
        <h1 className="text-3xl text-center py-4 border-1 border-blue-950 mx-130 my-4">Get Our Latest Album</h1>}
      </div>

      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </>
  );
};

export default Navbar;
