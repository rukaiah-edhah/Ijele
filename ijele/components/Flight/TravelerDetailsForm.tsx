// components/TravelerDetailsForm.tsx
import { TravelerDetails } from '@/lib/interfaces';
import React from 'react';


interface TravelerDetailsFormProps {
  travelerDetails: TravelerDetails;
  setTravelerDetails: (details: TravelerDetails) => void;
  handleBooking: (e: React.FormEvent) => void;
}

const TravelerDetailsForm: React.FC<TravelerDetailsFormProps> = ({ travelerDetails, setTravelerDetails, handleBooking }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Traveler Details</h2>
      <form onSubmit={handleBooking}>
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={travelerDetails.firstName}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, firstName: e.target.value })}
            placeholder="First Name"
            className="input input-bordered w-full max-w-xs"
            required
          />
          <input
            type="text"
            value={travelerDetails.lastName}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, lastName: e.target.value })}
            placeholder="Last Name"
            className="input input-bordered w-full max-w-xs"
            required
          />
          <input
            type="text"
            value={travelerDetails.gender}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, gender: e.target.value })}
            placeholder="Gender"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="email"
            value={travelerDetails.email}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, email: e.target.value })}
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            value={travelerDetails.deviceType}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, deviceType: e.target.value })}
            placeholder="Device Type"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            value={travelerDetails.countryCallingCode}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, countryCallingCode: e.target.value })}
            placeholder="Country Calling Code"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            value={travelerDetails.number}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, number: e.target.value })}
            placeholder="Phone Number"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="date"
            value={travelerDetails.dateOfBirth}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, dateOfBirth: e.target.value })}
            placeholder="Date of Birth"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            value={travelerDetails.documentType}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, documentType: e.target.value })}
            placeholder="Document Type"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            value={travelerDetails.birthPlace}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, birthPlace: e.target.value })}
            placeholder="Birth Place"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            value={travelerDetails.issuanceLocation}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, issuanceLocation: e.target.value })}
            placeholder="Issuance Location"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="date"
            value={travelerDetails.issuanceDate}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, issuanceDate: e.target.value })}
            placeholder="Issuance Date"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            value={travelerDetails.passportNumber}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, passportNumber: e.target.value })}
            placeholder="Passport Number"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="date"
            value={travelerDetails.passportExpiryDate}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, passportExpiryDate: e.target.value })}
            placeholder="Passport Expiry Date"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            value={travelerDetails.passportIssuanceCountry}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, passportIssuanceCountry: e.target.value })}
            placeholder="Passport Issuance Country"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            value={travelerDetails.validityCountry}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, validityCountry: e.target.value })}
            placeholder="Validity Country"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            value={travelerDetails.nationality}
            onChange={(e) => setTravelerDetails({ ...travelerDetails, nationality: e.target.value })}
            placeholder="Nationality"
            className="input input-bordered w-full max-w-xs"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={travelerDetails.holder}
              onChange={(e) => setTravelerDetails({ ...travelerDetails, holder: e.target.checked })}
              className="checkbox"
            />
            <span>Holder</span>
          </label>
          <button type="submit" className="btn btn-primary mt-2">
            Book Flight
          </button>
        </div>
      </form>
    </div>
  );
};

export default TravelerDetailsForm;
