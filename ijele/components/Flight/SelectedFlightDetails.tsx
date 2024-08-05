import TravelerDetailForm from './TravelerDetailForm';

interface SelectedFlightDetailsProps {
  selectedFlight: any;
  travelerDetails: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBookFlight: (e: React.FormEvent) => void;
}

const SelectedFlightDetails: React.FC<SelectedFlightDetailsProps> = ({
  selectedFlight,
  travelerDetails,
  handleInputChange,
  onBookFlight,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Selected Flight</h2>
      <form onSubmit={onBookFlight}>
        <TravelerDetailForm
          travelerDetails={travelerDetails}
          handleInputChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary mt-2">
          Book Flight
        </button>
      </form>
    </div>
  );
};

export default SelectedFlightDetails;
