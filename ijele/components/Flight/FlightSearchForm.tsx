interface FlightSearchFormProps {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  adults: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  origin,
  destination,
  departureDate,
  returnDate,
  adults,
  onInputChange,
  onSearchClick,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <input
        type="text"
        name="origin"
        value={origin}
        onChange={onInputChange}
        placeholder="Enter origin airport code"
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        name="destination"
        value={destination}
        onChange={onInputChange}
        placeholder="Enter destination airport code"
        className="input input-bordered w-full max-w-xs"
      />
      <label>Enter departure date</label>
      <input
        type="date"
        name="departureDate"
        value={departureDate}
        onChange={onInputChange}
        className="input input-bordered w-full max-w-xs"
      />
      <label>Enter return date</label>
      <input
        type="date"
        name="returnDate"
        value={returnDate}
        onChange={onInputChange}
        className="input input-bordered w-full max-w-xs"
      />
      <label>Enter number of Adults</label>
      <input
        type="number"
        name="adults"
        value={adults}
        onChange={onInputChange}
        className="input input-bordered w-full max-w-xs"
      />
      <button onClick={onSearchClick} className="btn btn-primary mt-2">
        Search
      </button>
    </div>
  );
};

export default FlightSearchForm;
