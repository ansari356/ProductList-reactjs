import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "../styles/cart.css";

import {
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} from "../store/slices/cartSlice";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
const navigate = useNavigate ();

  if (cartItems.length === 0) {


    return (
      <div className="cart-empty">
        <h1>Your Cart is Empty</h1>
        <p>Looks like you haven't added any products yet.</p>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="cart-heading">Shopping Cart</h1>
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div>
            <div className="table-wrapper">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="product-cell">
                          {item.thumbnail && (
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="thumbnail"
                            />
                          )}
                          <span>{item.title}</span>
                        </div>
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => dispatch(decrementQuantity(item.id))}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => dispatch(incrementQuantity(item.id))}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="total-section">
              <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
              <h3>Total Quantity: {totalQuantity}</h3>
              <button
                className="btn btn-primary"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
