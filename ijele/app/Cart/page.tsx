import { useCart } from '@/components/Payment/cartContent';
import { useState } from 'react';
import axios from 'axios';
import { GuestInfo, PaymentCardInfo, CartItem } from '@/lib/interfaces';

const TravelCart = () => {
  const { cart } = useCart(); 
  const [parties, setParties] = useState<number>(1);
  const [payments, setPayments] = useState<number[]>([0]);

  const guestInfo: GuestInfo = {
    tid: 1,
    title: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  };

  const paymentInfo: PaymentCardInfo = {
    vendorCode: '',
    cardNumber: '',
    expiryDate: '',
    holderName: '',
  };

  const handleRemoveFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
  };

  const handleSplitPayment = (index: number, value: number) => {
    const newPayments = [...payments];
    newPayments[index] = value;
    setPayments(newPayments);
  };

  const handleCheckout = async () => {
    const cartTotal = cart.reduce((total, item) => total + item.price, 0);
    if (payments.reduce((acc, cur) => acc + cur, 0) !== cartTotal) {
      alert('Total payment must equal cart total.');
      return;
    }

    for (const item of cart) {
      if (item.type === "hotel") {
        try {
          const response = await axios.post("/api/hotels/book", {
            data: {
              type: "hotel-order",
              guests: [guestInfo],  
              travelAgent: {
                contact: {
                  email: guestInfo.email,
                },
              },
              roomAssociations: [
                {
                  guestReferences: [{ guestReference: "1" }],
                  hotelOfferId: item.id,
                },
              ],
              payment: {
                method: "CREDIT_CARD",
                paymentCard: {
                  paymentCardInfo: paymentInfo, 
                },
              },
            },
          });

          console.log("Booking successful: ", response.data);
        } catch (error) {
          console.error("Booking failed: ", error);
        }
      }
    }
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <h1>Travel Cart</h1>
      <ul>
        {cart.map((item: CartItem, index: number) => (
          <li key={index}>
            {item.details.room.description.text} - ${item.price}
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
