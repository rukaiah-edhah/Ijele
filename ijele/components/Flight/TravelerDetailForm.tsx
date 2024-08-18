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
        <div className="container mx-auto p-6 bg-white bg-opacity-80 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 font-junge text-ijele_teal text-center">Traveler Details</h2>
            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        name="gender"
                        placeholder="Gender"
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        name="deviceType"
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Enter Device Type"
                    />
                    <input
                        type="text"
                        name="countryCallingCode"
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Enter Country Calling Code"
                    />
                    <input
                        type="number"
                        name="number"
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Enter device number"
                    />
                    <div className="col-span-2">
                        <label className="block mb-2 font-junge text-ijele_navy text-center">Enter traveler Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                            placeholder="Enter date of birth"
                        />
                    </div>
                    <input
                        type="text"
                        name="documentType"
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Enter document type"
                    />
                    <input
                        type="text"
                        name="birthPlace"
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Enter Birth Place"
                    />
                    <input
                        type="text"
                        name="issuanceLocation"
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Enter Issuance Location"
                    />
                    <div className="col-span-2">
                        <label className="block mb-2 font-junge text-ijele_navy text-center">Enter Date of Issuance</label>
                        <input
                            type="date"
                            name="issuanceDate"
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                            placeholder="Enter date of Issuance"
                        />
                    </div>
                    <input
                        type="text"
                        name="passportNumber"
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Enter document number"
                    />
                    <div className="col-span-2">
                        <label className="block mb-2 font-junge text-ijele_navy text-center">Enter document expiration date</label>
                        <input
                            type="date"
                            name="passportExpiryDate"
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                            placeholder="Enter document expiry date"
                        />
                    </div>
                    <input
                        type="text"
                        name="passportIssuanceCountry"
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Enter document issuance country code"
                    />
                    <input
                        type="text"
                        name="validityCountry"
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Enter issuance country code"
                    />
                    <input
                        type="text"
                        name="nationality"
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Enter nationality country code"
                    />
                </div>
            </form>
        </div>
    );
};

export default TravelerDetailForm;
