import React from "react";
import Cart from "../../Cart/Cart";

const Navbar = () => {
  const [showCart, setShowCart] = React.useState(false);

  const [cartItems, setCartItems] = React.useState([
    {
      title: "Colors",
      price: 100,
      imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
      quantity: 2,
    },
    {
      title: "Black and white Colors",
      price: 50,
      imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
      quantity: 3,
    },
    {
      title: "Yellow and Black Colors",
      price: 70,
      imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
      quantity: 1,
    },
  ]);

  const cartHandler = () => {
    setShowCart(true);
  };

  const removeItems = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  return (
    <>
      <div className="bg-blue-500 text-white p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <ul className=" flex gap-20 justify-center ">
            <li>Home</li>
            <li>Store</li>
            <li>About</li>
          </ul>
          <button
            onClick={cartHandler}
            className="cursor-pointer border border-white py-1 px-2 hover:bg-gray-200 hover:text-black"
          >
            CART
          </button>
        </div>
      </div>
      {showCart && (
        <Cart
          cartItems={cartItems}
          onClose={() => setShowCart(false)}
          onRemove={removeItems}
        />
      )}
    </>
  );
};

export default Navbar;
