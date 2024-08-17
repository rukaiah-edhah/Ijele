import React, { useState } from 'react';
import { MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/solid';
import FilterSection from '../SearchPage/hotel-filters';

const FlightSideBar = ()=>{
  return
}



// interface FlightSideBarProps {
//   onSearch: (origin: string, destination: string, departureDate: string, returnDate: string, adults: string) => void;
// }

// const FlightSideBar: React.FC<FlightSideBarProps> = ({ onSearch }) => {
//   const [origin, setOrigin] = useState<string>('');
//   const [destination, setDestination] = useState<string>('');
//   const [departureDate, setDepartureDate] = useState<string>('');
//   const [returnDate, setReturnDate] = useState<string>('');
//   const [adults, setAdults] = useState<string>('1');

//   const handleSearch = () => {
//     onSearch(origin, destination, departureDate, returnDate, adults);
//   };

//   const handleAdultsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setAdults(e.target.value);
//   };

//   return (
//     <div className="w-full md:w-1/4 h-full flex flex-col">
//       <div className="flex-1 bg-ijele_teal p-4 rounded-t-md">
//         <div className="flex items-center mb-2">
//           <MagnifyingGlassIcon className="text-white h-6 w-6 mr-2" />
//           <input
//             type="text"
//             value={origin}
//             onChange={(e) => setOrigin(e.target.value)}
//             placeholder="Enter origin airport code"
//             className="input input-bordered w-1/2 mb-2"
//           />
//           <input
//             type="text"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//             placeholder="Enter destination airport code"
//             className="input input-bordered w-1/2 mb-2"
//           />
//         </div>
        
//         <div className="flex flex-col items-center mb-4">
//           <img
//             src="/Images/chicago.jpg" 
//             alt="Travelers"
//             className="w-full h-1/2 mb-2" 
//           />
//           <div className="flex items-center">
//             <UserIcon className="text-white h-6 w-6 mr-2" />
//             <select
//               value={adults}
//               onChange={handleAdultsChange}
//               className="input input-bordered w-1/2"
//             >
//               {Array.from(Array(10).keys()).map((num) => (
//                 <option key={num + 1} value={num + 1}>
//                   {num + 1}
//                 </option>
//               ))}
//             </select>
//             <span className="ml-2 text-white">Adults</span>
//           </div>
//         </div>
//       </div>
//       <div className="bg-ijele_lightTeal p-4 rounded-b-md">
//         <input
//           type="date"
//           value={departureDate}
//           onChange={(e) => setDepartureDate(e.target.value)}
//           className="input input-bordered w-full mb-2"
//         />
//         <input
//           type="date"
//           value={returnDate}
//           onChange={(e) => setReturnDate(e.target.value)}
//           className="input input-bordered w-full mb-2"
//         />
//       </div>
//       <button onClick={handleSearch} className="btn btn-primary w-full">
//         Search
//       </button>
//     </div>
//   );
// };

export default FlightSideBar;
