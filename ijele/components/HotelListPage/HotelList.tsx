import { Hotel } from "@/lib/interfaces";

interface HotelListProps {
  hotels: Hotel[];
  handleViewOffers: (hotelId: string) => void;
}

const HotelList: React.FC<HotelListProps> = ({ hotels, handleViewOffers }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Hotels</h2>
      <ul className="list-disc pl-5">
        {hotels.map((hotel) => (
          <li key={hotel.hotelId} className="mb-2">
            {hotel.name} - {hotel.address?.countryCode || "N/A"}
            <button
              onClick={() => handleViewOffers(hotel.hotelId)}
              className="btn btn-secondary ml-2"
            >
              View Offers
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelList;
