
import '@/components/Flight/flightList.css';
import FlightCard from './FlightCard';
import { Flight } from './FlightType';

const airlineLogos: Record<string, string> = {
  'AA': '/Images/flight/AA.png',
  'DL': '/Images/flight/Delta.png',
  'UA': '/Images/flight/UA.png',
  'SW': '/Images/flight/SW.png',
  'VS': '/Images/flight/VS.png',
  'FI': '/Images/flight/FI.png', 
  'BF': '/Images/flight/BF.png',
  'TX': '/Images/flight/TX.png',
  'QR': '/Images/flight/QR.png', 
  'MF': '/Images/flight/MF.png',
  'AS': '/Images/flight/AS.png',
  'SK': '/Images/flight/SK.png',
  'IB': '/Images/flight/IB.png',
  'AF': '/Images/flight/AF.png',
  'AC': '/Images/flight/AC.png'
};

type Props = {
  flights: Flight[];
  onSelectFlight: (flight: Flight) => void;
};

const formatDuration = (duration: string): string => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return duration;

  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;

  return `${hours}h ${minutes}m`;
};

const FlightList: React.FC<Props> = ({ flights, onSelectFlight }) => {
  return (
    <div className="flights-container">
     
      {flights.length > 0 && (
        <div>
          <h2 className="flights-title text-ijele_gold font-junge pt-4">Flights</h2>
          <ul className="flights-list">
            {flights.map((flight, index) => {
              const itinerary = flight.itineraries[0];
              const segments = itinerary.segments.map(segment => ({
                departureTime: new Date(segment.departure.at).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
                arrivalTime: new Date(segment.arrival.at).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
                stops: segment.numberOfStops > 0 ? `${segment.numberOfStops} ${segment.numberOfStops === 1 ? 'stop' : 'stops'}` : 'Direct',
                route: `${segment.departure.iataCode} - ${segment.arrival.iataCode}`,
                details: `Flight duration: ${formatDuration(segment.duration)}`,
              }));

              return (
                <FlightCard
                  key={index}
                  airline={flight.validatingAirlineCodes[0]}
                  departureTime={new Date(itinerary.segments[0].departure.at).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  arrivalTime={new Date(itinerary.segments[itinerary.segments.length - 1].arrival.at).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  stops={itinerary.segments.length > 1 ? `${itinerary.segments.length - 1} ${itinerary.segments.length - 1 === 1 ? 'stop' : 'stops'}` : 'Direct'}
                  route={`${itinerary.segments[0].departure.iataCode} - ${itinerary.segments[itinerary.segments.length - 1].arrival.iataCode}`}
                  logo={airlineLogos[flight.validatingAirlineCodes[0]] || '/Images/Default.png'}
                  details={`Total duration: ${formatDuration(itinerary.duration)}`}
                  currency={flight.price.currency}
                  price={flight.price.total}
                  segments={segments}
                  onSelect={() => onSelectFlight(flight)}
                />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlightList;
