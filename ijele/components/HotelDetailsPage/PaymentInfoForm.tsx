import { useEffect, useState } from "react";

interface PaymentInfoFormProps {
  paymentInfo: {
    vendorCode: string;
    cardNumber: string;
    expiryDate: string;
    holderName: string;
  };
  handlePaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentInfoForm: React.FC<PaymentInfoFormProps> = ({
  paymentInfo,
  handlePaymentChange,
  
}) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (showAlert) {
      alert("Site in TESTING - Please DO NOT Enter Actual Payment information!!!");
      setShowAlert(false); // Disable alert after showing
    }
  }, [showAlert]);
  
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Payment Information</h2>
      <h1>Page in Testing Status - Please do not enter actual payment info!!!</h1>
      <input
        type="text"
        name="vendorCode"
        placeholder="Card Type (e.g., VI for Visa)"
        onChange={handlePaymentChange}
        className="input input-bordered ml-2"
      />
      <input
        type="text"
        name="cardNumber"
        placeholder="Card Number"
        onChange={handlePaymentChange}
        className="input input-bordered ml-2"
      />
      <input
        type="text"
        name="expiryDate"
        placeholder="Expiry Date"
        onChange={handlePaymentChange}
        className="input input-bordered ml-2"
      />
      <input
        type="text"
        name="holderName"
        placeholder="Holder Name"
        onChange={handlePaymentChange}
        className="input input-bordered ml-2"
      />
    </div>
  );
};

export default PaymentInfoForm;
