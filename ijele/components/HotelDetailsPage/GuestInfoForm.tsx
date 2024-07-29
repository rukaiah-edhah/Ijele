interface GuestInfoFormProps {
  guestInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GuestInfoForm: React.FC<GuestInfoFormProps> = ({
  guestInfo,
  handleInputChange,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Guest Information</h2>
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
        name="phone"
        placeholder="Phone"
        onChange={handleInputChange}
        className="input input-bordered ml-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleInputChange}
        className="input input-bordered ml-2"
      />
    </div>
  );
};

export default GuestInfoForm;
