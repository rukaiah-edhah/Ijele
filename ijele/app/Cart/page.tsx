"use client";

import { useCart } from '@/components/Payment/cartContent';
import { useState } from 'react';

const TravelCart = () => {
  const { cart, addToCart } = useCart(); // Access cart and addToCart from context
  const [parties, setParties] = useState<number>(1);
  const [payments, setPayments] = useState<number[]>([0]);

  const handleRemoveFromCart = (index: number) => {
    // Filter out the item from the cart
    const newCart = cart.filter((_, i) => i !== index);
    // You would need a way to update the cart context here
    // For now, you can use the `addToCart` method to reset the cart
    // Assuming `addToCart` can accept a new cart array
    newCart.forEach(item => addToCart(item));
  };

  const handleSplitPayment = (index: number, value: number) => {
    const newPayments = [...payments];
    newPayments[index] = value;
    setPayments(newPayments);
  };

  const handleCheckout = () => {
    const cartTotal = cart.reduce((total, item) => total + item.price, 0);
    if (payments.reduce((acc, cur) => acc + cur, 0) !== cartTotal) {
      alert('Total payment must equal cart total.');
      return;
    }
    // TODO -- Finish payment and booking logic
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <h1>Travel Cart</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.details.name} - ${item.price}
            <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Total: ${cartTotal}</h2>
      <h3>Split Payment</h3>
      {Array(parties).fill(0).map((_, index) => (
        <div key={index}>
          <label>Party {index + 1} Contribution:</label>
          <input
            type="number"
            value={payments[index]}
            onChange={(e) => handleSplitPayment(index, parseFloat(e.target.value))}
          />
        </div>
      ))}
      <button onClick={() => setParties(parties + 1)}>Add Party</button>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default TravelCart;
