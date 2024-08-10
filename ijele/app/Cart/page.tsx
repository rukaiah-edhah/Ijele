"use client";

import { useState } from 'react';

const TravelCart = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [parties, setParties] = useState<number>(1);
  const [payments, setPayments] = useState<number[]>([0]);
  const [paymentInfo, setPaymentInfo] = useState<any>({});

  const handleAddToCart = (item: any) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const handleRemoveFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleSplitPayment = (index: number, value: number) => {
    const newPayments = [...payments];
    newPayments[index] = value;
    setPayments(newPayments);
  };

  const handleCheckout = () => {
    if (payments.reduce((acc, cur) => acc + cur, 0) !== cartTotal) {
      alert('Total payment must equal cart total.');
      return;
    }

    cart.forEach(item => {
      if (item.type === 'hotel' && !item.paymentInfo) {
        setPaymentInfo({
          hotelId: item.details.id,
          amount: item.price,
          cardNumber: '',
          expiryDate: '',
          cvc: '',
        });
      } else {
        console.log('Processing item:', item);
      }
    });
  };

  const handlePaymentSubmit = (e: any) => {
    e.preventDefault();
    // Handle payment processing here
    console.log('Payment submitted:', paymentInfo);
    const updatedCart = cart.map(item => 
      item.details.id === paymentInfo.hotelId 
        ? { ...item, paymentInfo: true } 
        : item
    );
    setCart(updatedCart);
    setPaymentInfo(null);
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
      
      {paymentInfo.hotelId && (
        <form onSubmit={handlePaymentSubmit}>
          <h3>Enter Payment Information for Hotel</h3>
          <div>
            <label>Card Number</label>
            <input
              type="text"
              value={paymentInfo.cardNumber}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Expiry Date (MM/YY)</label>
            <input
              type="text"
              value={paymentInfo.expiryDate}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label>CVC</label>
            <input
              type="text"
              value={paymentInfo.cvc}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cvc: e.target.value })}
              required
            />
          </div>
          <button type="submit">Submit Payment</button>
          <button type="button" onClick={() => setPaymentInfo(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default TravelCart;