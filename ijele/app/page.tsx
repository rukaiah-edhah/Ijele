import Navbar from "@/components/navbar"
import { CartProvider } from "@/components/Payment/cartProvider";

export default function Home() {
  return (
    <CartProvider>
    <>
    <Navbar />
    </>
    </CartProvider>
  );
}
