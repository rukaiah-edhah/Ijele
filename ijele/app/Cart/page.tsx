import useCart from "@/components/Payment/cartContent";
import { Key } from "react";

function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((_item: any, index: Key | null | undefined) => (
          <div key={index}>
            {/* Render item details */}
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </div>
        ))
      )}
      {/* Optionally, add functionality for split payments, etc. */}
    </div>
  );
}
