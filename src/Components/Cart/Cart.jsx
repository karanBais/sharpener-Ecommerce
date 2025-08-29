import React from "react";
import { IoMdClose } from "react-icons/io";
import { useCart } from "../ContextAPI/Context";

const Cart = ({ onClose }) => {
  const { cartItems, removeCartItem } = useCart();

  return (
    <div className="absolute top-16 right-0 bg-white border border-gray-300 p-4 w-96 shadow-lg z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-center">CART</h2>
        <IoMdClose onClick={onClose} className="text-2xl cursor-pointer" />
      </div>

      <div>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          cartItems.map((element, index) => (
            <div key={index}>
              <table>
                <tbody>
                  <tr className="border-b border-gray-300 mb-4">
                    <td>
                      <img
                        src={element.imageUrl}
                        alt=""
                        className="w-20 h-20 object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <p className="font-bold">{element.title}</p>
                      <p>${element.price}</p>
                      <p>Quantity: {element.quantity}</p>
                      <button
                        onClick={() => removeCartItem(index)}
                        className="border border-red-600 bg-red-500 py-1 px-2 text-white font-bold hover:bg-red-400 cursor-pointer"
                      >
                        Remove Item
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
