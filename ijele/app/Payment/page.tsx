"use client";

import Navbar from "@/components/navbar";
import NavSideBar from "@/components/SearchPage/search-nav";
import PaymentInfoForm from "@/components/HotelDetailsPage/PaymentInfoForm";
import { PaymentCardInfo } from "@/lib/interfaces";
import { PaymentInfo } from "@/lib/interfaces";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <h1>Setup Payments</h1>
            <NavSideBar />
            <PaymentInfoForm 
                paymentInfo={{
                    vendorCode: "",
                    cardNumber: "",
                    expiryDate: "",
                    holderName: ""
                }} 
                handlePaymentChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                    throw new Error("Function not implemented.");
                }} 
            />
        </>
    );
}
