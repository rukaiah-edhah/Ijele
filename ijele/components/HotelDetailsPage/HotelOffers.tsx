import { Offer } from "@/lib/interfaces";
import { useCart } from "@/components/Payment/cartContent"; 

interface HotelOffersProps {
  offers: Offer[];
  handleBookHotel: (offerId: string) => void;
}

const HotelOffers: React.FC<HotelOffersProps> = ({ offers, handleBookHotel }) => {
  const { addToCart } = useCart();  

  const handleAddToCart = (offerId: string) => {
    const selectedOffer = offers.find(offer => offer.id === offerId);
    if (selectedOffer) {
      addToCart({
        id: offerId,
        type: "hotel",
        details: selectedOffer,
        price: parseFloat(selectedOffer.price.total),
      });
      window.alert("Hotel added to cart successfully!");  
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Hotel Offers</h2>
      
      <ul className="list-disc pl-5">
        {offers.map((offer) => (
          <li key={offer.id} className="mb-2">
            Room: {offer.room.description.text} - Price: {offer.price.total}{" "}
            {offer.price.currency}
            <button
              onClick={() => handleAddToCart(offer.id)}
              className="btn btn-secondary ml-2"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleBookHotel(offer.id)}
              className="btn btn-primary ml-2"
            >
              Book Now
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelOffers;
