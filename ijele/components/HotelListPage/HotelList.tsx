import { TitleCase } from "@/lib/customTools";
import { Hotel } from "@/lib/interfaces";

interface HotelListProps {
  hotels: Hotel[];
  handleViewOffers: (hotelId: string) => void;
}

const HotelList: React.FC<HotelListProps> = ({ hotels, handleViewOffers }) => {
  return (
    <>
      {/* <div className="mb-6">
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
      </div> */}
      
      {/* container results */}
        {hotels.map((hotel) => (
          <div className=""
          onClick={() =>handleViewOffers(hotel.hotelId) }>
            <img src="/Images/Hotel_placeholderImage.png" alt="" className="max-w-sm rounded-lg rounded-t-[25%] hover:rounded-tr-none" />
            <div className="max-w-sm flex p-4 justify-around relative bg-zinc-100/80 rounded-b-lg border bottom-14">
              <h3 key={hotel.hotelId} className="font-kite_one md:text-base">{TitleCase(hotel.name)}</h3>
              <img src="" alt="|" />
              <h4>$197</h4>
              <img src="" alt=" - - -" />
              
            </div>
          </div>
        ))}
    </>
  );
};

export default HotelList;
