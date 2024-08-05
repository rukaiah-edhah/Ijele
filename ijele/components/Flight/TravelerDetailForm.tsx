interface TravelerDetailFormProps {
    travelerDetails: {
        firstName: string,
        lastName: string,
        gender: string,
        email: string,
        deviceType: string,
        countryCallingCode: string,
        number: string,
        dateOfBirth: string,
        documentType: string,
        birthPlace: string,
        issuanceLocation: string,
        issuanceDate: string,
        passportNumber: string,
        passportExpiryDate: string,
        passportIssuanceCountry: string,
        validityCountry: string,
        nationality: string,
        holder: boolean,
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TravelerDetailForm: React.FC<TravelerDetailFormProps> = ({
    travelerDetails,
    handleInputChange,
  }) => {
    return (
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Traveler Details</h2>
        <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleInputChange}
            className="input input-bordered ml-2"
        />
        <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleInputChange}
            className="input input-bordered ml-2"
        />
        <input
            type="text"
            name="gender"
            placeholder="Gender"
            onChange={handleInputChange}
            className="input input-bordered ml-2"
        />
        <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
        />
        <input
            type="text"
            name="deviceType"
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter Device Type"
        />
         <input
            type="text"
            name="countryCallingCode"
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter Country Calling Code"
        />
        <input
            type="number"
            name="number"
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter device number"
        />
        <label>Enter traveler Date of Birth</label>
        <input
            type="date"
            name="dateOfBirth"
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter date of birth"
        />
        <input
            type="text"
            name="documentType"
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter document type"
        />
        <input
            type="text"
            name="birthPlace"
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter Birth Place"
        />
        <input
            type="text"
            name="issuanceLocation"
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter Issuance Location"
        />
        <label>Enter Date of Issuance</label>
        <input
            type="date"
            name="issuanceDate"
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter date of Issuance"
        />
        <input
            type="text"
            name="passportNumber"
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter document number"
        />
        <label>Enter document expiration date</label>
        <input
            type="date"
            name="passportExpiryDate"
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter document expiry date"
        />
        <input
            type="text"
            name="passportIssuanceCountry"
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter document issuance country code"
        />
        <input
            type="text"
            name="validityCountry"
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter issuance country code"
        />
        <input
            type="text"
            name="nationality"
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter nationality country code"
        />
    </div>
    );
};

export default TravelerDetailForm;
  