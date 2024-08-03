import { Hotel } from "@/lib/interfaces";

interface HotelListProps {
  hotels: Hotel[];
  handleViewOffers: (hotelId: string) => void;
}

const HotelList: React.FC<HotelListProps> = ({ hotels, handleViewOffers }) => {
  return (
    <>
      <div className="max-w-sm bg-gray-800/25 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="" className="rounded-t-lg bottom-10">
          <img src="/Images/Hotel_placeholderImage.png" alt="" />
          <div className="flex justify-between relative m-4  ">
            <h3>Sargaio Bleu Resort & Spa</h3>
            <img src="" alt="|" />
            <h4>$197</h4>
            <img src="" alt=" - - -" />
          </div>
        </a>
      </div>

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
    </>
  );
};

export default HotelList;
